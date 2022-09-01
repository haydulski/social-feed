<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;

class ReactionPostTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_reaction_add_wrong_data()
    {
        $response = $this->get('/api/reaction/wow/12a');
        $response->assertStatus(500);
    }

    public function test_reaction_add_wrong_type()
    {
        $response = $this->get('/api/reaction/lovvee/8');

        $response->assertSeeText("wrong reaction or post id");
    }

    public function test_reaction_add_good_data()
    {
        $response = $this->get('/api/reaction/love/6');

        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->first(
                fn ($json) =>
                $json->hasAll(['value', 'user'])
            )->etc()
        );
    }
}
