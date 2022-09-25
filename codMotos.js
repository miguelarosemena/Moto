// Función de leer clientes a través del GET, acomodarlos en una lista
function leerMotos(){
    //Información del GET
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/moto/moto',
            type : 'GET',
            dataType : 'JSON',
            contentType: 'application/json',
    
            success : function(listamotos) {
                //traer los items de cliente y nombrarlos cs
                let mt=listamotos.items;
                //Vacíar la lista antes de entrar al ciclo for de listar los clentes
                $("#listaMotos").empty();

                /* Ciclo for para buscar en el arreglo JSON
                se usa el apend para unir*/
                for(i=0;i<mt.length;i++){
                       $("#listaMotos").append(mt[i].id+" <b>"+mt[i].brand+"</b> "+mt[i].model+"</b> "+mt[i].category_id+" "+mt[i].name);
                       $("#listaMotos").append("<button onclick='borrarMoto("+mt[i].id+")'>Borrar</button><br>");
                }     
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema');
            }
        });
    }
    
// Función guardar/registar cliente  
    function guardarMoto() {
        //Guarda los valores ingresados en los inputs del index
        let idMoto=$("#idMoto").val();
        let nombre=$("#nombreMoto").val();
        let modelo=$("#modeloMoto").val();
        let marca=$("#marcaMoto").val();
        let idCategoria=$("#categoriaId").val();

        // los guarda en un arreglo y los homologa con los nombres de las tablas
        let data={
            id:idMoto,
            name:nombre,
            brand:marca,
            model:modelo,
            category_id:idCategoria
        };
        
        //Envía los datos en formato JSON
        var dataToSend=JSON.stringify(data);
        console.log(data);
    
        //Crear cliente a través del handler POST
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/moto/moto',
            type : 'POST',
            //dataType : 'JSON',
            data:dataToSend,
            contentType:'application/JSON',
            success : function(limpiar) {
                //Una vez el cliente sea creado éxitosamente vacíar los inputs del html
                $("#idMoto").val("");
                $("#nombreMoto").val("");
                $("#modeloMoto").val("");
                $("#marcaMoto").val("");
                $("#categoriaId").val("");
                console.log("Satisfactorio")
            },
            error : function(xhr, status) {
               //alert('ha sucedido un problema');
            },
            //Cuando se finaliza lo envía nuevamente a leerClientes, ejecutando nuevamente el GET
            complete: function(){
               leerMotos();
            }
        });
    
    }
    
    //Editar es la misma lógica de crear cliente pero utilizando PUT
    function editarMoto(){
        let idMoto=$("#idMoto").val();
        let nombre=$("#nombreMoto").val();
        let modelo=$("#modeloMoto").val();
        let marca=$("#marcaMoto").val();
        let idCategoria=$("#categoriaId").val();
    
        let data={
            id:idMoto,
            name:nombre,
            brand:marca,
            model:modelo,
            category_id:idCategoria
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/moto/moto',
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idMoto").val("");
                $("#nombreMoto").val("");
                $("#modeloMoto").val("");
                $("#marcaMoto").val("");
                $("#categoriaId").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerMotos();
            }
        });
    
    }
    

    function borrarMoto(idMoto){

        //sólo se requiere el ID
        let data={
            id:idMoto
            };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : 'https://gdcbf67e56bd91d-motorent.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/moto/moto',
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(limpiar) {
                $("#idMoto").val("");
                $("#nombreMoto").val("");
                $("#modeloMoto").val("");
                $("#marcaMoto").val("");
                $("#categoriaId").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerMotos();
            }
        });
    
    }