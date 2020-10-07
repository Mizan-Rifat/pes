<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserRegistered extends Notification
{
    use Queueable;

    protected $type =1;
    protected $user_id;



    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    

    public function toDatabase($notifiable){
        return [
            'user_id' => $this->user_id,
            'type'=>$this->type,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data'=>[
                'type'=>$this->type,
                'user_id' => $this->user_id
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
