<?php
require './ControladorPersonas.php';

//Se guarda la accion recibida en una variable
$accion = $_GET['accion'];
//Se crea un controlador personas
$ctrlPersona = new ControladorPersonas();
$resultado = '';

//Dependiendo de cual fue la accion, se ejecuta el metodo correspondiente del controlador personas y se guarda el resultado en una variable
switch ($accion) {
    case 'buscar':
        $resultado = $ctrlPersona->buscarTodos();
        break;
    case 'guardar':
        $resultado = $ctrlPersona->guardar();        
        break;
    case 'eliminar':
        $resultado = $ctrlPersona->eliminar();
        break;
    default:
        $resultado = 'No se encontro la accion requerida';
}
//Se envian los datos en formato json
echo json_encode($resultado);
