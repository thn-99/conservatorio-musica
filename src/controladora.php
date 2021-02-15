<?php
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        switch ($_POST['funcion']) {
            case 'register':
                require_once 'alumnos.php';
                register();
            break;
            case 'login':
                require_once 'alumnos.php';
                login();
            break;
            
            case 'todasCabinas':
                require_once 'reservas.php';
                consultaCabinas();
            break;
            case 'compruebaSesion':
                $mensaje=new class{};

                $mensaje->estado=false;
            
                if(isset($_SESSION['usuario'])){
                    $mensaje->estado=true;
                    $mensaje->mensaje = $_SESSION['usuario']['correo'];
                }else if(isset($_SESSION['admin'])){
                    $mensaje->estado=true;
                    $_SESSION->mensaje = $_SESSION['admin']['nombre'];
                }
                
                echo json_encode($mensaje);
            break;
        }
    }

?>