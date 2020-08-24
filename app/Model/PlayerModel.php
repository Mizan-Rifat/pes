<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class PlayerModel extends Model
{
    use CacheQueryBuilder;
    protected $table= 'playermodels';
}
