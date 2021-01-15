<?php
$archivoConfig="configuracion.xml";
$archivoSchema="configuracion.xsd";


/**
 * Funcion que obtiene los datos para la conexión a la base de datos
 * @return si el fichero existe y tiene la estructura esperada, se devuelve un array con 3 elementos:
 * La conexión a la base de datos,
 * El usuario,
 * La contraseña,
 * Si no encuentra el fichero o no es válido lanza una excepción:
 * @exception InvalidArgumentException
 */
function leerConfig(){
    $configBD = new DOMDocument();
    global $archivoConfig,$archivoSchema;
    $configBD->load($archivoConfig);
    $cehckSchema=$configBD->schemaValidate($archivoSchema);
    if(!$cehckSchema){
        throw new InvalidArgumentException("Revise el fichero de configuración");
    }
    $datosConfig=simplexml_load_file($archivoConfig);
    $ip=$datosConfig->xpath("//ip");
    $nombre=$datosConfig->xpath("//ip");
    $usuario=$datosConfig->xpath("//ip");
    $clave=$datosConfig->xpath("//ip");
    $cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);
    $resul = array();
    $resul[]=$cad;
    $resul[]=$usuario;
    $resul[]=$clave;

    return $resul;

}

?>