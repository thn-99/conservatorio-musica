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

    function __construct($nombre,$apellidos,$instrumento,$correo,$hashclave)
    {
        $this->nombre=$nombre;
        $this->apellidos=$apellidos;
        $this->instrumento=$instrumento;
        $this->correo=$correo;
        $this->hashclave=$hashclave;
    }

    /**
     * Get the value of correo
     */
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Set the value of correo
     *
     * @return self
     */
    public function setCorreo($correo) : self
    {
        $this->correo = $correo;

        return $this;
    }

    /**
     * Get the value of hashclave
     */
    public function getHashclave()
    {
        return $this->hashclave;
    }

    /**
     * Set the value of hashclave
     *
     * @return self
     */
    public function setHashclave($hashclave) : self
    {
        $this->hashclave = $hashclave;

        return $this;
    }
    public function __sleep()
    {
        return array();
    }

    /**
     * Get the value of nombre
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return self
     */
    public function setNombre($nombre) : self
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return self
     */
    public function setId($id) : self
    {
        $this->id = $id;

        return $this;
    }
}
