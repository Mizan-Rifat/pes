<?php

namespace App\Repositories\Traits;

use Illuminate\Auth\Events\Validated;

trait BaseRepository
{
   
    public function __call($method, $parameters)
    {
        return $this->model->$method(...$parameters);
    }

    public function search($request,$column='name'){

        $validatedData  = $request->validate([
            // 'query' => ['required','regex:/^[\pL\s\-]+$/u.']
            'query' => ['required']
        ]);

        $results = $this->model->where($column, 'LIKE', '%' . $validatedData['query'] . '%')->limit(5)->get();
        
        return $results;
    }
}