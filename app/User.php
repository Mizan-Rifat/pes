<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

   
    protected $fillable = [
        'name', 'email', 'password',
    ];

 
    protected $hidden = [
        'password', 'remember_token','created_at','updated_at','email_verified_at'
    ];

  
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function club(){
        return $this->hasOne('App\Model\Club','owner_id','id');
    }
}
