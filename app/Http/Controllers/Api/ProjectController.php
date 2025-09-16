<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Get all projects
     */
    public function index(Request $request)
    {
        try {
            $projects = Project::with('user')
                ->where('is_published', true)
                ->orderBy('created_at', 'desc')
                ->paginate(12);

            $projects->getCollection()->transform(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'category' => $project->category,
                    'description' => substr($project->description, 0, 150) . '...',
                    'tags' => $project->tags ? explode(',', $project->tags) : [],
                    'year' => $project->year,
                    'view_count' => $project->view_count,
                    'image_url' => $project->image ? asset('storage/project_images/' . $project->image) : null,
                    'created_at' => $project->created_at->format('Y-m-d'),
                    'author' => [
                        'id' => $project->user->id,
                        'name' => $project->user->name,
                        'department' => $project->user->department,
                        'year_of_study' => $project->user->year_of_study,
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'projects' => $projects,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload a new project
     */
    public function store(Request $request)
    {
        try {
            // Add debugging
            Log::info('=== PROJECT UPLOAD DEBUG ===');
            Log::info('User ID: ' . $request->user()->id);
            Log::info('All request data:', $request->all());
            Log::info('Request method: ' . $request->method());
            Log::info('Content-Type: ' . $request->header('Content-Type'));

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'description' => 'required|string|min:5',
                'department' => 'required|string',
                'year' => 'required|string',
                'tags' => 'nullable|string',
                'abstract' => 'nullable|string',
                'githubUrl' => 'nullable|url',
                'liveUrl' => 'nullable|url',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            ]);

            if ($validator->fails()) {
                Log::error('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $projectData = [
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'category' => $request->category,
                'description' => $request->description,
                'department' => $request->department,
                'year' => $request->year,
                'tags' => $request->tags,
                'abstract' => $request->abstract,
                'github_url' => $request->githubUrl,
                'live_url' => $request->liveUrl,
            ];

            // Handle image upload
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('project_images', $filename, 'public');
                $projectData['image'] = $filename;
            }

            $project = Project::create($projectData);

            return response()->json([
                'success' => true,
                'message' => 'Project uploaded successfully!',
                'project' => [
                    'id' => $project->id,
                    'title' => $project->title,
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Project upload failed.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific project
     */
    public function show($id)
    {
        try {
            $project = Project::with('user')->findOrFail($id);

            // Increment view count
            $project->increment('view_count');

            return response()->json([
                'success' => true,
                'project' => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'category' => $project->category,
                    'description' => $project->description,
                    'abstract' => $project->abstract,
                    'tags' => $project->tags ? explode(',', $project->tags) : [],
                    'year' => $project->year,
                    'view_count' => $project->view_count,
                    'image_url' => $project->image ? asset('storage/project_images/' . $project->image) : null,
                    'github_url' => $project->github_url,
                    'live_url' => $project->live_url,
                    'created_at' => $project->created_at->format('Y-m-d'),
                    'author' => [
                        'id' => $project->user->id,
                        'name' => $project->user->name,
                        'email' => $project->user->email,
                        'department' => $project->user->department,
                        'year_of_study' => $project->user->year_of_study,
                        'profile_image_url' => $project->user->profile_image
                            ? asset('storage/profile_images/' . $project->user->profile_image)
                            : null,
                    ],
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get user's projects
     */
    public function getUserProjects($userId)
    {
        try {
            $projects = Project::where('user_id', $userId)
                ->where('is_published', true)
                ->orderBy('created_at', 'desc')
                ->get();

            $projects = $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => substr($project->description, 0, 150) . '...',
                    'tags' => $project->tags ? explode(',', $project->tags) : [],
                    'year' => $project->year,
                    'created_at' => $project->created_at->format('Y-m-d'),
                ];
            });

            return response()->json([
                'success' => true,
                'projects' => $projects,
            ]);
        } catch (\Exception $e) {
            Log::error('Project upload exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch user projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
