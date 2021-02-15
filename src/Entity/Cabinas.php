<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Cabinas
 *
 * @ORM\Table(name="cabinas", indexes={@ORM\Index(name="planta", columns={"planta"})})
 * @ORM\Entity
 */
class Cabinas
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
     * @ORM\Column(name="planta", type="integer", nullable=false)
     */
    private $planta;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo", type="string", length=15, nullable=false)
     */
    private $tipo;


}
