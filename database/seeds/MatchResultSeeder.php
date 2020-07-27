<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $datas = [
            [
            "id"=> 1,
            "fixture_id"=> 75 - 74,
            "match_status"=> 1
            ],
            [
            "id"=> 2,
            "fixture_id"=> 76 - 74,
            "match_status"=> 2
            ],
            [
            "id"=> 3,
            "fixture_id"=> 77 - 74,
            "match_status"=> 3
            ],
            [
            "id"=> 4,
            "fixture_id"=> 78 - 74,
            "match_status"=> 0
            ],
            [
            "id"=> 5,
            "fixture_id"=> 79 - 74,
            "match_status"=> 6
            ],
            [
            "id"=> 6,
            "fixture_id"=> 80 - 74,
            "match_status"=> 0
            ],
            [
            "id"=> 7,
            "fixture_id"=> 81 - 74,
            "match_status"=> 7
            ],
            [
            "id"=> 8,
            "fixture_id"=> 82 - 74,
            "match_status"=> 4
            ],
            [
            "id"=> 9,
            "fixture_id"=> 83 - 74,
            "match_status"=> 3
            ],
            [
            "id"=> 10,
            "fixture_id"=> 84 - 74,
            "match_status"=> 1
            ]
        ];

        foreach($datas as $data){
            
            DB::table('match_results')->insert([
                'fixture_id'=>$data['fixture_id'],
                'match_status'=>$data['match_status'],
                'match_status'=>$data['match_status'],

            ]);

        }
    }
}
