<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use App\Rules\MaxEntries;

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

        return back();
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

        return back();
    }

    public function delete(Subtask $subtask)
    {
        $this->authorize('delete', $subtask);

        $subtask->delete();

        return back();
    }
}
