<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use App\Rules\MaxEntries;
use Illuminate\Support\Facades\Cache;

class SubtaskController extends Controller
{
    public function store(Task $task)
    {
        $this->authorize('store', $task);

        request()->validate([
            'name' => ['required', 'string', 'max:80'],
            'items' => ['required', new MaxEntries($task->subtasks, 5)],
        ]);

        $subtask = new Subtask([
            'name' => request('name'),
            'done' => false,
        ]);

        $subtask->task_id = $task->id;
        $subtask->user_id = auth()->id();

        $subtask->save();

        Cache::forget("board_{$task->board_id}");

        return back();
    }

    public function edit(Subtask $subtask)
    {
        $this->authorize('edit', $subtask);

        request()->validate([
            'name' => ['required', 'string', 'max:80'],
        ]);

        $subtask->update([
            'name' => request('name'),
        ]);

        Cache::forget("board_{$subtask->task->board_id}");
    }

    public function done(Subtask $subtask)
    {
        $this->authorize('edit', $subtask);

        request()->validate([
            'done' => ['required', 'boolean'],
        ]);

        $subtask->update([
            'done' => request('done'),
        ]);

        Cache::forget("board_{$subtask->task->board_id}");
    }

    public function delete(Subtask $subtask)
    {
        $this->authorize('delete', $subtask);

        $subtask->delete();

        Cache::forget("board_{$subtask->task->board_id}");
    }
}
