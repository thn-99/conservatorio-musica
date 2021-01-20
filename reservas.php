<?php
require_once 'bd.php';
function reservar()
{
    //TO-DO
    //Reservar las cabinas y comprobar que no este ya registrada
    //y que es en funcion del tiempo que le corresponde

}

function consultaCabinas()
{
    $mensaje = new class
    {
    };
    $mensaje->estado = false;
    if (isset($_POST['fecha'])) {
        $fecha = date("Y-m-d", strtotime($_POST['fecha']));
        $bd = DBConnection();
        $query = $bd->prepare("Select cabinas.id,cabinas.planta,cabinas.tipo,plantas.horas FROM cabinas INNER JOIN plantas ON cabinas.planta = plantas.id WHERE (cabinas.id,plantas.horas) not in (SELECT reservas.idCabina,reservas.hora from reservas where reservas.fecha=:fecha)");
        $query->bindParam(':fecha', $fecha);
        $query->execute();

        if ($query->rowCount() > 0) {
            $mensaje->estado = true;
            $mensaje->mensaje = $query->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $mensaje->echo = true;
            $mensaje->mensaje = [];
        }
    } else {
        $mensaje->mensaje = "No se ha recibido la fecha";
    }

    echo json_encode($mensaje);
}

// function consultaReservas()
// {
//     $mensaje = new class
//     {
//     };
//     $mensaje->estado = false;
//     $_POST['fecha'] = '2021-01-21';
//     if (isset($_POST['fecha'])) {
//         $fecha = date("Y-m-d", strtotime($_POST['fecha']));
//         $bd = DBConnection();
//         $query = $bd->prepare("SELECT idCabina,fecha,hora,tipo from cabinas, reservas where fecha = :fecha and cabinas.id=idCabina");
//         $query->bindParam(':fecha', $fecha);
//         $query->execute();

//         if ($query->rowCount() > 0) {
//             $mensaje->estado = true;
//             $mensaje->mensaje = $query->fetchAll(PDO::FETCH_ASSOC);
//         } else {
//             $mensaje->echo = true;
//             $mensaje->mensaje = [];
//         }
//     } else {
//         $mensaje->mensaje = "No se ha recibido la fecha";
//     }

//     echo json_encode($mensaje);
// }

// function todasCabinas()
// {
//     echo "debug1";
//     $bd = DBConnection();
//     $query = $bd->prepare('select * from cabinas');
//     $query->execute();
//     $cabinas = $query->fetchAll(PDO::FETCH_ASSOC);
//     echo(json_encode($cabinas));
// }

// function horas(){
//     echo '{"piso1":{"inicio":"8:30","fin":"21:00"},"piso2":{"inicio":"8:15","fin":"21:00"},"piso3":{"inicio":"8:00","fin":"21:00"}';
// }
