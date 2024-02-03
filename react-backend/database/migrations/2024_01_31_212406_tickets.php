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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->foreignId('seat_id')->constrained();
            $table->foreignId('ticket_type_id')->constrained('ticket_types');
            $table->decimal('price', 10, 2)->nullable();
            $table->timestamps();
        });


    }

    public function down()
    {
        Schema::dropIfExists('tickets');
        DB::unprepared('DROP TRIGGER IF EXISTS calculate_ticket_price');
    }
};
