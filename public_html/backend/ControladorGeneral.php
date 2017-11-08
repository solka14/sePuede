<?php
require './ConexionBD.php';

class ControladorGeneral {
    
    private $conexion = null;
    
    public function __construct() {
        //Se establece la conexion con la base de datos
        $bd = new ConexionBD();
        $this->conexion = $bd->getConexion();                                   
    }
    
    public function ejecutarSentencia($query, $parametros = null) {
        //Se preprara la sentencia 
        $sentencia = $this->conexion->prepare($query);
        //Si hay parametros, se los vincula con la sentencia
        if($parametros){
            foreach ($parametros as $key => $parametro) {
                $index = $key + 1;
                $sentencia->bindValue($index, $parametro);
            }
        }
        //Se ejecuta la sentencia
        $sentencia->execute();        
        return $sentencia;
    }    
}