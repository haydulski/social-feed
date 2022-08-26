<?php

namespace Database\Seeders;

use App\Models\Photo;
use Faker\Factory;
use Illuminate\Database\Seeder;

class PhotoSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $dataUsers = [];

        // user photos
        for ($i = 1; $i < 6; $i++) {
            $dataUsers[] = [
                'path' => $faker->imageUrl,
                'photoable_id' => $i,
                'photoable_type' => 'App\Models\User',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        Photo::insert($dataUsers);

        // posts photos

        $dataPosts = [];

        for ($i = 1; $i < 3; $i++) {
            $dataPosts[] = [
                'path' => $faker->imageUrl,
                'photoable_id' => $i,
                'photoable_type' => 'App\Models\Post',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Photo::insert($dataPosts);
    }
}
