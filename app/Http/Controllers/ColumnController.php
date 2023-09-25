<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Column;
use App\Rules\MaxEntries;

class ColumnController extends Controller
{
    public function store(Board $board)
    {
        $this->authorize('store', $board);

        request()->validate([
            'name' => ['required', 'string', 'max:128'],
            'color' => ['required', 'string', 'max:64'],
            'items' => ['required', new MaxEntries($board->columns, 4)],
        ]);

        $column = new Column([
            'name' => request('name'),
            'color' => request('color'),
        ]);

        $column->user_id = auth()->id();
        $column->board_id = $board->id;

        $column->save();

        return to_route('boards.show', $board->id);
    }

    public function edit(Column $column)
    {
        $this->authorize('edit', $column);

        request()->validate([
            'name' => ['required', 'max:255']
        ]);

        $column->update(['name' => request('name')]);

        return back();
    }

    public function delete(Column $column)
    {
        $this->authorize('delete', $column);

        $column->delete();

        return back();
    }
}
