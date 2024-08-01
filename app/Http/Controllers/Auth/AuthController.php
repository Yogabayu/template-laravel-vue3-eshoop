<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\UserActivityHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            if (Auth::attempt(['email' => $request->email, 'password' => request('password')])) {
                $user = User::where('email', request('email'))->first();
                if (!$user->isActive) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed | Akun tidak aktif, silahkan hubungi administrator',
                    ], 401);
                }

                $user = User::with('productGenerals')->find(Auth::user()->id);
                $user_token['token'] = $user->createToken('appToken')->accessToken;

                return response()->json([
                    'success' => true,
                    'token' => $user_token,
                    'user' => $user,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed | Email atau Password salah.',
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to authenticate. | ' . $e->getMessage(),
            ]);
        }
    }

    public function destroy(Request $request)
    {
        if (Auth::user()) {
            $request->user()->token()->revoke();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);
        }
    }
}
