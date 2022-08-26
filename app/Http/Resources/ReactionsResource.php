<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ReactionsResource extends JsonResource
{
    public function toArray($request)
    {
        $user = User::find($this->user_id);

        return [
            'value' => $this->value,
            'user' => $user->name,
        ];
    }
}
