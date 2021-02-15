<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Reservas
 *
 * @ORM\Table(name="reservas", indexes={@ORM\Index(name="idCabina", columns={"idCabina"}), @ORM\Index(name="idAlumno", columns={"idAlumno"})})
 * @ORM\Entity
 */
class Reservas
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
     * @var int
     *
     * @ORM\Column(name="idAlumno", type="integer", nullable=false)
     */
    private $idalumno;

    /**
     * @var int
     *
     * @ORM\Column(name="idCabina", type="integer", nullable=false)
     */
    private $idcabina;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha", type="date", nullable=false)
     */
    private $fecha;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="hora", type="time", nullable=false)
     */
    private $hora;


}
