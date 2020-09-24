<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class ClubModel extends Model
{
    use CacheQueryBuilder;

    
    protected $table = 'club_models';
    public $timestamps = false;

}
