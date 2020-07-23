<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clubs = [
            [
            "id"=> 1,
            "name"=> "FC RED RANGERS",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 1
            ],
            [
            "id"=> 2,
            "name"=> "FC BARCELONA",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 2
            ],
            [
            "id"=> 3,
            "name"=> "REAL MADRID",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 3
            ],
            [
            "id"=> 4,
            "name"=> "Valencia",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 4
            ],
            [
            "id"=> 5,
            "name"=> "Atletico Madrid",
            "logo"=> "mulogo.png",
            "owner_id"=> 5
            ],
            [
            "id"=> 6,
            "name"=> "Athletic Bilbao",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 6
            ],
            [
            "id"=> 7,
            "name"=> "SEVILLA",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 7
            ],
            [
            "id"=> 8,
            "name"=> "LEVANTE",
            "logo"=> "mulogo.png",
            "owner_id"=> 8
            ],
            [
            "id"=> 9,
            "name"=> "VILLAREAL",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 9
            ],
            [
            "id"=> 10,
            "name"=> "REAL BETIS",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 10
            ],
            [
            "id"=> 11,
            "name"=> "MANCHESTER UNITED",
            "logo"=> "mulogo.png",
            "owner_id"=> 11
            ],
            [
            "id"=> 12,
            "name"=> "MANCHESTER CITY",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 12
            ],
            [
            "id"=> 13,
            "name"=> "LIVERPOOL",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 13
            ],
            [
            "id"=> 14,
            "name"=> "ARSENAL",
            "logo"=> "mulogo.png",
            "owner_id"=> 14
            ],
            [
            "id"=> 15,
            "name"=> "CHELSEA",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 15
            ],
            [
            "id"=> 16,
            "name"=> "TOTTENHAM",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 16
            ],
            [
            "id"=> 17,
            "name"=> "FULLHAM",
            "logo"=> "mulogo.png",
            "owner_id"=> 17
            ],
            [
            "id"=> 18,
            "name"=> "NEW CASTLE",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 18
            ],
            [
            "id"=> 19,
            "name"=> "EVERTON",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 19
            ],
            [
            "id"=> 20,
            "name"=> "CRYSTAL PALACE",
            "logo"=> "mulogo.png",
            "owner_id"=> 20
            ],
            [
            "id"=> 21,
            "name"=> "Atalanta",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 21
            ],
            [
            "id"=> 22,
            "name"=> "Bologna",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 22
            ],
            [
            "id"=> 23,
            "name"=> "Brescia",
            "logo"=> "mulogo.png",
            "owner_id"=> 23
            ],
            [
            "id"=> 24,
            "name"=> "Cagliari",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 24
            ],
            [
            "id"=> 25,
            "name"=> "Juventus",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 25
            ],
            [
            "id"=> 26,
            "name"=> "Fiorentina",
            "logo"=> "mulogo.png",
            "owner_id"=> 26
            ],
            [
            "id"=> 27,
            "name"=> "Lazio",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 27
            ],
            [
            "id"=> 28,
            "name"=> "INTER MILAN",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 28
            ],
            [
            "id"=> 29,
            "name"=> "AC MILAN",
            "logo"=> "mulogo.png",
            "owner_id"=> 29
            ],
            [
            "id"=> 30,
            "name"=> "NAPOLI",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 30
            ],
            [
            "id"=> 31,
            "name"=> "BAYERN MUNICH",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 31
            ],
            [
            "id"=> 32,
            "name"=> "FORTUNA",
            "logo"=> "mulogo.png",
            "owner_id"=> 32
            ],
            [
            "id"=> 33,
            "name"=> "BORUSSIA DORTMUND",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 33
            ],
            [
            "id"=> 34,
            "name"=> "FC SHALKE",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 34
            ],
            [
            "id"=> 35,
            "name"=> "LEVERKUSEN",
            "logo"=> "mulogo.png",
            "owner_id"=> 35
            ],
            [
            "id"=> 36,
            "name"=> "HOFFENHEIM",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 36
            ],
            [
            "id"=> 37,
            "name"=> "WOLFSBURG",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 37
            ],
            [
            "id"=> 38,
            "name"=> "FRANKFURT",
            "logo"=> "mulogo.png",
            "owner_id"=> 38
            ],
            [
            "id"=> 39,
            "name"=> "HERTHA",
            "logo"=> "realmadrid-logo.png",
            "owner_id"=> 39
            ],
            [
            "id"=> 40,
            "name"=> "LEIPZIG",
            "logo"=> "fcb_logo_PNG19.png",
            "owner_id"=> 40
            ]
        ];

        foreach($clubs as $club){
            DB::table('clubs')->insert([
                'name' => $club['name'],
                'slug'=>strtolower(str_replace(' ','',$club['name'])),
                'logo'=>$club['logo'],
                'owner_id' => $club['owner_id']
            ]);
        }
    }
}
