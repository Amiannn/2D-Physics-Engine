class vector2d
{
    constructor(x, y)
    {
        // cartesian coordinate system
        this.x = x;
        this.y = y;

        // polar coordinate system
        this.toPolarSystem();
    }
    toPolarSystem()
    {
        this.angle = Math.atan2(this.y, this.x) * 180 / Math.PI;
        this.radius= Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
    }
    toCartesianSystem()
    {
        this.x = Math.cos(this.angle * Math.PI / 180) * this.radius;
        this.y = Math.sin(this.angle * Math.PI / 180) * this.radius;
    }
    add(vector_b)
    {
        this.x += vector_b.x;
        this.y += vector_b.y;
        this.toPolarSystem();
    }
    mul(coff)
    {
        this.x *= coff;
        this.y *= coff;
        this.toPolarSystem();
    }
    cross(vector_b)
    {
        var value = (this.x * vector_b.y - this.y * vector_b.x);
        return value;
    }
    dot(vector_b)
    {
        var value = (this.x * vector_b.x + this.y * vector_b.y);
        return value;
    }
    copy()
    {
        return new vector2d(this.x, this.y);
    }
}