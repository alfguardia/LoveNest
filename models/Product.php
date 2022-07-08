<?php

namespace Model;
class Product extends ActiveRecord{

    protected static $tabla = 'supermarket';
    protected static $columnasDB = ['id','fecha','producto','marca','precio',
                                    'cantidad','observacion','foto','usuarioId'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->fecha = $args['fecha'] ?? '';
        $this->producto = $args['producto'] ?? '';
        $this->marca = $args['marca'] ?? '';
        $this->precio = $args['precio'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->observacion = $args['observacion'] ?? '';
        $this->foto = $args['foto'] ?? '';
        $this->usuarioId = $args['usuarioId'] ?? '';
    }


}