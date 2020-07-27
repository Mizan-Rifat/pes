<?php

namespace App\Repositories;

use App\Model\Club;
use App\Repositories\Traits\BaseRepository;

class ClubRepository
{

    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Club();
    }

    public function test(){
        return 'test';
    }

    
}
