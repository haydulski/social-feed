<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for ($i = 0; $i < 3; $i++) {
            $userId = $faker->numberBetween(1, 5);
            $user = User::find($userId);
            $user->posts()->create(
                [
                    'body' => $faker->sentence(12, true),
                ]
            );
        }
    }
}
