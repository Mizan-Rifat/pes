<?php

namespace App\Http\Controllers;

use App\Model\Fixture;
use App\Repositories\FixtureRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
   
    public function index(FixtureRepository $fixtureRepository)
    {

        // $names= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'];
        $names= ['A','B','C','D','E','F','G','H','I','J'];
        $members = array("name1","name2","name3","name4");
        return $this->scheduler($members);
        // $names= ['A','B','C','D','E','F','G','H'];
        

        return $fixtureRepository->createKnockoutFixtures($names,1,2);
        // return $fixtureRepository->createRoundRobinFixtures($names);
    }
    public function scheduler($teams){
        if (count($teams)%2 != 0){
            array_push($teams,"bye");
        }
        $away = array_splice($teams,(count($teams)/2));
        $home = $teams;
        for ($i=0; $i < count($home)+count($away)-1; $i++){
            for ($j=0; $j<count($home); $j++){
                $round[$i][$j]["Home"]=$home[$j];
                $round[$i][$j]["Away"]=$away[$j];
            }
            if(count($home)+count($away)-1 > 2){
                array_unshift($away,array_shift(array_splice($home,1,1)));
                array_push($home,array_pop($away));
            }
        }
        return $round;
    }
    
}


