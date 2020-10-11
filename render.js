class render
{
    constructor(canvas)
    {
        this.canvas = canvas;
        if(this.canvas.getContext)
        {
            this.ctx = this.canvas.getContext("2d");
            this.height = this.canvas.height;
            this.width = this.canvas.width;
        }
    }
    run(world)
    {
        // draw
        this.world = world;

        this.ctx.clearRect(0, 0, this.width, this.height);
        for(var i = 0;i < this.world.entitys.length; i++)
        {
            var entity_a = this.world.entitys[i];
            this.draw_circle(entity_a.position.x, entity_a.position.y, entity_a.radius, entity_a.color, entity_a.tag);
        }
    }
    draw_circle(x, y, r, c, tag)
    {
        this.ctx.fillStyle = 'rgba('+c[0]+','+c[1]+','+c[2]+','+c[3]+')';
        y = this.height - y;

        // draw entity's body
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        this.ctx.fill()

        // draw tag
        this.ctx.font = "12px Segoe UI";
        this.ctx.fillText(tag, x - 10, y - 15);
    }
}