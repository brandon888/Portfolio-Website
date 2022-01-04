import Matter, { Body, Events, Runner } from 'matter-js'
import React, { useEffect, useState } from 'react';
import Letters from './Letters';
import Fade from './Fade';
import './App.css';

const MatterWorld = (props) => {
    const matter = React.createRef();
    let oLetter;
    let setTextFade;

    const makeTextFade = (setFade) => {
        setTextFade = setFade;
    };

    useEffect(() => {
        var level = 1;

        matter.current.focus();

        console.log(props.width);
        console.log(props.height);
        
        const screen = {
            w: props.width,
            h: props.height,
        }

        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var Bodies = Matter.Bodies;
        var Composite = Matter.Composite;
        var Bounds = Matter.Bounds;

        var engine = Engine.create();

        var render = Render.create({
            element: matter.current,
            engine: engine,
            options: {
                width: screen.w,
                height: screen.h,
                wireframes: false,
                background: '#fffff',
                hasBounds: true,
            }
        });

        var bLetter = Letters(screen).bLetter;
        Body.scale(bLetter, 1, 1);

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

        var secondGround = Bodies.rectangle(screen.w, 2 * screen.h, screen.w * 0.8, 200, {
            isStatic: true,
        });

        Composite.add(engine.world,
            [groundRight, leftBound, rightBound, bLetter, rLetter, aLetter, nLetter, dLetter, oLetter, nLetter2, groundLeft, secondGround]
        );

        Render.run(render);

        Events.on(engine, "beforeUpdate", (e) => {
            matter.current.focus();
            if (oLetter.position.y > screen.h * 0.8 && level === 1) {
                if (oLetter.velocity.y > 0.1) {
                    Bounds.translate(render.bounds, {
                        x: 0,
                        y: oLetter.velocity.y,
                    });
                } else if (level != 2) {
                    level = 2;
                    Composite.remove(engine.world,
                        [groundRight, leftBound, rightBound, bLetter, rLetter, aLetter, nLetter, dLetter, nLetter2, groundLeft]
                    );
                    setTextFade({
                        fade: 'fade-in',
                    })
                }
            }
        });

        var runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    
    }, []);

    const handleDown = (e) => {
        if (e.key === 'ArrowRight') {
            Body.setVelocity(oLetter, {x: 10, y: oLetter.velocity.y})
        } else if (e.key === 'ArrowLeft') {
            Body.setVelocity(oLetter, {x: -10, y: oLetter.velocity.y})
        } else if (e.key === 'ArrowUp') {
            Body.setVelocity(oLetter, {x: oLetter.velocity.x, y: -10})
        }
    }

    return (
        <div
            ref={matter}
            onKeyDown={handleDown}
            tabIndex={0}
        >
        <Fade onChange={makeTextFade} text={"hi, i'm brandon"}/>
        </div>
    )
}

export default MatterWorld;