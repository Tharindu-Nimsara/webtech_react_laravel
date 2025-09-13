<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('department')->after('email');
            $table->string('year_of_study')->after('department');
            $table->text('bio')->nullable()->after('year_of_study');
            $table->text('skills')->nullable()->after('bio');
            $table->string('github_url')->nullable()->after('skills');
            $table->string('website_url')->nullable()->after('github_url');
            $table->string('phone')->nullable()->after('website_url');
            $table->string('location')->nullable()->after('phone');
            $table->string('profile_image')->nullable()->after('location');
            $table->boolean('is_active')->default(true)->after('profile_image');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'department', 'year_of_study', 'bio', 'skills', 
                'github_url', 'website_url', 'phone', 'location', 
                'profile_image', 'is_active'
            ]);
        });
    }
};