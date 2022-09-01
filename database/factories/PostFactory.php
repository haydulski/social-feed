<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    public function definition()
    {
        return [
            'body' => fake()->sentence(12, true),
            'created_at' => fake()->dateTimeBetween($startDate = '-1 year', $endDate = 'now', 'Europe/Warsaw'),
        ];
    }
}
