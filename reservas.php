<?php
    require_once 'bd.php';
    consultaCabinas();
    function reservar(){
        //TO-DO
        //Reservar las cabinas y comprobar que no este ya registrada
        //y que es en funcion del tiempo que le corresponde
    
    }

    function consultaCabinas(){
        $mensaje=new class{};
        $mensaje->estado=false;
        $_POST['fecha']='2021-01-21';
        if(isset($_POST['fecha'])){
            $fecha = date( "Y-m-d", strtotime($_POST['fecha']));
            $bd = DBConnection();
            $query = $bd->prepare("SELECT idCabina,fecha,hora,tipo from cabinas, reservas where fecha = :fecha and cabinas.id=idCabina");
            $query->bindParam(':fecha',$fecha);
            $query->execute();

            if($query->rowCount()>0){
                $mensaje->estado=true;
                $mensaje->mensaje = $query->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $mensaje->echo=true;
                $mensaje->mensaje = [];
            }

        }else{
            $mensaje->mensaje="No se ha recibido la fecha";
        }

        echo json_encode($mensaje);
    }


?>