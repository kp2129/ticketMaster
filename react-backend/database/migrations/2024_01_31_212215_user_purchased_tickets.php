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
        Schema::create('user_purchased_tickets', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('event_id')->constrained();
            $table->foreignId('ticket_type_id')->constrained('ticket_types');
            $table->unsignedInteger('quantity');
            $table->decimal('total_price', 10, 2);
            $table->timestamp('purchase_date')->useCurrent();
            $table->primary(['user_id', 'event_id', 'ticket_type_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_purchased_tickets');
    }
};
