<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
  
    public function destroy($id)
    {
        Auth::user()->Notifications->find($id)->delete();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);
    }

    public function notificationMarkAsRead($id){
        Auth::user()->Notifications->find($id)->markAsRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
    public function notificationMarkAsUnRead($id){
        Auth::user()->Notifications->find($id)->markAsUnRead();
        return response()->json([
            'data'=>$id,
            'message' => 'success',
        ],200);

    }
  
}
