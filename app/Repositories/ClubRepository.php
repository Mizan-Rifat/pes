<?php

namespace App\Repositories;

use App\Http\Resources\ClubResource;
use App\Model\Club;
use App\Model\Player;
use App\Repositories\Traits\BaseRepository;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ClubRepository
{

    use BaseRepository;

    protected $model;

    public function __construct() {
        $this->model = new Club();
    }


    public function sendInvitation($request){
// return $request;
        $validatedData = $request->validate([
            'club_ids.*' => ['integer','distinct','exists:clubs,id'],
            'tournament_ids.*' => ['integer','distinct','exists:tournaments,id'],
        ]);
            // dd($validatedData);
            $clubs_ids = collect($validatedData['club_ids']);
            $tournament_ids = collect($validatedData['tournament_ids']);

            $join = $clubs_ids->crossJoin($tournament_ids)->map(function($item){
                return [
                    'club_id' => $item[0],
                    'tournament_id' => $item[1],
                    'invitation'=>2
                ];
            })->toArray();

           

            $insert = DB::table('club_tournament')
                ->insert($join);
            
            return $insert;

    }



    public function updateClub($request,$club){

        $validatedData = $request->validate([

            'name' => ['max:20','min:2',Rule::unique('clubs')->ignore($club)],
            // 'name' => ['max:20','min:2','unique:clubs,name,'.Auth::user()->club['name']],
            'owner_id' => [Rule::unique('clubs')->ignore($club),'regex:/^\d{3}-\d{3}-\d{3}$/'],
            'model_id'=>['numeric','exists:club_models,id'],

        ]);
        $validatedData['slug'] = str_replace(' ','',(strtolower($validatedData['name'])));

        $club->update($validatedData);

        return $club;
    }

    public function createClub($request){
        $validatedData = $request->validate([
            'name' => ['required','max:20','min:2','unique:clubs,name,','regex:/[a-zA-Z][a-zA-Z ]+/'],
            'owner_id' => ['required','string','regex:/^\d{3}-\d{3}-\d{3}$/','unique:clubs,owner_id'],
            'model_id'=>['required','numeric'],
        ]);
        $validatedData['slug'] = str_replace(' ','',(strtolower($validatedData['name'])));
        $validatedData['owner_user_id'] = Auth::id();

        $club = $this->model->create($validatedData);

        return $club;
    }
    
    
}
