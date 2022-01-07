import Matter, {
  Body,
  Events,
  Runner,
  Bodies,
  Composite,
  Render,
  Engine,
  Bounds
} from 'matter-js'
import React, {useEffect, useState} from 'react';
import SecondFloor from './Scenes/SecondFloor';
import FirstFloor from './Scenes/FirstFloor';
import ProjectScene from './Scenes/ProjectScene'
import Fade from './Fade'
import './App.css';

const MatterWorld = (props) => {
  const matter = React.createRef();
  let oLetter;
  let setTextFade;
  let projectsBlock;
  let leftGround;
  let rightGround;
  let handleRemoveConstraint;
  let oDetached = false;
  let handleDrop;
  let drop = false;

  const makeTextFade = (setFade) => {
    setTextFade = setFade;
  };

  const screen = {
    w: props.width,
    h: props.height
  }

  console.log(screen.w);
  console.log(screen.h);

  useEffect(() => {
    var mainDone = false;
    var level = 1;
    var timer = 0;
    var projectsActive = false;

    matter.current.focus();

    var engine = Engine.create();
    engine.world.gravity.y = screen.h / 804;

    var render = Render.create({
      element: matter.current,
      engine: engine,
      options: {
        width: screen.w,
        height: screen.h,
        wireframes: false,
        background: '#fffff',
        hasBounds: true
      }
    });

    oLetter = Bodies.circle(screen.w * 0.7, -screen.h / 10, 50, {
      render: {
        opacity: 0.5
      },
      density: 0.01,
      collisionFilter: { group: -2 },
    });

    Body.scale(oLetter, screen.w / 1920, screen.w / 1920);

    projectsBlock = Bodies.rectangle(screen.w / 3, 2 * screen.h - 50, 300, 100, {
      render: {
        opacity: 0.6,
        fillStyle: '#ff0000'
      },
      isStatic: true,
      friction: 1,
      collisionFilter: {
        group: -1
      },
      density: 0.02
    });

    var leftBound = Bodies.rectangle(-5, screen.h * 1.5, 20, screen.h * 3, {
      isStatic: true,
      render: {
        visible: false
      },
      collisionFilter: { group: -3 }
    });

    var rightBound = Bodies.rectangle(screen.w + 5, screen.h * 1.5, 20, screen.h * 3, {
      isStatic: true,
      render: {
        visible: false
      },
      collisionFilter: { group: -3 }
    });

    var firstFloor = FirstFloor(screen);
    var floorOneComposite = firstFloor.floorOneComposite;
    leftGround = firstFloor.leftGround;
    rightGround = firstFloor.rightGround;
    var bigO = firstFloor.bigO;
    var floorTwoComposite = SecondFloor(screen);
    var projectComposite = ProjectScene(screen);

    var oConstraint = Matter.Constraint.create({
      bodyA: bigO,
      bodyB: oLetter,
      render: { visible: false }
    });


    Composite.add(engine.world, [oConstraint, oLetter, floorOneComposite, floorTwoComposite, leftBound, rightBound]);

    Composite.add(engine.world, [projectsBlock]);

    handleRemoveConstraint = (right) => {
      Composite.remove(engine.world, oConstraint);
      const xForce = right ? 2 * screen.w / 1920 : -2 * screen.w / 1920;
      Body.setVelocity(oLetter, { x: xForce, y: -Math.abs(xForce) * 6 });
    }

    Events.on(engine, "beforeUpdate", () => {
      matter.current.focus();
      if (level === 1 && drop) {
        if (Bounds.contains(render.bounds, {
          x: 10,
          y: screen.h
        })) {
          Bounds.translate(render.bounds, {
            x: 0,
            y: screen.h * 0.01,
          });
        } else if (level === 1) {
          level = 2;
          //Composite.remove(engine.world, [floorOneComposite]);
          setTextFade({fade: 'fade-in'})
        }
      }
      if (level === 2) {
        if (leftGround.angle > 1.65) {
          Composite.remove(floorOneComposite, [leftGround, rightGround]);
        }
        if (oLetter.position.y < screen.h * 1.5) {
          Composite.add(engine.world, [projectComposite]);
        }
        if (oLetter.position.y < screen.h * 1.3) {
          setTextFade({fade: 'fade-out'})
          if (!Bounds.contains(render.bounds, {
            x: 10,
            y: 0
          })) {
            Bounds.translate(render.bounds, {
              x: 0,
              y: oLetter.velocity.y
            });
          } else {
            level = 3;
          }
          if (oLetter.position.y < screen.h * 0.9 + 100 && oLetter.position.x > screen.w * 0.8 - screen.w / 4) {
            Bounds.translate(render.bounds, {
              x: 0,
              y: -5
            });
          }
        } else {
          setTextFade({fade: 'fade-in'})
        }
        if (oLetter.position.x > projectsBlock.position.x - 150 * Math.cos(projectsBlock.angle) && oLetter.position.x < projectsBlock.position.x + 150 * Math.cos(projectsBlock.angle) && oLetter.position.y < projectsBlock.position.y) {
          Body.set(projectsBlock, {isStatic: false});
          Body.setVelocity(projectsBlock, {
            x: 0,
            y: -10
          });
          timer = 1;
        } else {
          if (timer != 0 && projectsBlock.position.y > 2 * screen.h - 50) {
            timer = 0;
            Body.setStatic(projectsBlock, true);
            Body.setPosition(projectsBlock, {
              x: screen.w / 3,
              y: 2 * screen.h - 50
            });
            Body.setAngle(projectsBlock, 0);
          }

        }
        if (level === 3) {
          Composite.remove([floorTwoComposite]);
        }
      }

    });

    var runner = Runner.create();
    Render.run(render);
    Runner.run(runner, engine);

  }, []);

  const handleDown = (e) => {
    if (e.key === 'ArrowRight') {
      if (!oDetached) {
        if (oLetter.position.y < screen.h * 0.4) {
          return;
        }
        oDetached = true;
        handleRemoveConstraint(true);
      }
      Body.setVelocity(oLetter, {
        x: screen.w / 1920 * 10,
        y: oLetter.velocity.y
      })
    } else if (e.key === 'ArrowLeft') {
      if (!oDetached) {
        if (oLetter.position.y < screen.h * 0.4) {
          return;
        }
        oDetached = true;
        handleRemoveConstraint(false);
      }
      Body.setVelocity(oLetter, {
        x: -screen.w / 1920 * 10,
        y: oLetter.velocity.y
      })
    } else if (e.key === 'ArrowDown') {
      if (oDetached) {
        Body.setStatic(leftGround, false);
        Body.setStatic(rightGround, false);
        if (!drop) {
          drop = true;
        }
      }
    }
  }

  return (
    <div ref={matter} onKeyDown={handleDown} tabIndex={0}>
      <Fade onChange={makeTextFade} screen={screen} text={"Hi, I'm Brandon"}/>
    </div>
  )
}

export default MatterWorld;
