<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\This;

class MatchResult extends Model
{
    use CacheQueryBuilder;
    public function fixture(){
        return $this->belongsTo('App\Model\Fixture');
    }

}
