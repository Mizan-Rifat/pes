<?php

namespace App\Repositories\Traits;

use App\Model\Club;
use App\Model\Tournament;
use Illuminate\Support\Facades\DB;

trait PlayerStatsRepository
{

   
    public static function get_all_stats($tournament_id)
    {
        $players = Tournament::find($tournament_id)->players->pluck('id');
        $matches = Tournament::find($tournament_id)->fixtures->pluck('id');



        $stats = $players->map(function ($player) use ($matches) {
            return self::get_player_stats($player, $matches);
        });

        $filterStats = $stats->filter(function ($stat) {
            return $stat['ratings_average'] != 0;
        });

        return array_values($filterStats->toArray());
    }


    public static function get_player_stats($playerID, $matches)
    {

        $stat['matches_num'] = DB::table('match_ratings')
            ->where('player_id', $playerID)
            ->whereIn('match_id', $matches)
            ->count();

        $stat['goals'] = DB::table('tbl_match_stats')
            ->where('player_id', $playerID)
            ->whereIn('match_id', $matches)
            ->where('event', '1')
            ->count();

        $stat['assists'] = DB::table('tbl_match_stats')
            ->whereIn('match_id', $matches)
            ->where('assist_player_id', $playerID)
            ->count();

        $stat['yellow_cards'] = DB::table('tbl_match_stats')
            ->where('player_id', $playerID)
            ->whereIn('match_id', $matches)
            ->where('event', '2')
            ->count();

        $stat['red_cards'] = DB::table('tbl_match_stats')
            ->where('player_id', $playerID)
            ->whereIn('match_id', $matches)
            ->where('event', '3')
            ->count();

        $totalRatings = DB::table('tbl_match_ratings')
            ->where('player_id', $playerID)
            ->whereIn('match_id', $matches)
            ->sum('ratings');
        if ($stat['matches_num'] != 0) {

            $stat['ratings_average'] = $totalRatings / $stat['matches_num'];
        } else {
            $stat['ratings_average'] = 0;
        }
        return $stat;
    }

}
