<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function signup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:2|max:255',
                'email' => 'required|string|email|max:255|unique:users|ends_with:gmail.com',
                'department' => 'required|string|in:Computer Science,Software Engineering,Information Systems',
                'yearOfStudy' => 'required|string|in:1st Year,2nd Year,3rd Year,4th Year',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/'
                ],
            ], [
                'email.ends_with' => 'Please use a valid Gmail address (@gmail.com)',
                'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'department' => $request->department,
                'year_of_study' => $request->yearOfStudy,
                'password' => Hash::make($request->password),
                'email_verified_at' => now(),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Account created successfully!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'department' => $user->department,
                    'year_of_study' => $user->year_of_study,
                    'initials' => $user->initials,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password'
                ], 401);
            }

            $user = Auth::user();

            // Check if user is active
            if (!$user->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been deactivated. Please contact support.'
                ], 403);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'department' => $user->department,
                    'year_of_study' => $user->year_of_study,
                    'initials' => $user->initials,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user (revoke current token)
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logout successful'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get authenticated user info
     */
    public function me(Request $request)
    {
        try {
            $user = $request->user();

            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'department' => $user->department,
                    'year_of_study' => $user->year_of_study,
                    'initials' => $user->initials,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get user info',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get application statistics for homepage
     */
    public function getStats()
    {
        try {
            $totalUsers = User::active()->count();
            $departmentStats = User::active()
                ->selectRaw('department, COUNT(*) as count')
                ->groupBy('department')
                ->get();
            
            $yearStats = User::active()
                ->selectRaw('year_of_study, COUNT(*) as count')
                ->groupBy('year_of_study')
                ->get();

            return response()->json([
                'success' => true,
                'stats' => [
                    'total_users' => $totalUsers,
                    'departments' => $departmentStats,
                    'years' => $yearStats,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}