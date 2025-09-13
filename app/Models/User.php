<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'department',
        'year_of_study',
        'bio',
        'skills',
        'github_url',
        'website_url',
        'phone',
        'location',
        'profile_image',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        // Remove 'password' => 'hashed' - this line causes the error
    ];

    // Add this method for the initials attribute
    public function getInitialsAttribute()
    {
        $names = explode(' ', $this->name);
        $initials = '';
        foreach ($names as $name) {
            $initials .= strtoupper(substr($name, 0, 1));
        }
        return substr($initials, 0, 2);
    }

    // Add this scope for active users
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}