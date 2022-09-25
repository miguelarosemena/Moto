// Función de leer clientes a través del GET, acomodarlos en una lista
function leerMensajes(){
    //Información del GET
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'GET',
            dataType : 'JSON',
            contentType: 'application/json',
    
            success : function(listamensajes) {
                //traer los items de cliente y nombrarlos cs
                let ms=listamensajes.items;
                //Vacíar la lista antes de entrar al ciclo for de listar los clentes
                $("#listaMensajes").empty();

                /* Ciclo for para buscar en el arreglo JSON
                se usa el apend para unir*/
                for(i=0;i<ms.length;i++){
                       $("#listaMensajes").append(ms[i].id+" <b>"+ms[i].messagetext);
                       $("#listaMensajes").append("<button onclick='borrarMensaje("+ms[i].id+")'>Borrar</button><br>");
                }     
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema');
            }
        });
    }
    
// Función guardar/registar cliente  
    function guardarMensaje() {
        //Guarda los valores ingresados en los inputs del index
        let idMensaje=$("#idMensaje").val();
        let textoMensaje=$("#textoMensaje").val();

        // los guarda en un arreglo y los homologa con los nombres de las tablas
        let data={
            id:idMensaje,
            messagetext:textoMensaje
        };
        
        //Envía los datos en formato JSON
        var dataToSend=JSON.stringify(data);
        console.log(data);
    
        //Crear cliente a través del handler POST
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'POST',
            //dataType : 'JSON',
            data:dataToSend,
            contentType:'application/JSON',
            success : function(limpiar) {
                //Una vez el cliente sea creado éxitosamente vacíar los inputs del html
                $("#idMensaje").val("");
                $("#textoMensaje").val("");
                console.log("Satisfactorio")
            },
            error : function(xhr, status) {
               //alert('ha sucedido un problema');
            },
            //Cuando se finaliza lo envía nuevamente a leerClientes, ejecutando nuevamente el GET
            complete: function(){
               leerMensajes();
            }
        });
    
    }
    
    //Editar es la misma lógica de crear cliente pero utilizando PUT
    function editarMensaje(){
        let idMensaje=$("#idMensaje").val();
        let textoMensaje=$("#textoMensaje").val();
    
        let data={
            id:idMensaje,
            messagetext:textoMensaje
            };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idMensaje").val("");
                $("#textoMensaje").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerMensajes();
            }
        });
    
    }
    

    function borrarMensaje(idMensaje){

        //sólo se requiere el ID
        let data={
            id:idMensaje
            };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idMensaje").val("");
                $("#textoMensaje").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerMensajes();
            }
        });
    
    }
  