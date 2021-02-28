<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Admins
 *
 * @ORM\Table(name="admins")
 * @ORM\Entity
 */
class Admins
{
    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=45, nullable=false)
     * @ORM\Id
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="hashClave", type="string", length=65, nullable=false)
     */
    private $hashclave;



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
}
