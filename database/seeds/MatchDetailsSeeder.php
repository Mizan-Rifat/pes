<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchDetailsSeeder extends Seeder
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
            "club_id"=> 1,
            "event_id"=> 1,
            "player_id"=> 10,
            "minute"=> 45,
            "assist_player_id"=> 6
            ],
            [
            "id"=> 2,
            "fixture_id"=> 75 - 74,
            "club_id"=> 1,
            "event_id"=> 1,
            "player_id"=> 11,
            "minute"=> 78,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 3,
            "fixture_id"=> 75 - 74,
            "club_id"=> 10,
            "event_id"=> 1,
            "player_id"=> 104,
            "minute"=> 50,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 4,
            "fixture_id"=> 76 - 74,
            "club_id"=> 2,
            "event_id"=> 1,
            "player_id"=> 18,
            "minute"=> 20,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 5,
            "fixture_id"=> 76 - 74,
            "club_id"=> 2,
            "event_id"=> 1,
            "player_id"=> 21,
            "minute"=> 30,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 6,
            "fixture_id"=> 76 - 74,
            "club_id"=> 9,
            "event_id"=> 1,
            "player_id"=> 98,
            "minute"=> 60,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 7,
            "fixture_id"=> 77 - 74,
            "club_id"=> 3,
            "event_id"=> 1,
            "player_id"=> 29,
            "minute"=> 45,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 8,
            "fixture_id"=> 77 - 74,
            "club_id"=> 3,
            "event_id"=> 1,
            "player_id"=> 32,
            "minute"=> 50,
            "assist_player_id"=> 29
            ],
            [
            "id"=> 9,
            "fixture_id"=> 77 - 74,
            "club_id"=> 3,
            "event_id"=> 1,
            "player_id"=> 29,
            "minute"=> 60,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 10,
            "fixture_id"=> 77 - 74,
            "club_id"=> 8,
            "event_id"=> 1,
            "player_id"=> 87,
            "minute"=> 60,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 11,
            "fixture_id"=> 77 - 74,
            "club_id"=> 8,
            "event_id"=> 1,
            "player_id"=> 87,
            "minute"=> 80,
            "assist_player_id"=> 86
            ],
            [
            "id"=> 12,
            "fixture_id"=> 78 - 74,
            "club_id"=> 4,
            "event_id"=> 1,
            "player_id"=> 39,
            "minute"=> 60,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 13,
            "fixture_id"=> 78 - 74,
            "club_id"=> 7,
            "event_id"=> 1,
            "player_id"=> 75,
            "minute"=> 80,
            "assist_player_id"=> 72
            ],
            [
            "id"=> 14,
            "fixture_id"=> 79 - 74,
            "club_id"=> 5,
            "event_id"=> 1,
            "player_id"=> 53,
            "minute"=> 60,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 15,
            "fixture_id"=> 79 - 74,
            "club_id"=> 6,
            "event_id"=> 1,
            "player_id"=> 64,
            "minute"=> 40,
            "assist_player_id"=> 62
            ],
            [
            "id"=> 16,
            "fixture_id"=> 79 - 74,
            "club_id"=> 6,
            "event_id"=> 1,
            "player_id"=> 63,
            "minute"=> 50,
            "assist_player_id"=> 66
            ],
            [
            "id"=> 17,
            "fixture_id"=> 81 - 74,
            "club_id"=> 7,
            "event_id"=> 1,
            "player_id"=> 74,
            "minute"=> 12,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 18,
            "fixture_id"=> 81 - 74,
            "club_id"=> 7,
            "event_id"=> 1,
            "player_id"=> 75,
            "minute"=> 20,
            "assist_player_id"=> 74
            ],
            [
            "id"=> 19,
            "fixture_id"=> 81 - 74,
            "club_id"=> 7,
            "event_id"=> 1,
            "player_id"=> 73,
            "minute"=> 50,
            "assist_player_id"=> 76
            ],
            [
            "id"=> 20,
            "fixture_id"=> 81 - 74,
            "club_id"=> 7,
            "event_id"=> 1,
            "player_id"=> 76,
            "minute"=> 70,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 21,
            "fixture_id"=> 81 - 74,
            "club_id"=> 5,
            "event_id"=> 2,
            "player_id"=> 53,
            "minute"=> 10,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 22,
            "fixture_id"=> 82 - 74,
            "club_id"=> 8,
            "event_id"=> 1,
            "player_id"=> 86,
            "minute"=> 50,
            "assist_player_id"=> 84
            ],
            [
            "id"=> 23,
            "fixture_id"=> 82 - 74,
            "club_id"=> 4,
            "event_id"=> 1,
            "player_id"=> 43,
            "minute"=> 10,
            "assist_player_id"=> 42
            ],
            [
            "id"=> 24,
            "fixture_id"=> 82 - 74,
            "club_id"=> 4,
            "event_id"=> 1,
            "player_id"=> 44,
            "minute"=> 40,
            "assist_player_id"=> 38
            ],
            [
            "id"=> 25,
            "fixture_id"=> 83 - 74,
            "club_id"=> 9,
            "event_id"=> 2,
            "player_id"=> 97,
            "minute"=> 40,
            "assist_player_id"=> 0
            ],
            [
            "id"=> 26,
            "fixture_id"=> 83 - 74,
            "club_id"=> 3,
            "event_id"=> 1,
            "player_id"=> 32,
            "minute"=> 87,
            "assist_player_id"=> 27
            ],
            [
            "id"=> 27,
            "fixture_id"=> 84 - 74,
            "club_id"=> 1,
            "event_id"=> 1,
            "player_id"=> 6,
            "minute"=> 50,
            "assist_player_id"=> 9
            ],
            [
            "id"=> 28,
            "fixture_id"=> 84 - 74,
            "club_id"=> 1,
            "event_id"=> 1,
            "player_id"=> 9,
            "minute"=> 60,
            "assist_player_id"=> 6
            ],
            [
            "id"=> 29,
            "fixture_id"=> 84 - 74,
            "club_id"=> 2,
            "event_id"=> 1,
            "player_id"=> 21,
            "minute"=> 40,
            "assist_player_id"=> 18
            ]
        ];


        foreach($datas as $data){
            
            DB::table('match_details')->insert([
                'fixture_id'=>$data['fixture_id'],
                'club_id'=>$data['club_id'],
                'event_id'=>$data['event_id'],
                'player_id'=>$data['player_id'],
                'minute'=>$data['minute'],
                'assist_player_id'=>$data['assist_player_id'],

            ]);

        }
    }
}
