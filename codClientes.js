// Función de leer clientes a través del GET, acomodarlos en una lista
function leerClientes(){
    //Información del GET
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'GET',
            dataType : 'JSON',
            contentType: 'application/json',
    
            success : function(listaclientes) {
                //traer los items de cliente y nombrarlos cs
                let cs=listaclientes.items;
                //Vacíar la lista antes de entrar al ciclo for de listar los clentes
                $("#listaClientes").empty();

                /* Ciclo for para buscar en el arreglo JSON
                se usa el apend para unir*/
                for(i=0;i<cs.length;i++){
                       $("#listaClientes").append(cs[i].id+" <b>"+cs[i].name+"</b> "+cs[i].email+" "+cs[i].age);
                       $("#listaClientes").append("<button onclick='borrarCliente("+cs[i].id+")'>Borrar</button><br>");
                }     
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema');
            }
        });
    }
    
// Función guardar/registar cliente  
    function guardarCliente() {
        //Guarda los valores ingresados en los inputs del index
        let idCliente=$("#idCliente").val();
        let nombre=$("#nombreCliente").val();
        let mailCliente=$("#mailCliente").val();
        let edad=$("#edadCliente").val();

        // los guarda en un arreglo y los homologa con los nombres de las tablas
        let data={
            id:idCliente,
            name:nombre,
            email:mailCliente,
            age:edad
        };
        
        //Envía los datos en formato JSON
        var dataToSend=JSON.stringify(data);
        console.log(data);
    
        //Crear cliente a través del handler POST
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'POST',
            //dataType : 'JSON',
            data:dataToSend,
            contentType:'application/JSON',
            success : function(limpiar) {
                //Una vez el cliente sea creado éxitosamente vacíar los inputs del html
                $("#idCliente").val("");
                $("#nombreCliente").val("");
                $("#mailCliente").val("");
                $("#edadCliente").val("");
                console.log("Satisfactorio")
            },
            error : function(xhr, status) {
               //alert('ha sucedido un problema');
            },
            //Cuando se finaliza lo envía nuevamente a leerClientes, ejecutando nuevamente el GET
            complete: function(){
               leerClientes();
            }
        });
    
    }
    
    //Editar es la misma lógica de crear cliente pero utilizando PUT
    function editarCliente(){
        let idCliente=$("#idCliente").val();
        let nombre=$("#nombreCliente").val();
        let mailCliente=$("#mailCliente").val();
        let edad=$("#edadCliente").val();
    
        let data={
            id:idCliente,
            name:nombre,
            email:mailCliente,
            age:edad
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idCliente").val("");
                $("#nombreCliente").val("");
                $("#mailCliente").val("");
                $("#edadCliente").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerClientes();
            }
        });
    
    }
    

    function borrarCliente(idCliente){

        //sólo se requiere el ID
        let data={
            id:idCliente
            };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idCliente").val("");
                $("#nombreCliente").val("");
                $("#mailCliente").val("");
                $("#edadCliente").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerClientes();
            }
        });
    
    }
  