<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use App\Models\Board;
use App\Models\Column;
use App\Models\Subtask;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'John Test',
            'email' => 'test@example.com',
            'password' => 'testpass',
        ]);

        $board = Board::factory()->for($user)->create([
            'name' => 'Test Board',
        ]);
        

        $column = Column::factory()->for($board)->create();
        $column2 = Column::factory()->for($board)->create();
        $task = Task::factory()->for($column)->create([
            'title' => 'Test task',
        ]);
        
        Subtask::factory(5)->for($task)->create();

        Task::factory(10)->for($column)->create();
        Task::factory(10)->for($column2)->create();

        Column::factory(1)->for($board)->create();

        Board::factory(3)->for($user)->create();
    }
}
