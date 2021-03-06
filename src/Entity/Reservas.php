<?php
require_once 'Alumnos.php';
require_once 'Cabinas.php';

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;
/**
 * Reservas
 *
 * @ORM\Table(name="reservas", indexes={@ORM\Index(name="idCabina", columns={"idCabina"}), @ORM\Index(name="idAlumno", columns={"idAlumno"})})
 * @ORM\Entity
 */
class Reservas implements JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @ManyToOne(targetEntity="Alumnos")
     * @JoinColumn(name="idAlumno", referencedColumnName="id")
     */
    private $idalumno;

    /**
     * @ManyToOne(targetEntity="Cabinas")
     * @JoinColumn(name="idCabina", referencedColumnName="id")
     */
    private $idcabina;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha", type="date", nullable=false)
     */
    private $fecha;

    /**
     *
     * @ORM\Column(name="hora", type="time", nullable=false)
     */
    private $hora;

    function __construct($idalumno=null,$idcabina=null,$fecha=null,$hora=null)
    {
        $this->idalumno=$idalumno;
        $this->idcabina=$idcabina;
        $this->fecha=$fecha;
        $this->hora=$hora;
    }



    /**
     * Get the value of fecha
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set the value of fecha
     *
     * @return self
     */
    public function setFecha($fecha) : self
    {
        $this->fecha = $fecha;

        return $this;
    }
    public function copia(){
        $copia = new stdClass();
        $copia->puerta=$this->idcabina;
        $copia->fecha=$this->fecha->format('Y-m-d');
        $copia->hora=$this->hora;
        //$copia->hora=$this->hora;
        return $copia;
    }

    public function jsonSerialize()
    {
        
        return ["id"=>$this->id,"puerta"=>$this->idcabina,"fecha"=>$this->fecha->format('Y-m-d'),"hora"=>$this->hora->format('H:i:s')];
    }

    /**
     * Get the value of idalumno
     */
    public function getAlumno()
    {
        return $this->idalumno;
    }

    /**
     * Set the value of idalumno
     *
     * @return self
     */
    public function setAlumno($idalumno) : self
    {
        $this->idalumno = $idalumno;

        return $this;
    }

    /**
     * Get the value of hora
     */
    public function getHora()
    {
        return $this->hora;
    }

    /**
     * Set the value of hora
     *
     * @return self
     */
    public function setHora($hora) : self
    {
        $this->hora = $hora;

        return $this;
    }

    public function fechaHora(){
        require_once __DIR__.'/../dateUtils.php';
        return sumDateTimes($this->fecha,$this->hora);
    }
}
