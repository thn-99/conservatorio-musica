Ejercicio de la asignatura de "Desarrolo de aplicaciones en parte Servidor"
El ejercicio consite en hacer una página web para gestionar las salas de un conservatorio de música.
En el Conservatorio de Música los estudiantes necesitan un espacio propio para poder estudiar
durante su tiempo libre entre clases. Por su condición de instrumentistas, necesitan unas
cabinas habilitadas especialmente para tal uso. Obviamente el número de cabinas es muy
inferior al de estudiantes, haciendo que estas estén muy codiciadas.
Desde la dirección se nos ha pedido que realicemos una aplicación que permita la reserva de
cabinas atendiendo a las distintas peculiaridades de cada cabina y alumno.
Las cabinas se reparten entre los tres pisos de los que consta el edificio. Esto es importante
debido a que por labores de limpieza y para evitar en lo posible que los alumnos se crucen entre
ellos, cada piso va a tener un horario de cabinas distinto. Las cabinas del tercer piso empiezan
sus reservas a las 8, las del segundo piso a las 8:15 y las del tercer piso a las 8:30. Cada reserva
es de 90 min (en ese tiempo ya está incluido el periodo de limpieza).
Hay cabinas de diversos tipos, atendiendo las diversas necesidades del alumnado,
concretamente:
* Hay 25 cabinas con piano de uso general que cualquier alumno puede gastar sea de la
especialidad que sea
* Hay una cabina exclusiva para los alumnos de arpa
* Hay una cabina exclusiva para los alumnos de canto
* Hay dos cabinas exclusivas para los alumnos de percusión
* Hay una cabina exclusiva para los alumnos de jazz
* Hay una cabina exclusiva para agrupaciones de cámara.
La cabina de cámara puede tener un máximo de 3 ocupantes, de los cuales uno será el
responsable de la reserva (persona encargada de coger la llave)
Las cabinas se distribuyen de la siguiente forma:
* 10 cabinas de uso general en el tercer piso
* 8 cabinas de uso general en el segundo piso
* 7 cabinas de uso general en el primer piso
Todas las cabinas especificas se encuentran en el primer piso
Un mismo alumno puede realizar hasta un máximo de 2 reservas para un mismo día. El plazo
máximo para reservar es a una semana vista. Obviamente el alumno también puede cancelar las
reservas que ha realizado. Tanto cuando realiza una reserva como cuando hace una cancelación
el alumno recibirá un correo informándole de la acción y de la cabina en cuestión.
Van a haber 2 clases de usuarios alumno y administrador
La información de los alumnos que queremos es su nombre y apellidos, su instrumento (aunque
pueden ser varios, para simplificar vamos a poner sólo uno), su correo electrónico, la contraseña,
(la cual obviamente se guardará encriptada) un id numérico e incremental y sus reservas.
Del administrador solo necesitamos su nombre y contraseña 
Cuando un alumno se registra en la aplicación le llegará un mensaje (que no correo) a la cuenta
del administrador y este tendrá que validarlo. Una vez validado el alumno ya podrá hacer uso
de la aplicación sin problemas.
Las acciones que ha de poder realizar un alumno son:
Reservar cabina, cancelar reserva, ver sus reservas, cambiar correo electrónico y cambiar
contraseña
Las acciones que ha de poder realizar un administrador son:
Validar peticiones, ver reservas de un alumno concreto, ver todas las reservas de la semana, ver
todas las reservas de la semana de un aula en concreto.
La aplicación ha de proveer un sistema que permita elegir el idioma de la misma entre castellano
y otro idioma (valenciano, ingles francés… el que se quiera)