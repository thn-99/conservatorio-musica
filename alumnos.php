<?php

require_once 'bd.php';



function checkPassword($correo, $clave)
{
    $bd = DBConnection();
    $query = $bd->prepare("select hashClave from alumnos where correo = :correo");
    $query->bindParam(':correo', $correo);
    $query->execute();

    if ($query->rowCount() == 1) {
        if (password_verify($clave, $query->fetch())) {
            return true;
        }
    }
    $bd = null;
    $query = null;

    return false;
}
function login()
{



    if (isset($_SESSION['usuario'])) {
        echo "userExists";
    } else {
        if (isset($_POST['correo']) && isset($_POST['clave']) && checkPassword($_POST['correo'], $_POST['clave'])) {

            $bd = DBConnection();

            $query = $bd->prepare("select id,nombre,apellidos,instrumento,correo from alumnos where correo= :usuario");

            $query->bindParam(':usuario', $_POST['correo']);
            $query->execute();

            $_SESSION['usuario'] = $query->fetch();

            $bd = null;
            $query = null;
            echo "true";
        }
    }
}

function register()
{
    if (!isset($_SESSION['usuario'])) {
        if (isset($_POST['clave']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['instrumento']) && isset($_POST['correo'])) {
            //Inserta en la tabla peticiones
            $encontrado = false;

            $bd = DBConnection();
            $query = $bd->prepare("select count(*) from alumnos where correo = :correo");
            $query->bindParam(':correo', $_POST['correo']);
            $query->execute();
            if ($query->rowCount() == 1) {
                $encontrado = true;
            }
            if ($encontrado == false) {

                $alumnos = fopen("alumnos.txt", "r") or die("Unable to open file!");

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
                    $bd->beginTransaction();
                    $query = $bd->prepare("INSERT INTO alumnos(nombre,apellidos,instrumento,correo,hashClave) VALUES(:nombre,:apellidos,:instrumento,:correo,:hashClave)");
                    $query->bindParam(":nombre", $_POST['nombre']);
                    $query->bindParam(":apellidos", $_POST['apellidos']);
                    $query->bindParam(":instrumento", $_POST['instrumento']);
                    $query->bindParam(":correo", $_POST['correo']);
                    $hashClave = password_hash($_POST['clave'], PASSWORD_DEFAULT, ["cost" => 14]);
                    $query->bindParam(":hashClave", $hashClave);
                    $query->execute();
                    $commit=$bd->commit();
                    if($commit){
                        echo "true";
                    }else{
                        echo "false";
                    }
                }else{
                    echo "false";
                }
            }else{
                echo "false";
            }
        }else{
            echo "false";
        }
    }else{
        echo "false";
    }
}
