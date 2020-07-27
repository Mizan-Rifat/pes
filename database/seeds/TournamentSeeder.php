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
            'leg' => 2,
            'round'=> 18,
            "active"=> 1
            ],
            [
            "name"=> "Elite League",
            "type"=> 1,
            'leg' => 2,
            'round'=> 18,
            "active"=> 1
            ],
            [
            "name"=> "Master League",
            "type"=> 1,
            'leg' => 2,
            'round'=> 18,
            "active"=> 1
            ],
            [
            "name"=> "Super League",
            "type"=> 1,
            'leg' => 2,
            'round'=> 18,
            "active"=> 1
            ],
            [
            "name"=> "Premier League Cup",
            "type"=> 2,
            'leg' => 1,
            'round'=> 3,
            "active"=> 1
            ],
            [
            "name"=> "Elite League Cup",
            "type"=> 2,
            'leg' => 1,
            'round'=> 3,
            "active"=> 1
            ],
            [
            "name"=> "Master League Cup",
            "type"=> 2,
            'leg' => 1,
            'round'=> 3,
            "active"=> 1
            ],
            [
            "name"=> "Super League Cup",
            "type"=> 2,
            'leg' => 1,
            'round'=> 3,
            "active"=> 1
            ],
            [
            "name"=> "Champions League",
            "type"=> 3,
            'leg' => 1,
            'round'=> 4,
            "active"=> 1
            ],
            
        ];
        foreach($tournaments as $tournament){
            
            DB::table('tournaments')->insert([
                'name'=>$tournament['name'],
                'slug'=>strtolower(str_replace(' ','',$tournament['name'])),
                'type'=>$tournament['type'],
                'leg'=>$tournament['leg'],
                'round'=>$tournament['round'],
                'active'=>$tournament['active'],

            ]);
        }
    }
}
