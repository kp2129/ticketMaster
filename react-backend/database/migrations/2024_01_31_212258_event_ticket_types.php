<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('event_ticket_types', function (Blueprint $table) {
            $table->foreignId('event_id')->constrained();
            $table->foreignId('ticket_type_id')->constrained('ticket_types');
            $table->primary(['event_id', 'ticket_type_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('event_ticket_types');
    }
};
