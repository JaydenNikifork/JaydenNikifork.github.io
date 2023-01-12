import { useRef, useEffect } from "react";
import { PRIMARY } from "../utils/constanst";

export default function Background(props) {
    const canvasRef = useRef(null);
    let ctx;
    let paused = false;

    useEffect(() => {
        const canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        
        const pauseOrUnpause = _ => {
            if (document.hidden) paused = true
            else paused = false
        }

        document.addEventListener('visibilitychange', pauseOrUnpause);
        window.requestAnimationFrame(tick);

        return () => {
            document.addEventListener('visibilitychange', pauseOrUnpause);
        }
    }, []);

    let circles = Circle.generate();

    const update = (dt) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < circles.length; i++) {
            circles[i].drawCircle(ctx);
            circles[i].wallBounce();
            circles[i].moveCircle(dt);
            for (let j = i + 1; j < circles.length; j++) {
                [circles[i], circles[j]] = collide(circles[i], circles[j]);
            }
        }
    }

    let previousTimeStamp = performance.now();
    const tick = (timeStamp) => {
        let dt = timeStamp - previousTimeStamp;
        if (dt > 100) dt = 100;
        console.log(dt)
        previousTimeStamp = timeStamp;

        if (!paused) update(dt);
    
        window.requestAnimationFrame(tick);
    }

    return (
        <canvas ref={canvasRef} {...props} />
    );
}

class Circle {
    constructor(radius, pos, vel, color) {
        this.radius = radius;
        this.mass = Math.PI * Math.pow(radius, 2); 
        this.pos = pos;
        this.vel = vel;
        this.color = color;
    }

    getVel = () => {
        return (pyth(this.vel.x, this.vel.y));
    }

    moveCircle = (dt) => {
        this.pos = { x: this.pos.x + this.vel.x * dt, y: this.pos.y + this.vel.y * dt };
    }

    wallBounce = () => {
        if ((this.pos.x - this.radius <= 0 && this.vel.x < 0) || (this.pos.x + this.radius >= window.innerWidth && this.vel.x > 0)) this.vel.x *= -1;
        if ((this.pos.y - this.radius <= 0 && this.vel.y < 0) || (this.pos.y + this.radius >= window.innerHeight && this.vel.y > 0)) this.vel.y *= -1;
    }

    drawCircle = (ctx) => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    static generate = () => {
        let circles = [];
        for (let i = 0; i < getRand(4, 5); i++) {
            circles.push(new Circle(
                getRand(20, window.innerHeight / 4),
                { x: getRand(0, window.innerWidth), y: getRand(0, window.innerHeight) },
                { x: getRand(-0.2, 0.2), y: getRand(-0.2, 0.2) },
                // '#'.concat(getRand(0, 16777215).toString(16))
                PRIMARY
            ))
        }
        return circles;
    }
}

function collide(cir1, cir2) {
    const distance = pyth(cir1.pos.x - cir2.pos.x, cir1.pos.y - cir2.pos.y);
    const radius = cir1.radius + cir2.radius;

    if (distance > radius) return([cir1, cir2]);

    let posAngle = getAngle(cir1.pos.x - cir2.pos.x, cir1.pos.y - cir2.pos.y);

    cir1.pos.x += (radius - distance) / 2 * Math.cos(posAngle) * 1.5;
    cir1.pos.y += (radius - distance) / 2 * Math.sin(posAngle) * 1.5;
    cir2.pos.x -= (radius - distance) / 2 * Math.cos(posAngle) * 1.5;
    cir2.pos.y -= (radius - distance) / 2 * Math.sin(posAngle) * 1.5;

    posAngle = getAngle(cir1.pos.x - cir2.pos.x, cir1.pos.y - cir2.pos.y);

    const velAngle1 = getAngle(cir1.vel.x, cir1.vel.y);
    const velAngle2 = getAngle(cir2.vel.x, cir2.vel.y);

    const newCir1Vel = {
        x: getXVel(cir1.mass, cir2.mass, cir1.getVel(), cir2.getVel(), velAngle1, velAngle2, posAngle),
        y: getYVel(cir1.mass, cir2.mass, cir1.getVel(), cir2.getVel(), velAngle1, velAngle2, posAngle)
    };
    const newCir2Vel = {
        x: getXVel(cir2.mass, cir1.mass, cir2.getVel(), cir1.getVel(), velAngle2, velAngle1, posAngle),
        y: getYVel(cir2.mass, cir1.mass, cir2.getVel(), cir1.getVel(), velAngle2, velAngle1, posAngle)
    }
    cir1.vel = newCir1Vel;
    cir2.vel = newCir2Vel;

    return([cir1, cir2]);
}

function pyth(x, y) {
    return (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
}

function getAngle(x, y) {
    if (x === 0) {
        return 0;
    }
    let angle = Math.abs(Math.atan(y / x));
    if (x <= 0 && y > 0) {
        angle = Math.PI - angle;
    }
    else if (x < 0 && y <= 0) {
        angle = Math.PI + angle;
    }
    else if (x >= 0 && y < 0) {
        angle = Math.PI*2 - angle;
    }
    return angle;
}

function getXVel(m1, m2, v1, v2, theta1, theta2, phi) {
    return (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) * Math.cos(phi) / (m1 + m2) +
            v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
}

function getYVel(m1, m2, v1, v2, theta1, theta2, phi) {
    return (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) * Math.sin(phi) / (m1 + m2) +
            v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
}

function getRand(lo, hi) {
    return Math.floor(Math.random() * (hi - lo) + lo);
}