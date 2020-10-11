class engine
{
    constructor()
    {
        // 2D physics Engine
        this.time_invertal = 1.0;
        this.friction = 0.05;
    }
    overlapping(entity_a, entity_b)
    {
        var v = entity_a.position.copy();
        var mid = entity_a.position.copy();
        
        mid.add(entity_b.position);
        mid.mul(0.5);

        v.mul(-1);
        v.add(entity_b.position)
        v.mul((-1 / v.radius));
        
        var va = v.copy();
        var vb = v.copy();
        
        va.mul(entity_a.radius);
        vb.mul(-1 * entity_b.radius);
        va.add(mid);
        vb.add(mid);
        
        entity_a.position = va;
        entity_b.position = vb;
    }
    collisionDetection(entity_a, entity_b)
    {
        var a = entity_a.position.copy();
        var b = entity_b.position.copy();
        b.mul(-1)
        a.add(b);

        if(a.radius < (entity_a.radius + entity_b.radius))
            return true;
        return false;
    }
    wallDetection(entity_a)
    {
        var pos = entity_a.position.copy();
        
        if((pos.x - entity_a.radius / 2) < this.world.x_boundary[0] || (pos.x + entity_a.radius / 2) > this.world.x_boundary[1])
        {
            entity_a.velocity.x *= this.friction - 1;
            entity_a.velocity.toPolarSystem();
            
            if((pos.x - entity_a.radius / 2) < this.world.x_boundary[0])
                entity_a.position.x = this.world.x_boundary[0] + entity_a.radius / 2
            else
                entity_a.position.x = this.world.x_boundary[1] - entity_a.radius / 2
            entity_a.position.toPolarSystem();
        }
        if((pos.y - entity_a.radius / 2) < this.world.y_boundary[0] || (pos.y - entity_a.radius / 2) > this.world.y_boundary[1])
        {
            entity_a.velocity.y *= this.friction - 1;
            entity_a.velocity.toPolarSystem();
        
            if((pos.y - entity_a.radius / 2) < this.world.y_boundary[0])
                entity_a.position.y = this.world.y_boundary[0] + entity_a.radius / 2
            else
                entity_a.position.y = this.world.y_boundary[1] - entity_a.radius / 2
            entity_a.position.toPolarSystem();
        }
    }
    collision(entity_a, entity_b)
    {
        var vel_va = entity_a.velocity.copy();
        var vel_vb = null;

        vel_va.mul(-1);
        vel_va.add(entity_b.velocity);
        vel_va.mul(1 / vel_va.radius);
        vel_vb = vel_va.copy();

        // 分量
        var va = (vel_va.dot(entity_a.velocity));
        var vb = (vel_va.dot(entity_b.velocity));
        
        // 碰撞後的力
        var nva = (va * (entity_a.mass - entity_b.mass) + 2 * entity_b.mass * vb) / (entity_a.mass + entity_b.mass);
        var nvb = (vb * (entity_b.mass - entity_a.mass) + 2 * entity_a.mass * va) / (entity_a.mass + entity_b.mass);
        
        // 變動的分量
        vel_va.mul(nva*(1-this.friction*0.5) - va);
        vel_vb.mul(nvb*(1-this.friction*0.5) - vb);

        entity_a.velocity.add(vel_va);
        entity_b.velocity.add(vel_vb);
    }

    moveEntity(entity_a)
    {
        // external force
        for(var i = 0;i < this.world.forces.length; i++)
        {
            var acc = this.world.forces[i].copy()
            acc.mul(this.time_invertal);
            entity_a.velocity.add(acc);
        }
        // internal force
        var acc = entity_a.acceleration.copy()
        acc.mul(this.time_invertal);
        entity_a.velocity.add(acc);
        
        var vel = entity_a.velocity.copy();
        vel.mul(this.time_invertal);
        entity_a.position.add(vel);
    }
    run(world, time_invertal)
    {
        this.world = world;
        this.time_invertal = time_invertal;

        for(var i = 0;i < this.world.entitys.length; i++)
        {
            var entity_a = this.world.entitys[i];
            if(entity_a.freez) continue;
            this.wallDetection(entity_a);

            // collision detetion
            for(var j = i + 1;j < this.world.entitys.length; j++)
            {
                var entity_b = this.world.entitys[j];
                if(entity_b.freez) continue;
                if(this.collisionDetection(entity_a, entity_b))
                {
                    this.collision(entity_a, entity_b);
                    this.overlapping(entity_a, entity_b);
                }
            }
            this.moveEntity(entity_a);
        }
    }
}