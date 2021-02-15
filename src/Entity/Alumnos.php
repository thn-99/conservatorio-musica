<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Alumnos
 *
 * @ORM\Table(name="alumnos", uniqueConstraints={@ORM\UniqueConstraint(name="correo", columns={"correo"})})
 * @ORM\Entity
 */
class Alumnos
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
     * @var string|null
     *
     * @ORM\Column(name="nombre", type="string", length=45, nullable=true)
     */
    private $nombre;

    /**
     * @var string|null
     *
     * @ORM\Column(name="apellidos", type="string", length=45, nullable=true)
     */
    private $apellidos;

    /**
     * @var string
     *
     * @ORM\Column(name="instrumento", type="string", length=30, nullable=false)
     */
    private $instrumento;

    /**
     * @var string
     *
     * @ORM\Column(name="correo", type="string", length=254, nullable=false)
     */
    private $correo;

    /**
     * @var string
     *
     * @ORM\Column(name="hashClave", type="string", length=65, nullable=false)
     */
    private $hashclave;


}
