<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['path', 'photoable'];

    protected $hidden = [
        'photoable_id',
        'photoable_type', 'created_at', 'updated_at',
    ];

    public function photoable(): MorphTo
    {
        return $this->morphTo();
    }
}
