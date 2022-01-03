import Matter, { Body, Runner } from 'matter-js'
import React, { useEffect, useState } from 'react';
import Letters from './Letters';

const MatterWorld = (props) => {
    const matter = React.createRef();
    let boxA;
    let trap;
    let oLetter;
    let bLetter;

    useEffect(() => {
        matter.current.focus();

        console.log(props.width);
        console.log(props.height);
        
        const screen = {
            w: props.width,
            h: props.height,
        }

        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var World = Matter.Runner;
        var Bodies = Matter.Bodies;
        var Composite = Matter.Composite;

        var engine = Engine.create();

        var render = Render.create({
            element: matter.current,
            engine: engine,
            options: {
                width: screen.w,
                height: screen.h,
                wireframes: false,
                background: '#fffff',
            }
        });

        boxA = Bodies.rectangle(400, 200, 80, 80, {
            render: {
                fillStyle: 'black',
            }
        });

        trap = Bodies.fromVertices(600, 20, [
            {x: 0, y: 0},
            {x: 0, y: 20},
            {x: 20, y: 20},
            {x: 20, y: 0},
        ]);

        // Letter B
        var bLetter = Letters(screen).bLetter;
        Body.scale(bLetter, 1, 1);

        // Letter R
        var rLetter = Letters(screen).rLetter;

        var aLetter = Letters(screen).aLetter;

        var nLetter = Letters(screen).nLetter;
        Body.scale(nLetter, 0.9, 1);

        var dLetter = Letters(screen).dLetter;

        oLetter = Bodies.circle(1500, 90, 50, {
            render: { opacity: 0.5 },
        });

        var nLetter2 = Letters(screen).nLetter2;
        Body.scale(nLetter2, 0.9, 1);

        var groundLeft = Bodies.rectangle(0.4 * screen.w, 0.66 * screen.h, screen.w * 0.8, 200, {
            isStatic: true,
        });
        var groundRight = Bodies.rectangle(0.902 * screen.w, 0.66 * screen.h, screen.w * 0.1, 200, {
            isStatic: true,
        });

        var leftBound = Bodies.rectangle(-20, screen.h / 2, 20, screen.h, {
            isStatic: true,
        });

        var rightBound = Bodies.rectangle(screen.w + 20, screen.h / 2, 20, screen.h, {
            isStatic: true,
        });

        Composite.add(engine.world,
            [groundRight, leftBound, rightBound, boxA, bLetter, rLetter, aLetter, nLetter, dLetter, oLetter, nLetter2, groundLeft,]
        );

        Render.run(render);

        var runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    
    }, []);

    const handleDown = (e) => {
        if (e.key === 'ArrowRight') {
            Body.applyForce(oLetter, {
                x: oLetter.position.x,
                y: oLetter.position.y,
            }, {
                x: 0.1,
                y: 0,
            });
        } else if (e.key === 'ArrowLeft') {
            Body.applyForce(oLetter, {
                x: oLetter.position.x,
                y: oLetter.position.y,
            }, {
                x: -0.1,
                y: 0,
            });
        } else if (e.key === 'ArrowUp') {
            Body.applyForce(oLetter, {
                x: oLetter.position.x,
                y: oLetter.position.y,
            }, {
                x: 0,
                y: -0.3,
            });
        }
    }

    return (
        <div
            ref={matter}
            onKeyDown={handleDown}
            tabIndex={-1}
        >
        </div>
    )
}

export default MatterWorld;