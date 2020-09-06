<?php

namespace App;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use Notifiable;

    use CacheQueryBuilder;

   
    // protected $fillable = [
    //     'name', 'email', 'password',
    // ];
    protected $guarded = [];

 
    protected $hidden = [
        'password', 'remember_token','created_at','updated_at',
    ];

  
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function club(){
        return $this->hasOne('App\Model\Club','owner_user_id','id');
    }

    public function toggleBlock()
    {
        return $this->update([
            'blocked' => DB::raw('NOT blocked')
        ]);

    }
}
