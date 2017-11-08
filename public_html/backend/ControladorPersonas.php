<?php
require './ControladorGeneral.php';
require './SentenciasBD.php';

class ControladorPersonas extends ControladorGeneral implements SentenciasBD {
    
    public function buscarTodos(){        
        //
        $sentencia = $this->ejecutarSentencia(SentenciasBD::BUSCAR_PERSONAS);
        $personas = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        return $personas;        
    }
    
    public function guardar(){
        //Se guardan en variables los datos recibidos 
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $dni = $_POST['dni'];
        $id = $_POST['id'];   
        $correo = $_POST['correo'];  
        $parametros = array($nombre, $apellido, $dni, $correo);        
        $resultado = null;
        
       
        if($id == 0) {
            //Si el id es 0, se agrega una persona nueva
            return $this->ejecutarSentencia(SentenciasBD::INSERTAR_PERSONA, $parametros);            
        } else {
            //Sino, se modifican una persona ya existente
            $parametros[3] = $id;
            return $this->ejecutarSentencia(SentenciasBD::ACTUALIZAR_PERSONA, $parametros);
        }
    }
    
    public function eliminar(){
        //Se guarda el id recibido en una variable
        $id = $_GET['id'];
        $parametros = array($id);
        //Se elimina la persona
        return $this->ejecutarSentencia(SentenciasBD::BORRAR_PERSONA, $parametros);
    }    
}