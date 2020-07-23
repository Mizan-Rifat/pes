<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClubTournamentSeeder extends Seeder
{

     
    public function run()
    {
        $arrays = [
            [
            "id"=> 1,
            "club_id"=> 1,
            "tournament_id"=> 1,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 2,
            "club_id"=> 2,
            "tournament_id"=> 1,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 3,
            "club_id"=> 3,
            "tournament_id"=> 1,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 4,
            "club_id"=> 4,
            "tournament_id"=> 1,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 5,
            "club_id"=> 5,
            "tournament_id"=> 1,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 6,
            "club_id"=> 6,
            "tournament_id"=> 1,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 8,
            "club_id"=> 8,
            "tournament_id"=> 1,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 11,
            "club_id"=> 11,
            "tournament_id"=> 2,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 12,
            "club_id"=> 12,
            "tournament_id"=> 2,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 13,
            "club_id"=> 13,
            "tournament_id"=> 2,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 14,
            "club_id"=> 14,
            "tournament_id"=> 2,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 15,
            "club_id"=> 15,
            "tournament_id"=> 2,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 16,
            "club_id"=> 16,
            "tournament_id"=> 2,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 17,
            "club_id"=> 17,
            "tournament_id"=> 2,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 18,
            "club_id"=> 18,
            "tournament_id"=> 2,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 19,
            "club_id"=> 19,
            "tournament_id"=> 2,
            "team_as_1"=> 9,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 20,
            "club_id"=> 20,
            "tournament_id"=> 2,
            "team_as_1"=> 10,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 21,
            "club_id"=> 21,
            "tournament_id"=> 3,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 22,
            "club_id"=> 22,
            "tournament_id"=> 3,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 23,
            "club_id"=> 23,
            "tournament_id"=> 3,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 24,
            "club_id"=> 24,
            "tournament_id"=> 3,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 25,
            "club_id"=> 25,
            "tournament_id"=> 3,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 26,
            "club_id"=> 26,
            "tournament_id"=> 3,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 27,
            "club_id"=> 27,
            "tournament_id"=> 3,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 28,
            "club_id"=> 28,
            "tournament_id"=> 3,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 29,
            "club_id"=> 29,
            "tournament_id"=> 3,
            "team_as_1"=> 9,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 30,
            "club_id"=> 30,
            "tournament_id"=> 3,
            "team_as_1"=> 10,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 31,
            "club_id"=> 31,
            "tournament_id"=> 4,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 32,
            "club_id"=> 32,
            "tournament_id"=> 4,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 33,
            "club_id"=> 33,
            "tournament_id"=> 4,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 34,
            "club_id"=> 34,
            "tournament_id"=> 4,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 35,
            "club_id"=> 35,
            "tournament_id"=> 4,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 36,
            "club_id"=> 36,
            "tournament_id"=> 4,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 37,
            "club_id"=> 37,
            "tournament_id"=> 4,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 38,
            "club_id"=> 38,
            "tournament_id"=> 4,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 41,
            "club_id"=> 1,
            "tournament_id"=> 5,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 42,
            "club_id"=> 2,
            "tournament_id"=> 5,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 43,
            "club_id"=> 3,
            "tournament_id"=> 5,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 44,
            "club_id"=> 4,
            "tournament_id"=> 5,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 45,
            "club_id"=> 5,
            "tournament_id"=> 5,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 46,
            "club_id"=> 6,
            "tournament_id"=> 5,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 47,
            "club_id"=> 7,
            "tournament_id"=> 5,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 48,
            "club_id"=> 8,
            "tournament_id"=> 5,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 49,
            "club_id"=> 11,
            "tournament_id"=> 6,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 50,
            "club_id"=> 12,
            "tournament_id"=> 6,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 51,
            "club_id"=> 13,
            "tournament_id"=> 6,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 52,
            "club_id"=> 14,
            "tournament_id"=> 6,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 53,
            "club_id"=> 15,
            "tournament_id"=> 6,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 54,
            "club_id"=> 16,
            "tournament_id"=> 6,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 55,
            "club_id"=> 17,
            "tournament_id"=> 6,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 56,
            "club_id"=> 18,
            "tournament_id"=> 6,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 57,
            "club_id"=> 21,
            "tournament_id"=> 7,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 58,
            "club_id"=> 22,
            "tournament_id"=> 7,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 59,
            "club_id"=> 23,
            "tournament_id"=> 7,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 60,
            "club_id"=> 24,
            "tournament_id"=> 7,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 61,
            "club_id"=> 25,
            "tournament_id"=> 7,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 62,
            "club_id"=> 26,
            "tournament_id"=> 7,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 63,
            "club_id"=> 27,
            "tournament_id"=> 7,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 64,
            "club_id"=> 28,
            "tournament_id"=> 7,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 65,
            "club_id"=> 31,
            "tournament_id"=> 8,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 66,
            "club_id"=> 32,
            "tournament_id"=> 8,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 67,
            "club_id"=> 33,
            "tournament_id"=> 8,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 68,
            "club_id"=> 34,
            "tournament_id"=> 8,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 69,
            "club_id"=> 35,
            "tournament_id"=> 8,
            "team_as_1"=> 5,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 70,
            "club_id"=> 36,
            "tournament_id"=> 8,
            "team_as_1"=> 6,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 71,
            "club_id"=> 37,
            "tournament_id"=> 8,
            "team_as_1"=> 7,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 72,
            "club_id"=> 38,
            "tournament_id"=> 8,
            "team_as_1"=> 8,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 73,
            "club_id"=> 1,
            "tournament_id"=> 9,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 74,
            "club_id"=> 2,
            "tournament_id"=> 9,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 75,
            "club_id"=> 3,
            "tournament_id"=> 9,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 76,
            "club_id"=> 4,
            "tournament_id"=> 9,
            "team_as_1"=> 1,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 77,
            "club_id"=> 11,
            "tournament_id"=> 9,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 78,
            "club_id"=> 12,
            "tournament_id"=> 9,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 79,
            "club_id"=> 13,
            "tournament_id"=> 9,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 80,
            "club_id"=> 14,
            "tournament_id"=> 9,
            "team_as_1"=> 2,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 81,
            "club_id"=> 21,
            "tournament_id"=> 9,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 82,
            "club_id"=> 22,
            "tournament_id"=> 9,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 83,
            "club_id"=> 23,
            "tournament_id"=> 9,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 84,
            "club_id"=> 24,
            "tournament_id"=> 9,
            "team_as_1"=> 3,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 85,
            "club_id"=> 31,
            "tournament_id"=> 9,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 86,
            "club_id"=> 32,
            "tournament_id"=> 9,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 87,
            "club_id"=> 33,
            "tournament_id"=> 9,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 88,
            "club_id"=> 34,
            "tournament_id"=> 9,
            "team_as_1"=> 4,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 89,
            "club_id"=> 7,
            "tournament_id"=> 1,
            "team_as_1"=> null,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 94,
            "club_id"=> 9,
            "tournament_id"=> 1,
            "team_as_1"=> null,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 95,
            "club_id"=> 10,
            "tournament_id"=> 1,
            "team_as_1"=> null,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 96,
            "club_id"=> 39,
            "tournament_id"=> 4,
            "team_as_1"=> null,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ],
            [
            "id"=> 97,
            "club_id"=> 40,
            "tournament_id"=> 4,
            "team_as_1"=> null,
            "team_as_2"=> null,
            "team_as_3"=> null,
            "team_as_4"=> null,
            "team_as_5"=> null,
            "team_as_6"=> null
            ]
        ];

        foreach($arrays as $array){
            
            DB::table('club_tournament')->insert([
                'club_id'=>$array['club_id'],
                'tournament_id'=>$array['tournament_id']
            ]);
        }
    }
}
