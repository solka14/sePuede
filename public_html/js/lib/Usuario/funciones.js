$(function() {
    
    var Ejercicio = {};
    
    (function(app){
        
        app.init = function() {            
            app.cargarDataTable();
            app.bindings();
        };
        
        //Event handlers
        app.bindings = function() {      
            //Cuando se hace click en el boton agregar persona, se muestra el modal con los campos en blanco
            $("#agregarPersona").on("click", function(event) {
                $("#tituloModal").html("Agregar persona");
                $("#id").val(0);
                $("#nombre").val("");
                $("#apellido").val("");
                $("#dni").val("");
                $("#modalPersona").modal({show: true});
            });
            
            //Cuando se hace click en el boton guardar, se llama al metodo agregar persona
            $("#guardar").on("click", function(event){
                app.guardarPersona();
            })
            
            //Cuando se hace click en editar un registro, se llenan los campos del modal con los datos de ese registro y se muestra el modal
            $("#tablaPersonaCuerpo").on('click', '.editar', function(event) {
                $("#id").val($(this).attr("data-id_persona"));
                $("#nombre").val($(this).parent().parent().children().first().html());
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#dni").val($(this).parent().parent().children().first().next().next().html());
                $("#tituloModal").html("Editar persona");
                $("#modalPersona").modal({show: true});
            });
            
            //Cuando se hace click en eliminar un registro, se llama al metodo eliminarPersona y se le pasa el id del registro que se quiere borrar
            $("#tablaPersonaCuerpo").on('click', '.eliminar', function(event) {
                var borrar = confirm("¿Esta seguro que quiere borrar a esa persona?");
                if(borrar){
                    app.eliminarPersona($(this).attr("data-id_persona"));
                }                
            });
            
            //Se activan las validaciones para el formulario persona
            $("#formPersona").bootstrapValidator({
                excluded: [],
            });
        };
           
        app.cargarDataTable = function() {
            //Configura a la tablaPersona para trabajar con el complemento DataTable
            $("#tablaPersona").DataTable( {
                //Configura el idioma a español
                "language": {                                                   
                    "url":  "js/lib/DataTables/Spanish.json"
                },
                "autoWidth": false,   
                //Configura los parametros para la llamada de ajax
                "ajax": {                                                       
                    "url": "backend/acciones.php?accion=buscar",
                    "dataSrc": ""
                },
                //Configura las columnas que va tener la tabla
                "columns": [                                                    
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "dni" },
                    { "data": "Acciones",
                        "orderable": false,                                         
                        "searchable": false,
                        "render": function (data, type, row, meta) {
                            var a = '<a class="pull-left editar" data-id_persona="' + row.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                                    '<a class="pull-right eliminar" data-id_persona="' + row.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            return a;
                        }
                    }
                ]
            });
        };
        
        app.actualizarTabla = function() {
            //Actualiza la tabla de la vista usando DataTable
            var tabla = $("#tablaPersona").DataTable();                          
            tabla.ajax.reload();            
        };       
       
        app.guardarPersona = function() {            
            //Prepara todos los datos del formulario persona para ser enviados
            var data = $("#formPersona").serialize();
            //Configura los parametros para la consulta de ajax
            $.ajax({
                url: 'backend/acciones.php?accion=guardar',
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function() {
                    //Si tiene exito, se esconde el modal y se actualiza el contenido la tabla
                    $("#modalPersona").modal('hide');
                    app.actualizarTabla();
                },
                error: function() {
                    //Si falla, alerta que hubo un error
                    alert("Hubo un error guardando la persona");
                }
            });
        };
        
        app.eliminarPersona = function(id) {           
            //Configura los parametros para la consulta de ajax
            $.ajax({
               url: "backend/acciones.php?accion=eliminar&id=" + id,
               method: 'GET',
               dataType: 'json',
               success: function() {
                   //Si tiene exito, se actualiza el contenido de la tabla
                   var tabla = $("#tablaPersona").DataTable();
                   tabla.ajax.reload();
               },
               error: function() {
                   //Si falla, alerta que hubo un error
                   alert("Hubo un error eliminando el registro");
               }
            });
        };
        
        app.init();
        
    })(Ejercicio);
});

