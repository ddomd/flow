<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Column;
use App\Models\Subtask;
use App\Models\Task;
use App\Rules\MaxEntries;

class TaskController extends Controller
{
    public function store(Board $board, Column $column)
    {
        $this->authorize('store', $column);

        $boardTasks = $board->tasks;

        request()->validate([
            'title' => ['required', 'string', 'max:64'],
            'description' => ['string', 'max:255'],
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

        return back();
    }

    public function edit(Task $task)
    {
        $this->authorize('edit', $task);

        request()->validate([
            'title' => ['required', 'string'],
            'description' => ['string', 'max:255'],
        ]);

        $task->update([
            'title' => request('title'),
            'description' => request('description')
        ]);

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

        return back();
    }

    public function delete(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return back();
    }
}
