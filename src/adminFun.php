<?php

/**
 * Registra un usuario
 *
 * @return string
 */
function register()
{
    require_once __DIR__. '/Entity/Admins.php';
    require_once __DIR__. '/../bootstrap.php';
    $nombre = "tahseen";
    $clave = "1234";
    $hashClave = password_hash($nombre, PASSWORD_DEFAULT, ["cost" => 14]);
    $entity = getEntityManager();
    $admin = new Admins();
    $admin->setNombre($nombre);
    $admin->setHashclave($hashClave);
    $entity->persist($admin);
    $entity->flush();
}

/**
 * Comprueba el intento de login de un alumno
 *
 * @return string
 */
function login()
{
    $mensaje = new stdClass();
    $mensaje->estado = false;
    $mensaje->debug = "";
    require_once __DIR__ . '/Entity/Admins.php';
    require_once __DIR__ . '/../bootstrap.php';
    $mensaje->debug .= "1";
    if (isset($_POST['nombre']) && isset($_POST['clave'])) {
        $entity = getEntityManager();
        $admin = $entity->find("Admins", $_POST['nombre']);
        $mensaje->debug .= "2";
        $mensaje->debug .= $admin->getHashclave();
        if ($admin != null) {
            if (password_verify($_POST['clave'], $admin->getHashclave())) {
                $mensaje->estado = true;
                $_SESSION['admin'] = $admin->getNombre();
            }
        }
    }
    echo json_encode($mensaje);
}


/**
 * Devuelve todas las reservas en formato JSON
 *
 * @return string todas las reservas
 */
function todasReservasAdmin()
{
    $mensaje = new stdClass();
    $mensaje->estado = true;
    require_once __DIR__ . '/Entity/Admins.php';
    require_once __DIR__ . '/Entity/Reservas.php';
    require_once __DIR__ . '/Entity/ReservaCamara.php';
    require_once __DIR__ . '/../bootstrap.php';
    $entity = getEntityManager();
    $reservas = $entity->getRepository("Reservas")->findAll();
    $reservasCamara = $entity->getRepository("ReservaCamara")->findAll();


    $reservasBien = array();

    foreach ($reservas as $key => $value) {
        array_push($reservasBien, $value);
    }
    foreach ($reservasCamara as $key => $value) {
        array_push($reservasBien, $value);
    }
    //var_dump($reservasBien);

    $mensaje->mensaje = $reservasBien;

    echo json_encode($mensaje);
}
