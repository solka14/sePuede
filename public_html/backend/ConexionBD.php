<?php

class ConexionBD {
    
    private $conexion = 'localhost';
    private $usuario = 'root';
    private $clave = '';
        
    public function __construct() {   
        //Se crea una conexion con la base de datos
        $this->conexion = new PDO("mysql:dbname=tutorial;host=localhost", $this->usuario, $this->clave);
    }
    
    public function getConexion(){
        return $this->conexion;
    }
    
}
