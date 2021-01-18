<?php

    require_once 'bd.php';



function checkPassword($correo,$clave){
    $bd = DBConnection();
    $query = $bd->prepare("select hashClave from alumnos where correo = :correo");
    $query->bindParam(':correo',$correo);
    $query->execute();

    if($query->rowCount()==1){
        if(password_verify($clave,$query->fetch())){
            return true;
        }
    }
    $bd=null;
    $query=null;

    return false;
}
function login(){



    if(isset($_SESSION['usuario'])){
        echo "userExists";
    }else{
        if(isset($_POST['correo']) && isset($_POST['clave']) && checkPassword($_POST['correo'],$_POST['clave'])){

            $bd = DBConnection();

            $query = $bd->prepare("select id,nombre,apellidos,instrumento,correo from alumnos where correo= :usuario");
            
            $query->bindParam('usuario',$_POST['correo']);
            $query->execute();

            $_SESSION['usuario'] = $query->fetch();

            $bd=null;
            $query=null;
            echo "true";
        }
    }

}

function register(){
    $bd = DBConnection();
    if(!isset($_SESSION['usuario'])){
        if(isset($_POST['usuario']) && isset($_POST['clave']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['instrumento']) && isset($_POST['correo'])){
            //Inserta en la tabla peticiones
        }
    }
     
}

    

?>