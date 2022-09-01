<?php

namespace Tests\Feature;

use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class PostsApi extends TestCase
{
    public function test_posts_api_content_test()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->has(10)
                ->first(
                    fn ($json) =>
                    $json->hasAll(['id', 'body', 'users', 'comments', 'reactions', 'photos', 'created_at'])
                        ->missing('password')
                )
        );
    }

    public function test_posts_api_users_content()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->first(
                fn ($json) =>
                $json->has(
                    'users',
                    fn ($json) =>
                    $json->hasAll(['id', 'created_at', 'updated_at', 'photos', 'name', 'email'])
                        ->where('email', 'octavia.jones@example.org')
                )->etc()
            )
        );
    }

    public function test_posts_api_photos_content()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->first(
                fn ($json) =>
                $json->has(
                    'photos',
                    fn ($json) =>
                    $json->first(fn ($js) => $js->hasAll(['id', 'path']))
                )->etc()
            )
        );
    }

    public function test_posts_api_reactions_content()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->first(
                fn ($json) =>
                $json->has(
                    'reactions',
                    fn ($json) =>
                    $json->first(fn ($js) => $js->hasAll(['value', 'user']))->etc()
                )->etc()
            )
        );
    }

    public function test_posts_api_comments_content()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->first(
                fn ($json) =>
                $json->has(
                    'comments',
                    fn ($json) =>
                    $json->has(
                        '0',
                        fn ($js) => $js->hasAll([
                            'id', 'user_id', 'post_id', 'created_at', 'updated_at', 'user', 'body'
                        ])
                    )->etc()
                )->etc()
            )
        );
    }

    public function test_posts_api_second_post_user_id()
    {
        $response = $this->get('/api/posts');
        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->has(
                '1.users',
                fn ($js) =>
                $js->where('id', 7)
                    ->etc()
            )
        );
    }
}
