<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'category', 'description', 'abstract',
        'department', 'year', 'tags', 'github_url', 'live_url',
        'image', 'view_count', 'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'view_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}