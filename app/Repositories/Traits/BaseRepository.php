<?php

namespace App\Repositories\Traits;

trait BaseRepository
{
   
    public function __call($method, $parameters)
    {
        return $this->model->$method(...$parameters);
    }
}