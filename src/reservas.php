<?php
require_once __DIR__.'/../bd.php';
/**
 * Reserva una cabina
 *
 * @return void
 */
function reservar()
{
    $mensaje = new stdClass();
    $mensaje->estado = false;
    if (isset($_SESSION['id'])) {
        if (isset($_POST['fecha']) && isset($_POST['puerta']) && isset($_POST['hora'])) {
            require_once __DIR__.'/../bootstrap.php';
            require_once __DIR__.'/../src/Entity/Reservas.php';
            require_once __DIR__.'/../src/Entity/Alumnos.php';
            require_once __DIR__.'/../src/Entity/Cabinas.php';
            require_once __DIR__ . '/alumnosutils.php';
            $entity = getEntityManager();
            $alumno = $entity->find("Alumnos", $_SESSION['id']);
            $puerta = $entity->find("Cabinas", $_POST['puerta']);
            $fech = new DateTime($_POST['fecha']);
            $tim =  DateTime::createFromFormat('Y-m-d H:i:s', '1970-01-01 ' . $_POST['hora']);

            if (noReservasYNoSolapa($alumno, $fech, $tim)) {

                $reserva = new Reservas($alumno, $puerta, $fech, $tim);

                require_once __DIR__ . '/dateUtils.php';
                $fechaHoraReserva = $reserva->fechaHora();
                if (dateLowenThenFutureDays(7, $fechaHoraReserva) && $fechaHoraReserva > new DateTime()) {
                    try {
                        $entity->persist($reserva);
                        $entity->flush();
                        $mensaje->estado = true;
                    } catch (Exception $e) {
                        $mensaje->mensaje = $e->getMessage();
                    }
                } else {
                    $mensaje->mensaje = "Solo se puede reservas a 7 dias hacia delante y mayor a la hora acutal";
                }
            } else {
                $mensaje->mensaje = "Has sobrepasado las reservas maximas o se solapan";
            }
        } else {
            $mensaje->mensaje = "No todas variables";
        }
    } else {
        $mensaje->mensaje = "Usuario no logeado";
    }
    echo json_encode($mensaje);
}

/**
 * Reserva una camara de cabina
 *
 * @return void
 */
function reservarCamara()
{
    $mensaje = new stdClass();
    $mensaje->estado = false;
    if (isset($_SESSION['id'])) {
        if (isset($_POST['fecha']) && isset($_POST['puerta']) && isset($_POST['hora']) && isset($_POST['correoAlumno2']) && isset($_POST['correoAlumno3']) && $_POST['correoAlumno3'] != $_POST['correoAlumno2']) {
            require_once __DIR__.'/../bootstrap.php';
            require_once __DIR__.'/../src/Entity/Reservas.php';
            require_once __DIR__.'/../src/Entity/Alumnos.php';
            require_once __DIR__.'/../src/Entity/Cabinas.php';
            require_once __DIR__ . '/alumnosutils.php';
            require_once __DIR__ . '/Entity/ReservaCamara.php';
            $entity = getEntityManager();
            $alumno = $entity->find("Alumnos", $_SESSION['id']);
            $puerta = $entity->find("Cabinas", $_POST['puerta']);
            $fech = new DateTime($_POST['fecha']);
            $tim =  DateTime::createFromFormat('Y-m-d H:i:s', '1970-01-01 ' . $_POST['hora']);
            $alumno2 = getAlumnoByCorreo($entity, $_POST['correoAlumno2']);
            $alumno3 = getAlumnoByCorreo($entity, $_POST['correoAlumno3']);

            if (noReservasYNoSolapa($alumno, $fech, $tim) && $alumno2 && noReservasYNoSolapa($alumno2, $fech, $tim) && $alumno3 && noReservasYNoSolapa($alumno3, $fech, $tim) && $alumno->getNombre()!=$alumno2->getNombre()  && $alumno->getNombre()!=$alumno3->getNombre()) {

                $reserva = new ReservaCamara($alumno, $alumno2, $alumno3, $puerta, $fech, $tim);

                require_once __DIR__ . '/dateUtils.php';
                $fechaHoraReserva = $reserva->fechaHora();
                if (dateLowenThenFutureDays(7, $fechaHoraReserva) && $fechaHoraReserva > new DateTime()) {
                    try {

                        $entity->persist($reserva);
                        $entity->flush();
                        $mensaje->estado = true;
                    } catch (Exception $e) {
                        $mensaje->mensaje = $e->getMessage();
                    }
                } else {
                    $mensaje->mensaje = "Solo se puede reservas a 7 dias hacia delante y mayor a la hora acutal";
                }
            } else {
                $mensaje->mensaje = "Has sobrepasado las reservas maximas o se solapan";
            }
        } else {
            $mensaje->mensaje = "No todas variables";
        }
    } else {
        $mensaje->mensaje = "Usuario no logeado";
    }
    echo json_encode($mensaje);
}


/**
 * Elimina una reserva
 *
 * @return void
 */
function cancelarReserva()
{
    $mensaje = new stdClass();
    $mensaje->estado = false;

    if (isset($_SESSION['id'])) {
        if (isset($_POST['idReserva']) && isset($_POST['tipo'])) {
            require_once __DIR__.'/../bootstrap.php';
            require_once __DIR__.'/../src/Entity/Reservas.php';
            require_once __DIR__.'/../src/Entity/ReservaCamara.php';
            $entity = getEntityManager();

            if ($_POST['tipo'] == "camara") {
                $reservaAlumno = $entity->find("ReservaCamara", $_POST['idReserva']);
            } else {
                $reservaAlumno = $entity->find("Reservas", $_POST['idReserva']);
            }
            $alumno = $reservaAlumno->getAlumno();
            if ($alumno->getId() == $_SESSION['id']) {
                //dia reserva mayor igual que dia hoy
                $diaHoy = new DateTime();

                if ($reservaAlumno->fechaHora() >= $diaHoy) {
                    try {
                        $entity->remove($reservaAlumno);
                        $entity->flush();
                        $mensaje->estado = true;
                    } catch (Exception $e) {
                        $mensaje->mensaje = "Error al cancelar la reserva";
                    }
                } else {
                    $mensaje->mensaje = "Esta reserva ya no se puede cancelar porque la fecha es muy próxima";
                }
            } else {
                $mensaje->mensaje = "JAJA, sigue intentandolo, crack";
            }
        } else {
            $mensaje->mensaje = "Reserva no recibida";
        }
    } else {
        $mensaje->mensaje = "Sesion no iniciada";
    }
    echo json_encode($mensaje);
}


/**
 * Obtiene las cabinas para una fecha
 *
 * @return void
 */
function consultaCabinas()
{
    $mensaje = new class
    {
    };
    $mensaje->estado = false;
    if (isset($_POST['fecha'])) {
        $fecha = date("Y-m-d", strtotime($_POST['fecha']));
        $mensaje->fecha=($_POST['fecha']);
        $bd = DBConnection();
        $query = $bd->prepare("Select cabinas.id,cabinas.planta,cabinas.tipo,plantas.horas FROM cabinas INNER JOIN plantas ON cabinas.planta = plantas.id WHERE (cabinas.id,plantas.horas) not in (SELECT reservas.idCabina,reservas.hora from reservas where reservas.fecha=:fecha) AND (cabinas.id,plantas.horas) not in (SELECT reservacamara.idCabina,reservacamara.hora from reservacamara where reservacamara.fecha=:fecha)");
        $query->bindParam(':fecha', $fecha);
        $query->execute();
        $mensaje->cantidad=$query->rowCount();
        if ($query->rowCount() > 0) {
            $mensaje->estado = true;
            $mensaje->mensaje = $query->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $mensaje->estado = false;
            $mensaje->mensaje = [];
        }
    } else {
        $mensaje->mensaje = "No se ha recibido la fecha";
    }

    echo json_encode($mensaje);
}

/**
 * Obtiene las reservas de un alumno
 *
 * @return void
 */
function reservasAlumno()
{
    require_once __DIR__.'/../bootstrap.php';
    require_once __DIR__.'/../src/Entity/Reservas.php';
    require_once __DIR__.'/../src/Entity/ReservaCamara.php';
    $mensaje = new stdClass();
    $mensaje->estado = false;
    if (isset($_SESSION['id'])) {
        $entity = getEntityManager();
        $reservasAlumno = $entity->getRepository("Reservas")->findBy(array('idalumno' => $_SESSION['id']));
        $reservasAlumnoCamara = $entity->getRepository("ReservaCamara")->findBy(array('idalumno' => $_SESSION['id']));
        $mensaje->extra = $reservasAlumnoCamara;

        //var_dump($reservasAlumno);

        if (count($reservasAlumno) > 0 || count($reservasAlumnoCamara) > 0) {
            $mensaje->estado = true;

            $reservasAlumno = array_filter($reservasAlumno, function ($res) {
                $nowD = new DateTime();
                return $res->fechaHora() >= $nowD;
            });
            $reservasAlumnoCamara = array_filter($reservasAlumnoCamara, function ($res) {
                $nowD = new DateTime();
                return $res->fechaHora() >= $nowD;
            });
            $mensaje->extra2 = $reservasAlumnoCamara;




            $reservasBien = array();

            foreach ($reservasAlumno as $key => $value) {
                array_push($reservasBien, $value);
            }
            foreach ($reservasAlumnoCamara as $key => $value) {
                array_push($reservasBien, $value);
            }
            //var_dump($reservasBien);

            $mensaje->mensaje = $reservasBien;
        } else {
            $mensaje->mensaje = "No tiene reservas";
        }
    } else {
        $mensaje->mensaje = "Usuario no logeado";
    }
    echo json_encode($mensaje);
}
function dateGreatherThenToday($dateString)
{
    $date = strtotime($dateString);
    $dateNow = strtotime(new DateTime());
    if ($date <= $dateNow) {
        return true;
    } else {
        return false;
    }
}
