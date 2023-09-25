<?php

namespace Database\Factories;

use App\Models\Board;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Column>
 */
class ColumnFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = ["bg-red-400", "bg-blue-400", "bg-amber-400", "bg-pink-400", "bg-green-400"];

        return [
            'name' => fake()->name(),
            'color' => $colors[array_rand($colors)],
            'user_id' => User::factory(),
            'board_id' => Board::factory(),
        ];
    }
}
