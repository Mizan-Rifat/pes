<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    // $table->id();
    // $table->string('name');
    // $table->string('slug')->unique();
    // $table->unsignedInteger('type');
    // $table->unsignedInteger('active');
    // $table->timestamps();
    public function run()
    {
        $tournaments =[
            [
            "name"=> "Premier League",
            "type"=> 1,
            "active"=> 1
            ],
            [
            "name"=> "Elite League",
            "type"=> 1,
            "active"=> 1
            ],
            [
            "name"=> "Master League",
            "type"=> 1,
            "active"=> 1
            ],
            [
            "name"=> "Super League",
            "type"=> 1,
            "active"=> 1
            ],
            [
            "name"=> "Premier League Cup",
            "type"=> 2,
            "active"=> 1
            ],
            [
            "name"=> "Elite League Cup",
            "type"=> 2,
            "active"=> 1
            ],
            [
            "name"=> "Master League Cup",
            "type"=> 2,
            "active"=> 1
            ],
            [
            "name"=> "Super League Cup",
            "type"=> 2,
            "active"=> 1
            ],
            [
            "name"=> "Champions League",
            "type"=> 3,
            "active"=> 1
            ],
            [
            "name"=> "New Tournament",
            "type"=> 1,
            "active"=> 1
            ]
        ];
        foreach($tournaments as $tournament){
            
            DB::table('tournaments')->insert([
                'name'=>$tournament['name'],
                'slug'=>strtolower(str_replace(' ','',$tournament['name'])),
                'type'=>$tournament['type'],
                'active'=>$tournament['active'],

            ]);
        }
    }
}
