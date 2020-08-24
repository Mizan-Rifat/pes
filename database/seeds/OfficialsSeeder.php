<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficialsSeeder extends Seeder
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
                'user_id' => 1,
                'tournament_id' => 1,
            ],
            [
                'user_id' => 2,
                'tournament_id' => 1,
            ],
            [
                'user_id' => 3,
                'tournament_id' => 1,
            ],
        ];
        foreach($datas as $data){
            
            DB::table('officials')->insert([
              'user_id' => $data['user_id'], 
              'tournament_id' => $data['tournament_id'], 

            ]);
        }
    }
}
