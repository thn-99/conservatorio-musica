<?php

/**
 * Obtiene la suma de dos fechas
 *
 * @param  DateTime $fecha1
 * @param  DateTime $fecha2
 * @return void
 */
function sumDateTimes($fecha1, $fecha2)
{
    $aux = new DateTime();
    $aux->setTimestamp($fecha1->getTimestamp() + $fecha2->getTimestamp());
    return $aux;
}

/**
 * Comprueba que una fecha dada sea menor que $days de hoy futuro
 *
 * @param  integer $days
 * @param  DateTime $date
 * @return void
 */
function dateLowenThenFutureDays($days, $date)
{
    $diaPlus7 = new DateTime();
    $diaPlus7->add(new DateInterval("P" . $days . "D"));
    return $diaPlus7 > $date;
}
