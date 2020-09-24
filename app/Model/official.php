<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Official extends Model
{
    use CacheQueryBuilder;

    public function details(){
        return $this->hasOne('App\User','id','user_id');
    }
}
