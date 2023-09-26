<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Board;
use App\Rules\MaxEntries;

class BoardController extends Controller
{
    public function index()
    {
        $cacheKey = 'user_'.auth()->id().'_boards';

        if (cache()->has($cacheKey)) {
            return cache($cacheKey);
        }
    
        $boards = auth()->user()->boards;

        $response = Inertia::render('Dashboard', [
            'boards' => $boards,
        ])->withTtl(60);

        cache()->put($cacheKey, $response);

        return $response;
    }

    public function show(Board $board)
    {
        $this->authorize('show', $board);

        $board->load([
            'tags',
            'columns.tasks' => fn ($query) =>
            $query->orderBy('position'),
            'columns.tasks.tags',
            'columns.tasks.subtasks',
        ]);

        return Inertia::render('Board/Board', [
            'board' => $board,
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
        return back();
    }

    public function delete(Board $board)
    {
        $this->authorize('delete', $board);

        $board->delete();
        return back();
    }
}
