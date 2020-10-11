class world
{
    constructor(width, height)
    {
        this.forces = [];
        this.entitys= [];
        this.counter= 0;
        // add gravity
        this.forces.push(new vector2d(0, -9.8));

        // set wall boundary
        this.x_boundary = [0, width];
        this.y_boundary = [0, height];
    }
    addEntity(E1)
    {
        E1.tag = 'e-' + this.counter;
        if(this.counter % 10 == 0)
            E1.color = [0, 0, 255, 200, -1];
        this.entitys.push(E1);
        this.counter += 1;
    }
    removeEntity(tag)
    {
        var index = -1;
        for(var i = 0;i < this.entitys; i++)
        {
            if (this.entitys[i].tag === tag)
            {
                index = i;
                break;
            }
        }
        if(index != -1)
            this.entitys.splice(index, 1);
    }
}