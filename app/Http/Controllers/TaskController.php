<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Board;
use App\Models\Column;
use App\Models\Subtask;
use App\Rules\MaxEntries;
use Illuminate\Support\Facades\Cache;

class TaskController extends Controller
{
    public function store(Board $board, Column $column)
    {
        $this->authorize('store', $column);

        $boardTasks = $board->tasks;

        request()->validate([
            'title' => ['required', 'string', 'max:64'],
            'description' => ['string', 'nullable', 'max:255'],
            'subtasks' => ['array', 'max:5'],
            'tags' => ['array', 'max:10'],
            'items' => ['required', new MaxEntries($boardTasks, 40)],
        ]);

        $subtasks = request('subtasks');
        $tags = request('tags');

        $task = new Task([
            'title' => request('title'),
            'description' => request('description')
        ]);

        $task->user_id = auth()->id();
        $task->column_id = $column->id;
        $task->board_id = $board->id;

        $task->save();

        foreach ($subtasks as $subtask) {
            $newSubtask = new Subtask([
                'name' => $subtask,
                'done' => false,
            ]);

            $newSubtask->task_id = $task->id;
            $newSubtask->user_id = $task->user_id;

            $newSubtask->save();
        }

        forEach($tags as $tag) {
            $task->tags()->attach($tag);
        }

        Cache::forget("board_{$board->id}");

        return back();
    }

    public function edit(Task $task)
    {
        $this->authorize('edit', $task);

        request()->validate([
            'title' => ['required', 'string', 'max:64'],
            'description' => ['string', 'nullable', 'max:255'],
        ]);

        $task->update([
            'title' => request('title'),
            'description' => request('description')
        ]);

        Cache::forget("board_{$task->board_id}");

        return back();
    }

    public function move(Column $column, Task $task)
    {
        $this->authorize('edit', $task);
        $this->authorize('edit', $column);


        request()->validate([
            'position' => ['required', 'numeric']
        ]);

        $task->position = round(request('position'), 5);
        $task->column_id = $column->id;

        $task->save();

        Cache::forget("board_{$column->board_id}");
    }

    public function delete(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        Cache::forget("board_{$task->board_id}");

        return back();
    }
}
