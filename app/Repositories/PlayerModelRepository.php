<?php

namespace App\Repositories;

use App\Model\PlayerModel;
use App\Repositories\Traits\BaseRepository;


class PlayerModelRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new PlayerModel();
    }

    
}
