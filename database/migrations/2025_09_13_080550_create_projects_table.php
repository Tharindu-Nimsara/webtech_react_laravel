<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('category');
            $table->text('description');
            $table->text('abstract')->nullable();
            $table->string('department');
            $table->string('year');
            $table->text('tags')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('image')->nullable();
            $table->integer('view_count')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};