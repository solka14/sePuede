<?php

Interface SentenciasBD {
    
    const BUSCAR_PERSONAS = "SELECT * FROM persona";
    const INSERTAR_PERSONA = "INSERT INTO persona (nombre, apellido, dni) VALUES (?,?,?)";
    const ACTUALIZAR_PERSONA = "UPDATE persona SET nombre = ?, apellido = ?, dni = ? WHERE id = ?";
    const BORRAR_PERSONA = "DELETE FROM persona WHERE id = ?";
    const BUSCAR_PERSONA = "SELECT * FROM persona WHERE id = ?";
}