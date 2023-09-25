<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Board;
use App\Models\Column;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'description' => fake()->paragraph(),
            'user_id' => User::factory(),
            'column_id' => Column::factory(),
            'board_id' => Board::factory(),
        ];
    }
}
