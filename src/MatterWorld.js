import Matter, { Body, Runner } from 'matter-js'
import React, { useEffect, useState } from 'react';
import Letters from './Letters';

const MatterWorld = () => {
    const testObj = React.createRef();
    let boxA;

    useEffect(() => {
        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var World = Matter.Runner;
        var Bodies = Matter.Bodies;
        var Composite = Matter.Composite;

        var engine = Engine.create();

        var render = Render.create({
            element: testObj.current,
            engine: engine,
            options: {
                width: 2000,
                height: 1000,
                wireframes: false,
                background: '#fffff',
            }
        });

        boxA = Bodies.rectangle(400, 200, 80, 80, {
            render: {
                fillStyle: 'black',
            }
        });


        // Letter B
        var bLetter = Letters().bLetter;
        Body.scale(bLetter, 1, 1);

        // Letter R


        var ground = Bodies.rectangle(400, 614, 2000, 200,{
            isStatic: true,
        });

        Composite.add(engine.world, [boxA, bLetter, ground]);

        Render.run(render);

        var runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    
    }, []);

    const handleDown = (e) => {
        if (e.key === 'ArrowRight') {
            Body.applyForce(boxA, {
                x: boxA.position.x,
                y: boxA.position.y,
            }, {
                x: 0.1,
                y: 0,
            });
        } else if (e.key === 'ArrowLeft') {
            Body.applyForce(boxA, {
                x: boxA.position.x,
                y: boxA.position.y,
            }, {
                x: -0.1,
                y: 0,
            });
        }
    }

    return (
        <div
            onKeyDown={handleDown}
            tabIndex={-1}
            ref={testObj}
            style={{ width: '100%', height: '100%' }}
        >
        </div>
    )
}

export default MatterWorld;