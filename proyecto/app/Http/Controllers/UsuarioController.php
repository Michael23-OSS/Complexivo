<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuario);
    }

    public function store(Request $request)
    {
        $request->validate([
            'usuario' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        /*Para restringir email 
        'email' => 'required|email|unique:usuarios,email',*/



        $usuario = Usuario::create($request->all());
        return response()->json($usuario, 201);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $request->validate([
            'usuario' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        $usuario->update($request->all());
        return response()->json($usuario);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $usuario->delete();
        return response()->json(['mensaje' => 'Usuario eliminado correctamente']);
    }
}
