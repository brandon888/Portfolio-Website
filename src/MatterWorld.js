import Matter, { Body, Events, Runner, Bodies, Composite, Render, Engine, Bounds } from 'matter-js'
import React, { useEffect, useState } from 'react';
import SecondFloor from './Scenes/SecondFloor';
import FirstFloor from './Scenes/FirstFloor';
import ProjectScene from './Scenes/ProjectScene'
import Fade from './Fade';
import './App.css';

const MatterWorld = (props) => {
    const matter = React.createRef();
    let oLetter;
    let setTextFade;
    let projectsBlock;

    const makeTextFade = (setFade) => {
        setTextFade = setFade;
    };

    useEffect(() => {
        var mainDone = false;
        var level = 1;
        var timer = 0;
        var projectsActive = false;

        matter.current.focus();
        
        const screen = {
            w: props.width,
            h: props.height,
        }

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

        oLetter = Bodies.circle(1500, 90, 50, {
            render: { opacity: 0.5 },
            density: 0.01,
        });

        projectsBlock = Bodies.rectangle(screen.w / 3, 2 * screen.h - 50, 300, 100, {
            render: {opacity: 0.6, fillStyle: '#ff0000'},
            isStatic: true,
            friction: 1,
            collisionFilter: { group: -1 },
            density: 0.02,
        });

        var floorOneComposite = FirstFloor(screen);
        var floorTwoComposite = SecondFloor(screen);
        var projectComposite = ProjectScene(screen);

        Composite.add(engine.world,
            [oLetter, floorOneComposite, floorTwoComposite]
        );
        

        Render.run(render);

        Composite.add(engine.world, [projectsBlock]);

        var testing = Bodies.rectangle(screen.w / 2, 0, 200, 20, {
            isStatic: true,
        });

        Composite.add(engine.world, [testing]);
            
        Events.on(engine, "beforeUpdate", () => {
            matter.current.focus();
            if (oLetter.position.y > screen.h * 0.8 && level === 1) {
                if (Bounds.contains(render.bounds, { x: 10, y: screen.h })) {
                    Bounds.translate(render.bounds, {
                        x: 0,
                        y: oLetter.velocity.y,
                    });
                } else if (level === 1) {
                    level = 2;
                    Composite.remove(engine.world,
                        [floorOneComposite]
                    );
                    setTextFade({
                        fade: 'fade-in',
                    })
                }
            }
            if (level === 2) {
                if (oLetter.position.y < screen.h * 1.5) {
                    Composite.add(engine.world, [projectComposite]);
                }
                if (oLetter.position.y < screen.h * 1.3) {
                    setTextFade({
                        fade: 'fade-out',
                    })
                    if (!Bounds.contains(render.bounds, { x: 10, y: 0 })) {
                        Bounds.translate(render.bounds, {
                            x: 0,
                            y: oLetter.velocity.y,
                        });
                    } else {
                        level = 3;
                    }
                    if (oLetter.position.y < screen.h * 0.9 + 100 && oLetter.position.x > screen.w * 0.8 - screen.w / 4) {
                        Bounds.translate(render.bounds, {
                            x: 0,
                            y: -5,
                        });
                    }
                }
                if (oLetter.position.x > projectsBlock.position.x - 150 * Math.cos(projectsBlock.angle) && oLetter.position.x < projectsBlock.position.x + 150 * Math.cos(projectsBlock.angle)
                    && oLetter.position.y < projectsBlock.position.y) {
                    Body.set(projectsBlock, { isStatic: false });
                    Body.setVelocity(projectsBlock, {x: 0, y: -10});
                    timer = 1;
                } else {
                    if (timer != 0 && projectsBlock.position.y > 2 * screen.h - 50) {
                        timer = 0;
                        Body.setStatic(projectsBlock, true);
                        Body.setPosition(projectsBlock, {x: screen.w / 3, y: 2 * screen.h - 50});
                        Body.setAngle(projectsBlock, 0);
                    }
         
                }
                if (level === 3) {
                    Composite.remove([floorTwoComposite]);
                }
            }
            
        });

        var runner = Runner.create();

        Runner.run(runner, engine);
    
    }, []);

    const handleDown = (e) => {
        if (e.key === 'ArrowRight') {
            Body.setVelocity(oLetter, {x: 10, y: oLetter.velocity.y})
        } else if (e.key === 'ArrowLeft') {
            Body.setVelocity(oLetter, {x: -10, y: oLetter.velocity.y})
        }
    }

    return (
        <div
            ref={matter}
            onKeyDown={handleDown}
            tabIndex={0}
        >
        <Fade onChange={makeTextFade} text={"Hi, I'm brandon"}/>
        </div>
    )
}

export default MatterWorld;