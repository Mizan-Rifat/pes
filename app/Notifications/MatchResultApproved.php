<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MatchResultApproved extends Notification
{
    use Queueable;

    protected $type = 9;
    protected $fixture_id;
    protected $tournament;
    protected $team1;
    protected $team2;
    protected $official;


    public function __construct($fixture_id,$tournament,$team1,$team2,$official)
    {
        $this->fixture_id = $fixture_id;
        $this->tournament = $tournament;
        $this->team1 = $team1;
        $this->team2 = $team2;
        $this->official = $official;

    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'type'=>$this->type,
            'fixture_id'=>$this->fixture_id,
            'tournament'=>$this->tournament,
            'team1'=>$this->team1,
            'team2'=>$this->team2,
            'official'=>$this->official,
        ];
    }
    
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
                'fixture_id'=>$this->fixture_id,
                'tournament'=>$this->tournament,
                'team1'=>$this->team1,
                'team2'=>$this->team2,
                'official'=>$this->official,
            ]
        ]);
    }


    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
