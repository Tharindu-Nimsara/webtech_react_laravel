<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

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

            // Log incoming request
            Log::info('=== PROFILE UPDATE DEBUG ===');
            Log::info('User ID: ' . $user->id);
            Log::info('All request data:', $request->all());
            Log::info('Request method: ' . $request->method());
            Log::info('Content-Type: ' . $request->header('Content-Type'));

            Log::info('=== FILE UPLOAD DEBUG ===');
            Log::info('Has file: ' . ($request->hasFile('profilePicture') ? 'YES' : 'NO'));

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
                Log::error('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Validation passed');

            $updateData = [];

            // Log each field check
            Log::info('Checking fields...');
            if ($request->has('bio')) {
                $updateData['bio'] = $request->bio;
                Log::info('Bio found: ' . $request->bio);
            }
            if ($request->has('skills')) {
                $updateData['skills'] = $request->skills;
                Log::info('Skills found: ' . $request->skills);
            }
            if ($request->has('github')) {
                $updateData['github_url'] = $request->github;
                Log::info('GitHub found: ' . $request->github);
            }
            if ($request->has('website')) {
                $updateData['website_url'] = $request->website;
                Log::info('Website found: ' . $request->website);
            }
            if ($request->has('phone')) {
                $updateData['phone'] = $request->phone;
                Log::info('Phone found: ' . $request->phone);
            }
            if ($request->has('location')) {
                $updateData['location'] = $request->location;
                Log::info('Location found: ' . $request->location);
            }
            if ($request->has('yearOfStudy')) {
                $updateData['year_of_study'] = $request->yearOfStudy;
                Log::info('Year of study found: ' . $request->yearOfStudy);
            }

            // Handle profile picture upload
            if ($request->hasFile('profilePicture')) {
                Log::info('Processing file upload...');

                $file = $request->file('profilePicture');

                // Check if file is valid
                if (!$file->isValid()) {
                    Log::error('Invalid file uploaded');
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid file uploaded'
                    ], 400);
                }

                try {
                    // Delete old image if exists
                    if ($user->profile_image && Storage::disk('public')->exists('profile_images/' . $user->profile_image)) {
                        Log::info('Deleting old image: ' . $user->profile_image);
                        Storage::disk('public')->delete('profile_images/' . $user->profile_image);
                    }

                    // Generate filename
                    $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                    Log::info('Generated filename: ' . $filename);

                    // Store the file
                    $storedPath = $file->storeAs('profile_images', $filename, 'public');
                    Log::info('File stored at: ' . $storedPath);

                    // Verify file was stored
                    if (Storage::disk('public')->exists('profile_images/' . $filename)) {
                        Log::info('File verified in storage');
                        $updateData['profile_image'] = $filename;
                    } else {
                        Log::error('File not found after storage attempt');
                        throw new \Exception('File upload failed - file not found after storage');
                    }
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed: ' . $e->getMessage()
                    ], 500);
                }
            }
            Log::info('Final update data:', $updateData);

            if (empty($updateData)) {
                Log::warning('Update data is empty - no fields to update');
                return response()->json([
                    'success' => false,
                    'message' => 'No data to update'
                ]);
            }

            // Get user data before update
            $userBefore = [
                'bio' => $user->bio,
                'year_of_study' => $user->year_of_study,
                'updated_at' => $user->updated_at
            ];
            Log::info('User before update:', $userBefore);
            Log::info('Final update data:', $updateData);

            // Perform update
            $updateResult = $user->update($updateData);
            Log::info('Update result: ' . ($updateResult ? 'true' : 'false'));
            Log::info('Database update result: ' . ($updateResult ? 'SUCCESS' : 'FAILED'));

            // Get user data after update
            $user->refresh();
            $userAfter = [
                'bio' => $user->bio,
                'year_of_study' => $user->year_of_study,
                'updated_at' => $user->updated_at
            ];
            Log::info('User after update:', $userAfter);
            Log::info('User profile_image after update: ' . $user->profile_image);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'debug' => [
                    'update_data' => $updateData,
                    'update_result' => $updateResult,
                    'before' => $userBefore,
                    'after' => $userAfter
                ],
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
            Log::error('Profile update exception: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Profile update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
