<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Login e obtenção do token JWT
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
            
            $credentials = $request->only('email', 'password');
            
            if (!$token = Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Credenciais inválidas'
                ], 401);
            }
            
            return $this->respondWithToken($token);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Obter usuário atual
     */
    public function me(): JsonResponse
    {
        return response()->json([
            'user' => new UserResource(Auth::user())
        ]);
    }

    /**
     * Encerrar a sessão (invalidar o token)
     */
    public function logout(): JsonResponse
    {
        Auth::logout();
        
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    /**
     * Atualizar o token
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::refresh());
    }

    /**
     * Estrutura de resposta com o token
     */
    protected function respondWithToken(string $token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email
            ]
        ]);
    }
}