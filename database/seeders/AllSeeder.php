<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Photo;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AllSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Post::truncate();
        Comment::truncate();
        User::truncate();
        Photo::truncate();
        Schema::enableForeignKeyConstraints();

        User::factory(10)->has(Photo::factory())->create();

        Post::factory(500)->state(function () {
            return ['user_id' => rand(1, 10)];
        })->has(Comment::factory(3)->state(function () {
            return ['user_id' => rand(1, 10)];
        }))->has(Photo::factory())->create();
    }
}
