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
    $archivoConfig=dirname(__FILE__)."/configuracion.xml";
    $archivoSchema=dirname(__FILE__)."/configuracion.xsd";
    $configBD->load($archivoConfig);
    $cehckSchema=$configBD->schemaValidate($archivoSchema);
    if(!$cehckSchema){
        throw new InvalidArgumentException("Revise el fichero de configuración");
    }
    $datosConfig=simplexml_load_file($archivoConfig);
    $ip=$datosConfig->xpath("//ip");
    $nombre=$datosConfig->xpath("//nombre");
    $usuario=$datosConfig->xpath("//usuario");
    $clave=$datosConfig->xpath("//clave");
    $cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);
    $resul = [];
    $resul[]=$cad;
    $resul[]=$usuario[0];
    $resul[]=$clave[0];
    return $resul;

}

function DBConnection(){
    $res = leerConfig(dirname(__FILE__) . "/configuracion.xml",
        dirname(__FILE__) . "/configuracion.xsd");
    return new PDO($res[0], $res[1], $res[2]);

}

?>