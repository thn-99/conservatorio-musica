<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Plantas
 *
 * @ORM\Table(name="plantas")
 * @ORM\Entity
 */
class Plantas
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="horas", type="time", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $horas;


}
