<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FixtureCreated extends Notification
{
    use Queueable;

    protected $type =8;
    protected $tournament;
    protected $slug;



    public function __construct($tournament,$slug)
    {
        $this->tournament = $tournament;
        $this->slug = $slug;

    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    

    public function toDatabase($notifiable){
        return [
            'type'=>$this->type,
            'tournament'=>$this->tournament,
            'slug'=>$this->slug,

        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
                'tournament'=>$this->tournament,
                'slug'=>$this->slug,
            ]
        ]);
    }

    
    public function toArray($notifiable)
    {
        return [
            
        ];
    }
}
