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
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="hashClave", type="string", length=65, nullable=false)
     */
    private $hashclave;


}
