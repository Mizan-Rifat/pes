<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class MatchImage extends Model
{
    use CacheQueryBuilder;

    protected $guarded = [];
}
