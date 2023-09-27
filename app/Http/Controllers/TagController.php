<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Tag;
use App\Models\Task;
use App\Rules\MaxEntries;

class TagController extends Controller
{
    public function store(Board $board)
    {
        $this->authorize('store', $board);

        request()->validate([
            'name' => ['required', 'string', 'max:32'],
            'color' => ['required', 'string', 'max:32'],
            'items' => ['required', new MaxEntries($board->tags, 10)],
        ]);

        $tag = new Tag([
            'name' => request('name'),
            'color' => request('color'),
        ]);

        $tag->user_id = auth()->id();
        $tag->board_id = $board->id;

        $tag->save();

        return back();
    }

    public function attach(Task $task, Tag $tag)
    {
        $this->authorize('edit', $task);
        $this->authorize('edit', $tag);

        if (!$task->tags->contains($tag->id)) {
            $tag->tasks()->attach($task->id);
        }
    }

    public function detach(Task $task, Tag $tag)
    {
        $this->authorize('edit', $task);
        $this->authorize('edit', $tag);

        $tag->tasks()->detach($task->id);

        return back();
    }

    public function delete(Tag $tag)
    {
        $this->authorize('delete', $tag);

        $tag->delete();

        return back();
    }
}
