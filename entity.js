class entity
{
    constructor(tag, radius, mass)
    {
        this.radius = radius;
        this.mass   = mass;
        this.tag    = tag;
        this.freez = false;
        this.color  = [0, 255, 0, 200, -1];
        this.position     = new vector2d(0, 0);
        this.velocity     = new vector2d(0, 0);
        this.acceleration = new vector2d(0, 0);
    }
}