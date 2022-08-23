<?php

namespace Model;

class Bills extends ActiveRecord
{

    protected static $tabla = 'bills';
    protected static $columnasDB = ['id', 'fecha', 'gasto', 'monto', 'metodo', 'cuotas', 'categoria', 'usuarioId'];


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->fecha = $args['fecha'] ?? '';
        $this->gasto = $args['gasto'] ?? '';
        $this->monto = $args['monto'] ?? '';
        $this->metodo = $args['metodo'] ?? '';
        $this->cuotas = $args['cantidad-cuotas'] ?? 0;
        $this->categoria = $args['categoria'] ?? '';
        $this->usuarioId = $args['usuarioId'] ?? '';
    }

    public function validarGastos()
    {
        if (!$this->gasto) {
            self::$alertas['error'][] = 'El nombre del gasto es obligatorio';
        }
        if (!$this->monto) {
            self::$alertas['error'][] = 'El monto del gasto es obligatorio';
        }
        if (!$this->metodo) {
            self::$alertas['error'][] = 'El metodo de pago del gasto es obligatorio';
        }
        if (!$this->categoria) {
            self::$alertas['error'][] = 'La categoria del gasto es obligatorio';
        }

        return self::$alertas;
    }
}
