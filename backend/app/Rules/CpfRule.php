<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CpfRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cpf = preg_replace('/[^0-9]/', '', $value);
        
        if (strlen($cpf) != 11) {
            $fail('O :attribute precisa ter 11 dígitos.');
            return;
        }
        
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            $fail('O :attribute informado é inválido.');
            return;
        }
        
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += (int)$cpf[$i] * (10 - $i);
        }
        $resto = $soma % 11;
        $dv1 = ($resto < 2) ? 0 : 11 - $resto;
        
        if ($dv1 != (int)$cpf[9]) {
            $fail('O :attribute informado é inválido.');
            return;
        }
        
        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += (int)$cpf[$i] * (11 - $i);
        }
        $resto = $soma % 11;
        $dv2 = ($resto < 2) ? 0 : 11 - $resto;
        
        if ($dv2 != (int)$cpf[10]) {
            $fail('O :attribute informado é inválido.');
            return;
        }
    }
}