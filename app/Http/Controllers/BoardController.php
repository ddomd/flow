<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Board;
use App\Rules\MaxEntries;
use Illuminate\Support\Facades\Cache;

class BoardController extends Controller
{
    public function index()
    {
        $boards = null;

        if (Cache::has('dashboard_boards')) {
            $boards = Cache::get('dashboard_boards');
        } else {
            $boards = auth()->user()->boards;
            Cache::add('dashboard_boards', $boards, now()->addHour());
        }

        return Inertia::render('Dashboard', [
            'boards' => $boards,
        ]);
    }

    public function show(Board $board)
    {
        $this->authorize('show', $board);

        $response = null;

        if (Cache::has("board_{$board->id}")) {
            $response = Cache::get("board_{$board->id}");
        } else {
            $response = $board->load([
                'tags' => function ($query) {
                    $query->select(['tags.id', 'tags.board_id', 'tags.name', 'tags.color']);
                },
                'columns.tasks' => function ($query) {
                    $query->orderBy('position')
                        ->select(['tasks.id', 'tasks.board_id', 'tasks.column_id', 'tasks.title', 'tasks.description', 'tasks.position']);
                },
                'columns.tasks.tags' => function ($query) {
                    $query->select(['tags.id', 'tags.board_id', 'tags.name', 'tags.color']);
                },
                'columns.tasks.subtasks' => function ($query) {
                    $query->select(['subtasks.id', 'subtasks.task_id', 'subtasks.name', 'subtasks.done']);
                },
            ]);
            
            Cache::add("board_{$board->id}", $response, now()->addHour());
        }

        return Inertia::render('Board/Board', [
            'board' => $response,
        ]);
    }

    public function store()
    {
        request()->validate([
            'name' => ['required', 'string', 'max:80'],
            'pinned' => ['boolean'],
            'items' => ['required', new MaxEntries(auth()->user()->boards, 10)],
        ]);

        $board = new Board([
            'name' => request('name'),
            'pinned' => request('pinned'),
        ]);

        $board->user_id = auth()->id();

        $board->save();

        Cache::forget('dashboard_boards');

        return back();
    }

    public function edit(Board $board)
    {
        $this->authorize('edit', $board);

        request()->validate([
            'name' => ['required', 'string', 'max:128'],
        ]);

        $board->update(['name' => request('name')]);

        return back();
    }

    public function pin(Board $board)
    {
        $this->authorize('edit', $board);

        $board->update(['pinned' => request('pinned')]);

        Cache::forget('dashboard_boards');

        return back();
    }

    public function delete(Board $board)
    {
        $this->authorize('delete', $board);

        $board->delete();

        Cache::forget('dashboard_boards');

        return back();
    }
}
