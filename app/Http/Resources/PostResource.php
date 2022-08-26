<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'users' => $this->users,
            'photos' => $this->photos,
            'reactions' => ReactionsResource::collection($this->reactions),
            'comments' => $this->comments,
        ];
    }
}
