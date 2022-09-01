<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\ReactionsResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Maize\Markable\Models\Reaction;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with([
            'comments' => ['user', 'user.photos'],
            'photos',
            'users',
            'reactions',
        ])->take(10)->get();

        return response()->json(PostResource::collection($posts));
    }

    public function addReaction(string $type, int $id): JsonResponse
    {
        $cleanType = filter_var($type, FILTER_SANITIZE_SPECIAL_CHARS);
        if (!is_int($id) || !in_array($cleanType, ['like', 'wow', 'love', 'haha'])) {
            return response()->json('wrong reaction or post id', 500);
        }
        $post = Post::find($id);
        $user = User::find(4);

        $reactions = $user->reactions;

        if (count($reactions) > 0 && $reactions[0]['value'] != $type) {
            $user->reactions()->delete();
        }

        if (isset($post)) {
            Reaction::toggle($post, $user, $cleanType);
            $reactions = ReactionsResource::collection($post->reactions);

            return response()->json($reactions);
        }
    }

    public function showReactions(string $post_id): JsonResponse
    {
        $post = Post::find(filter_var($post_id, FILTER_SANITIZE_SPECIAL_CHARS));
        if ($post) {
            $reactions = $post->reactions;

            return response()->json($reactions);
        }

        return response()->json('post not found', 403);
    }
}
