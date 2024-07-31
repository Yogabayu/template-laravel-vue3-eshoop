<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_generals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('category_id');
            $table->uuid('shipping_id');
            $table->string('name');
            $table->longText('desc');
            $table->string('slug')->unique();
            $table->decimal('price', 8, 2);
            $table->decimal('discount_price', 8, 2);
            $table->decimal('weight', 8, 2);
            $table->string('material');
            $table->string('color');
            $table->string('dimension');
            $table->integer('stock_quantity');
            $table->boolean('isDangerous');
            $table->boolean('isHotDeal');
            $table->string('location');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('shipping_id')->references('id')->on('shipping_options')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_generals');
    }
};
