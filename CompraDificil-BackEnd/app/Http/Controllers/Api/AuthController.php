<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empleado;
use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login del empleado con validación de rol y estado
     */
    public function login(Request $request)
    {
        // 1. VALIDAR LOS DATOS DE ENTRADA
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password_usuario' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $e->errors()
            ], 422);
        }

        // 2. BUSCAR AL EMPLEADO POR EMAIL CON SU ROL Y SUCURSAL
        $empleado = Empleado::with(['rol', 'sucursal'])
            ->where('email', $validated['email'])
            ->first();

        // 3. VERIFICAR QUE EXISTA
        if (!$empleado) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // 4. VERIFICAR CONTRASEÑA
        if (!$this->verificarContrasena($empleado->contrasena, $validated['password_usuario'])) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // 5. VALIDAR QUE EL EMPLEADO ESTÉ ACTIVO
        if (!$empleado->estaActivo()) {
            return response()->json([
                'message' => 'Usuario inactivo. Contacta con administración.'
            ], 403);
        }

        // 6. VERIFICAR QUE TENGA ROL ASIGNADO
        if (!$empleado->rol) {
            return response()->json([
                'message' => 'El usuario no tiene un rol asignado'
            ], 403);
        }

        // 7. REVOCAR TOKENS ANTIGUOS (seguridad)
        $empleado->tokens()->delete();

        // 8. GENERAR NUEVO TOKEN SANCTUM
        $token = $empleado->createToken('auth_token', ['*'])->plainTextToken;

        // 9. RETORNAR RESPUESTA CON DATOS DEL SERVIDOR
        return response()->json([
            'message' => 'Login exitoso',
            'token' => $token,
            'nombre' => $empleado->nombre,
            'ap' => $empleado->ap,
            'am' => $empleado->am,
            'email' => $empleado->email,
            'rol' => $empleado->rol->tipo_rol,  // ← TIPO_ROL, no nombre
            'rol_id' => $empleado->id_rol,
            'sucursal' => $empleado->sucursal->nombre,
            'sucursal_id' => $empleado->id_sucursal,
        ], 200);
    }

    /**
     * Obtener datos del usuario autenticado
     */
    public function me(Request $request)
    {
        $empleado = $request->user()->load(['rol', 'sucursal']);

        return response()->json([
            'id' => $empleado->id_empleado,
            'nombre' => $empleado->nombre,
            'ap' => $empleado->ap,
            'am' => $empleado->am,
            'email' => $empleado->email,
            'rol' => $empleado->rol->tipo_rol,
            'rol_id' => $empleado->id_rol,
            'sucursal' => $empleado->sucursal->nombre,
            'sucursal_id' => $empleado->id_sucursal,
            'estado' => $empleado->estado,
        ]);
    }

    /**
     * Logout: revocar token actual
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout exitoso'
        ]);
    }

    private function verificarContrasena($contrasenaAlmacenada, $contrasenaIngresada)
    {
        // Si la contraseña está hasheada (comienza con $2y$ = bcrypt)
        if (strpos($contrasenaAlmacenada, '$2y$') === 0) {
            return Hash::check($contrasenaIngresada, $contrasenaAlmacenada);
        }

        // Si es plaintext
        return $contrasenaAlmacenada === $contrasenaIngresada;
    }
}