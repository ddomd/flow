<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Task;
use App\Models\Board;
use App\Rules\MaxEntries;
use Illuminate\Support\Facades\Cache;

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

        Cache::forget("board_{$board->id}");

        return back();
    }

    public function attach(Task $task, Tag $tag)
    {
        $this->authorize('edit', $task);
        $this->authorize('edit', $tag);

        if (!$task->tags->contains($tag->id)) {
            $tag->tasks()->attach($task->id);
        }

        Cache::forget("board_{$task->board_id}");
    }

    public function detach(Task $task, Tag $tag)
    {
        $this->authorize('edit', $task);
        $this->authorize('edit', $tag);

        $tag->tasks()->detach($task->id);

        Cache::forget("board_{$task->board_id}");
    }

    public function delete(Tag $tag)
    {
        $this->authorize('delete', $tag);

        $tag->delete();

        Cache::forget("board_{$tag->board_id}");
    }
}
