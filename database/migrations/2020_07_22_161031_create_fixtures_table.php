<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFixturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixtures', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('team1_id');
            $table->unsignedInteger('team2_id');
            $table->dateTime('date');
            $table->unsignedInteger('host_id');
            $table->unsignedInteger('tournament_id');
            $table->unsignedInteger('group_');
            $table->unsignedInteger('round');
            $table->unsignedInteger('leg');
            $table->unsignedInteger('completed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fixtures');
    }
}
