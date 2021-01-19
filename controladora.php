<?php
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        switch ($_POST['funcion']) {
            case 'register':
                echo "touaqui";
                require_once 'alumnos.php';
                register();
            break;
        }
    }

?>