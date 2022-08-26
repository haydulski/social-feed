<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $posts = Post::all();
        Comment::truncate();

        foreach ($posts as $post) {
            $amount = $faker->numberBetween(4, 50);

            for ($i = 0; $i < $amount; $i++) {
                $user = User::find($faker->numberBetween(1, 5));
                $body = $faker->sentence(4, true);
                $date = $faker->dateTimeBetween('-12 week', '-1 week');

                $post->comments()->create(
                    [
                        'body' => $body,
                        'user_id' => $user->id,
                        'created_at' => $date,
                        'updated_at' => $date,
                    ]
                );
            }
        }
    }
}
