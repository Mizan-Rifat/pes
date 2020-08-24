<?php

namespace App\Http\Support\Database;

use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Facades\Cache;

class Builder extends QueryBuilder
{
    

    protected function runSelect()
    {
        return Cache::store('request')->remember($this->getCacheKey(), 1, function() {
            return parent::runSelect();
        });
    }

 
    protected function getCacheKey()
    {
        return json_encode([
            $this->toSql() => $this->getBindings()
        ]);
    }
}
