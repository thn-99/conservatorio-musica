<?php
require_once __DIR__.'/../src/Entity/Reservas.php';
require_once __DIR__.'/../src/Entity/ReservaCamara.php';
require_once __DIR__.'/../src/Entity/Alumnos.php';
require_once __DIR__.'/../bootstrap.php';

/**
 * Devuelve la cantidad de reservas que tiene un alumno para una fecha dada
 *
 * @param  Alumnos $alumno
 * @param  DateTime $fecha
 * @return integer
 */
function countReservasByAlumnoYFecha($alumno, $fecha)
{
    $entity = getEntityManager();
    $query = $entity->createQuery("SELECT count(u) FROM Reservas u WHERE u.idalumno=:alumno AND u.fecha=:fecha");
    $query->setParameter(":alumno", $alumno);
    $query->setParameter(":fecha", $fecha);

    $query2 = $entity->createQuery("SELECT count(u) FROM ReservaCamara u WHERE u.idalumno=:alumno AND u.fecha=:fecha");
    $query2->setParameter(":alumno", $alumno);
    $query2->setParameter(":fecha", $fecha);

    $resultado = $query->getSingleScalarResult();
    $resultado2 = $query2->getSingleScalarResult();
    return $resultado+$resultado2;
}



/**
 * devuelve si un alumno tiene alguna reserva en la fecha y entre las horas indicadas.
 *
 * @param  Alumnos $alumno
 * @param  DateTime $fecha
 * @param  DateTime $hora
 * @param  integer $inicio
 * @param  integer $fin
 * @return boolean
 */
function hasReservasByAlumnosYFechaYHoraBetween($alumno, $fecha, $hora, $inicio, $fin)
{
    $entity = getEntityManager();
    $horaInicio = new DateTime();
    $horaFin = new DateTime();
    $horaInicio->setTimestamp($hora->getTimestamp() - (60 * $inicio));
    $horaFin->setTimestamp($hora->getTimestamp() + (60 * $fin));

    $query = $entity->createQuery("SELECT count(u) FROM Reservas u WHERE u.idalumno=:alumno AND u.fecha=:fecha AND u.hora BETWEEN :horaInicio AND :horaFin");
    $query->setParameter(":alumno", $alumno);
    $query->setParameter(":horaInicio", $horaInicio);
    $query->setParameter(":horaFin", $horaFin);
    $query->setParameter(":fecha", $fecha);
    $resultado = $query->getSingleScalarResult();

    $query2 = $entity->createQuery("SELECT count(u) FROM ReservaCamara u WHERE u.idalumno=:alumno AND u.fecha=:fecha AND u.hora BETWEEN :horaInicio AND :horaFin");
    $query2->setParameter(":alumno", $alumno);
    $query2->setParameter(":horaInicio", $horaInicio);
    $query2->setParameter(":horaFin", $horaFin);
    $query2->setParameter(":fecha", $fecha);
    $resultado2 = $query2->getSingleScalarResult();

    return $resultado+$resultado2 == 0;
}

/**
 * getAlumnoByCorreo
 *
 * @param  EntityManager $entity
 * @param  string $correo
 * @return Alumnos||null
 */
function getAlumnoByCorreo($entity, $correo)
{
    $query = $entity->createQuery("SELECT u from Alumnos u WHERE u.correo=:correo");
    $query->setParameter(":correo", $correo);
    $alumnoMal = $query->getOneOrNullResult();
    if ($alumnoMal != null) {
        $alumnoBien = $entity->find("Alumnos", $alumnoMal->getId());
        return $alumnoBien;
    } else {
        return null;
    }
}

/**
 * Commprueba que no se solape ni haya mas de 2 reservas para el alumno, fecha y hora dada
 *
 * @param  Alumnos $alumno
 * @param  DateTime $fecha
 * @param  DateTime $hora
 * @return boolean
 */
function noReservasYNoSolapa($alumno, $fecha, $hora)
{
    return (countReservasByAlumnoYFecha($alumno, $fecha) < 2 && hasReservasByAlumnosYFechaYHoraBetween($alumno, $fecha, $hora, 90, 90));
}
