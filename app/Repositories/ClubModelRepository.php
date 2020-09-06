<?php

namespace App\Repositories;

use App\Model\ClubModel;
use App\Repositories\Traits\BaseRepository;


class ClubModelRepository
{
    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new ClubModel();
    }

    
}
