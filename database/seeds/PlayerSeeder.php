<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
    //  */
    // $table->unsignedInteger('club_id');
    //         $table->unsignedInteger('playermodel_id');
    //         $table->unsignedInteger('jersey');
    public function run()
    {
        for($i=1;$i<41;$i++){
            for($j=1;$j<12;$j++){
                DB::table('players')->insert([
                    'club_id'=>$i,
                    'playermodel_id'=>$j,
                    'jersey'=>$j
                ]);
            }
        }
        
    }
}
