<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\This;

class MatchResult extends Model
{
    public function fixture(){
        return $this->belongsTo('App\Model\Fixture');
    }

}
