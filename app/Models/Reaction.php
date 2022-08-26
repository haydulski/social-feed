<?php

namespace App\Models;

use Maize\Markable\Mark;

class Reaction extends Mark
{
    public static function markableRelationName(): string
    {
        return 'reactions';
    }
}
