<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Get user profile by ID
     */
    public function show($userId)
    {
        try {
            $user = User::findOrFail($userId);

            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'githubUrl' => $user->github_url,
                    'websiteUrl' => $user->website_url,
                    'location' => $user->location,
                    'profileImage' => $user->profile_image 
                        ? asset('storage/profile_images/' . $user->profile_image) 
                        : null,
                    'bio' => $user->bio,
                    'degree' => $user->department, // Using department as degree
                    'year' => $user->year_of_study,
                    'skills' => $user->skills ? explode(',', $user->skills) : [],
                    'projectCount' => $user->projects()->where('is_published', true)->count(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'bio' => 'nullable|string|max:1000',
                'skills' => 'nullable|string|max:500',
                'github' => 'nullable|url',
                'website' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20',
                'location' => 'nullable|string|max:255',
                'yearOfStudy' => 'nullable|string|in:1st Year,2nd Year,3rd Year,4th Year,Graduate,Postgraduate',
                'profilePicture' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $updateData = [];

            // Update basic fields
            if ($request->has('bio')) $updateData['bio'] = $request->bio;
            if ($request->has('skills')) $updateData['skills'] = $request->skills;
            if ($request->has('github')) $updateData['github_url'] = $request->github;
            if ($request->has('website')) $updateData['website_url'] = $request->website;
            if ($request->has('phone')) $updateData['phone'] = $request->phone;
            if ($request->has('location')) $updateData['location'] = $request->location;
            if ($request->has('yearOfStudy')) $updateData['year_of_study'] = $request->yearOfStudy;

            // Handle profile picture upload
            if ($request->hasFile('profilePicture')) {
                // Delete old image if exists
                if ($user->profile_image && Storage::disk('public')->exists('profile_images/' . $user->profile_image)) {
                    Storage::disk('public')->delete('profile_images/' . $user->profile_image);
                }

                $file = $request->file('profilePicture');
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('profile_images', $filename, 'public');
                $updateData['profile_image'] = $filename;
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'bio' => $user->bio,
                    'skills' => $user->skills ? explode(',', $user->skills) : [],
                    'github_url' => $user->github_url,
                    'website_url' => $user->website_url,
                    'phone' => $user->phone,
                    'location' => $user->location,
                    'year_of_study' => $user->year_of_study,
                    'profile_image_url' => $user->profile_image 
                        ? asset('storage/profile_images/' . $user->profile_image) 
                        : null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Profile update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}