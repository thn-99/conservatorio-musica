<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    switch ($_POST['funcion']) {
        case 'register':
            require_once __DIR__ . '/../src/alumnos.php';
            register();
            break;
        case 'login':
            require_once __DIR__ . '/../src/alumnos.php';
            login();
            break;

        case 'todasCabinas':
            require_once __DIR__ . '/../src/reservas.php';
            consultaCabinas();
            break;
        case 'compruebaSesion':
            $mensaje = new class
            {
            };

            $mensaje->estado = false;

            if (isset($_SESSION['nombre'])) {
                $mensaje->estado = true;
                $mensaje->mensaje = $_SESSION['nombre'];
            }

            echo json_encode($mensaje);
            break;
        case 'compruebaSesionAdmin':
            $mensaje=new stdClass();
            $mensaje->estado=false;
            if(isset($_SESSION['admin'])){
                $mensaje->estado=true;
                $mensaje->mensaje = $_SESSION['admin'];
            }
            echo json_encode($mensaje);
        break;

        case 'loginAdmin':
            require_once __DIR__."/../src/adminFun.php";
            login();

        break;
        case 'todasReservasAdmin':
            require_once __DIR__."/../src/adminFun.php";
            todasReservasAdmin();
        break;
        case 'todasReservas':
            require_once __DIR__ . '/../src/reservas.php';
            reservasAlumno();
            break;
        case 'reservar':
            require_once __DIR__ . '/../src/reservas.php';
            reservar();
            break;
        case 'cancelarReserva':
            require_once __DIR__ . '/../src/reservas.php';
            cancelarReserva();
        break;

        case 'changePass':
            require_once __DIR__ . '/../src/alumnos.php';
            changePass();
        break;

        case 'reservarCamara':
            require_once __DIR__ . '/../src/reservas.php';
            reservarCamara();
        break;

        case 'logout':
            session_unset();
            break;
        
        default:
            $mensaje = new stdClass();
            $mensaje->estado=false;
            $mensaje->mensaje="No POST";
            break;
    }
}
