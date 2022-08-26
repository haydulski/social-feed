<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Maize\Markable\Markable;
use Maize\Markable\Models\Reaction;

class Post extends Model
{
    use HasFactory;
    use Markable;

    protected $fillable = ['user_id', 'body'];

    protected static array $marks = [
        Reaction::class,
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->with('photos');
    }

    public function photos(): MorphMany
    {
        return $this->morphMany(Photo::class, 'photoable');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('created_at');
    }
}
