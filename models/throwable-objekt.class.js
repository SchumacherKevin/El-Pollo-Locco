class ThrowableObjekt extends MoveableObjekt {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.y = 200;
        this.speed = 10;
        this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 25);
    }
}