<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/Entity/Alumnos.php';


/**
 * checkPassword
 *
 * @param string $clave Conrtraseña recibida
 * @param  string $claveHash Contraseña en hash del usuario
 * @return boolean
 */
function checkPassword($clave, $claveHash)
{
    if (password_verify($clave, $claveHash)) {
        return true;
    }

    return false;
}

/**
 * Cambia contraseña de un alumno
 *
 * @return void
 */
function changePass()
{
    $mensaje = new stdClass();
    $mensaje->estado = false;

    if (isset($_SESSION['id'])) {
        if (isset($_POST['oldPass']) && isset($_POST['newPass'])) {
            $entity = getEntityManager();
            $alumno = $entity->find("Alumnos", $_SESSION['id']);
            if (password_verify($_POST['oldPass'], $alumno->getHashclave())) {
                if ($_POST['oldPass'] != $_POST['newPass']) {
                    $hashClave = password_hash($_POST['newPass'], PASSWORD_DEFAULT, ["cost" => 14]);

                    $alumno->setHashclave($hashClave);

                    $entity->persist($alumno);
                    $entity->flush();
                    session_unset();
                    $mensaje->estado = true;
                } else {
                    $mensaje->mensaje = "Las nueva contraseña coincide con la nueva";
                }
            } else {
                $mensaje->mensaje = "Contraseña incorrecta";
            }
        } else {
            $mensaje->mensaje = "Ponga ambas contraseñas";
        }
    } else {
        $mensaje->mensaje = "Sesion no iniciada";
    }
}


/**
 * Comprueba el login de un alumno
 *
 */
function login()
{
    $mensaje = new class
    {
    };
    $mensaje->estado = false;
    if (isset($_SESSION['usuario'])) {
        $mensaje->mensaje = "Ya hay un usuario logeado";
    } else {
        if (isset($_POST['correo']) && isset($_POST['clave'])) {
            $entity = getEntityManager();
            $alumnoBD = $entity->getRepository("Alumnos")->findOneBy(array('correo' => $_POST['correo']));
            if ($alumnoBD) {


                if (checkPassword($_POST['clave'], $alumnoBD->getHashclave())) {
                    $_SESSION['nombre'] = $alumnoBD->getNombre();
                    $_SESSION['id'] = $alumnoBD->getId();

                    $mensaje->estado = true;
                } else {
                    $mensaje->mensaje = "Contraseña incorrecta";
                }
            } else {
                $mensaje->mensaje = "Alumno no existe";
            }
        } else {
            $mensaje->mensaje = "Datos incorrectos";
        }
    }
    echo json_encode($mensaje);
}

/**
 * Registra un usuario
 *
 */
function register()
{
    $mensaje = new class
    {
    };

    $mensaje->estado = false;

    if (!isset($_SESSION['usuario'])) {

        if (isset($_POST['clave']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['instrumento']) && isset($_POST['correo'])) {
            //Inserta en la tabla peticiones
            $entity = getEntityManager();
            $encontrado = $entity->getRepository("Alumnos")->findOneBy(array('correo' => $_POST['correo']));

            if ($encontrado == null) {
                $alumnos = fopen("../alumnos.txt", "r") or die("Unable to open file!");
                while (!feof($alumnos)) {
                    $alumno = explode(";", fgets($alumnos));
                    if (
                        strtolower($alumno[0]) == strtolower($_POST['nombre']) &&
                        strtolower($alumno[1]) == strtolower($_POST['apellidos']) &&
                        strtolower($alumno[2]) == strtolower($_POST['correo'])
                    ) {
                        $encontrado = true;
                        break;
                    }
                }

                fclose($alumnos);

                if ($encontrado = true) {
                    $hashClave = password_hash($_POST['clave'], PASSWORD_DEFAULT, ["cost" => 14]);
                    $alumnoBD = new Alumnos($_POST['nombre'], $_POST['apellidos'], $_POST['instrumento'], $_POST['correo'], $hashClave);
                    $entity->persist($alumnoBD);
                    try {
                        $entity->flush();
                        $mensaje->estado = true;
                    } catch (Exception $e) {
                        $mensaje->mensaje = $e->getMessage();
                    }
                } else {
                    $mensaje->mensaje = "Alumno no se encuentra en listado del colegio";
                }
            } else {
                $mensaje->mensaje = "Alumno ya registrado";
            }
        } else {
            $mensaje->mensaje = "No se han enviado las variables del formulario correctamente";
        }
    } else {
        $mensaje->mensaje = "Cierre sesion para registrarse";
    }

    echo json_encode($mensaje);
}
