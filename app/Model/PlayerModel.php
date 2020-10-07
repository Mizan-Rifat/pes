<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class PlayerModel extends Model
{
    use CacheQueryBuilder;
    protected $table= 'playermodels';
    
    protected $guarded = [];


    public function setPositionAttribute($value){
        return $this->attributes['position'] = strtoupper($value);
    }
    public function setNameAttribute($value){
        return $this->attributes['name'] = strtoupper($value);
    }
}
