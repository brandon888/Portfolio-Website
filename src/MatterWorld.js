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
import React, { useEffect } from 'react';
import SecondFloor from './Scenes/SecondFloor';
import FirstFloor from './Scenes/FirstFloor';
import ThirdFloor from './Scenes/ThirdFloor';
import ProfileText from './Components/ProfileText';
import ProjectText from './Components/ProjectText';
import FlashingKeys from './Components/FlashingKeys';
import './App.css';

const MatterWorld = (props) => {
  const matter = React.createRef();
  var engine = Engine.create();
  var render;
  var level = 1;
  var oConstraint;
  var oStartPosition = { x: -100, y: -100 };
  var floorOneComposite;
  var floorTwoComposite;
  var floorThreeComposite;
  var oLetter;
  var profileEnter;
  var moveText;
  var removeArrows;
  var leftGround;
  var rightGround;
  var leftGround2;
  var rightGround2;
  var handleRemoveConstraint;
  var handleScene;
  var oDetached = false;
  var drop = false;
  var drop2 = false;
  var projectMove;
  var cursor;
  var firstRender = true;

  const makeProfileEnter = (setEnter) => {
    profileEnter = setEnter;
  };

  const moveProfileText = (setTrans) => {
    moveText = setTrans;
  };

  const handleProjectMove = (setTrans) => {
    projectMove = setTrans;
  };

  const removeArrowKeys = (setStyle) => {
    removeArrows = setStyle;
  };

  const screen = {
    w: props.width,
    h: props.height
  }

  // const [canvasSize, setCanvasSize] = React.useState({
  //   width: screen.w,
  //   height: screen.h
  // })

  useEffect(() => {
    if (firstRender) {
      firstRender = false;

      // function handleResize() {
      //   setCanvasSize({
      //     height: window.innerHeight,
      //     width: window.innerWidth
      //   })
      // }
      // window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);

      matter.current.focus();
      
      engine.world.gravity.y = screen.h / 1600;

      render = Render.create({
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

      cursor = Bodies.circle(10, 10, 50, {
        render: {
          visible: true
        },
        isStatic: true,
        mass: 1000,
        collisionFilter: { group: -3 }
      });

      Body.scale(oLetter, screen.w / 1920, screen.w / 1920);

      var leftBound = Bodies.rectangle(-5, screen.h * 0.5, 20, screen.h, {
        isStatic: true,
        render: {
          visible: false
        },
        collisionFilter: { group: -3 }
      });

      var rightBound = Bodies.rectangle(screen.w + 5, screen.h * 0.5, 20, screen.h, {
        isStatic: true,
        render: {
          visible: false
        },
        collisionFilter: { group: -3 }
      });

      var firstFloor = FirstFloor(screen);
      var secondFloor = SecondFloor(screen);
      floorOneComposite = firstFloor.floorOneComposite;
      leftGround = firstFloor.leftGround;
      rightGround = firstFloor.rightGround;
      var bigO = firstFloor.bigO;
      floorTwoComposite = secondFloor.floorTwoComposite;
      leftGround2 = secondFloor.leftGround;
      rightGround2 = secondFloor.rightGround;
      floorThreeComposite = ThirdFloor(screen);

      oConstraint = Matter.Constraint.create({
        bodyA: bigO,
        bodyB: oLetter,
        render: { visible: false }
      });

      Composite.add(engine.world, [cursor, oConstraint, oLetter, floorOneComposite, leftBound, rightBound]);

      var runner = Runner.create();
      Render.run(render);
      Runner.run(runner, engine);
    }


  }, []);
  
  handleRemoveConstraint = (right) => {
    Composite.remove(engine.world, oConstraint);
    const xForce = right ? 2 * screen.w / 1920 : -2 * screen.w / 1920;
    Body.setVelocity(oLetter, { x: xForce, y: -Math.abs(xForce) * 6 });
  };

  handleScene = (floor) => {
    if (floor === 2) {
      Body.setStatic(leftGround, false);
      Body.setStatic(rightGround, false);
      Composite.add(engine.world, [floorTwoComposite]);
      removeArrows({ style: 'Arrow-blank' });
      if (!drop) {
        drop = true;
      }
    } else if (floor === 3 && oLetter.position.y > screen.h * 1.7) {
      Body.setStatic(leftGround2, false);
      Body.setStatic(rightGround2, false);
      Composite.add(engine.world, [floorThreeComposite]);
      if (!drop2) {
        drop2 = true;
      }
    }
  };

  Events.on(engine, "beforeUpdate", () => {
    if (oStartPosition.y !== -100) {
      moveText({ x: 0, y: -oLetter.position.y + oStartPosition.y });
    }

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
        profileEnter({
          profileTextDiv: "Profile-text-div",
          profileText: "Profile-text",
          profileTwoDiv: "Profile-two-div",
          profileTextTwo: "Profile-text-two",
          projectArrow: "Right-arrow",
          workArrow: "Left-arrow",
          downArrow: "Down-arrow",
        });
      }
    } else if (drop2 && level === 2) {
      if (oStartPosition.y === -100) {
        oStartPosition.y = oLetter.position.y;
      }
      if (Bounds.contains(render.bounds, {
        x: 10,
        y: screen.h * 2
      })) {
        Bounds.translate(render.bounds, {
          x: 0,
          y: screen.h * 0.02,
        });
      } else {
        level = 3;
      }
      //setTextFade({fade: 'fade-out'})
    }

    var renderTranslation = oLetter.velocity.x;

    if (level === 2) {
      document.getElementById("overlay").style.zIndex = 3;

      if (leftGround.angle > 1.65) {
        Composite.remove(floorOneComposite, [leftGround, rightGround]);
      }
      // Right Movement
      if (oLetter.position.x > screen.w * 0.9) {
        if (Bounds.contains(render.bounds, {
          x: 0,
          y: screen.h * 1.5
        })) {
          if (oLetter.velocity.x < 0) {
            renderTranslation = 0
          }
        }

        if (Bounds.contains(render.bounds, {
          x: screen.w * 2,
          y: screen.h * 1.5
        })) {
          if (oLetter.velocity.x > 0) {
            renderTranslation = 0
          }
        }

        if (oStartPosition.x === -100) {
          oStartPosition.x = oLetter.position.x;
        }

        Bounds.translate(render.bounds, {
          x: renderTranslation,
          y: 0,
        });

        moveText({ x: -oLetter.position.x + oStartPosition.x, y: 0 });
        projectMove({x: -oLetter.position.x + oStartPosition.x});
      }
      // Left Movement
      else if (oLetter.position.x < screen.w * 0.1) {
        if (Bounds.contains(render.bounds, {
          x: -screen.w,
          y: screen.h * 1.5
        })) {
          if (oLetter.velocity.x < 0) {
            renderTranslation = 0
          }
        }
      
        if (Bounds.contains(render.bounds, {
          x: screen.w * 1.05,
          y: screen.h * 1.5
        })) {
          if (oLetter.velocity.x > 0) {
            renderTranslation = 0
          }
        }

        if (oStartPosition.x === -100) {
          oStartPosition.x = oLetter.position.x;
        }

        Bounds.translate(render.bounds, {
          x: renderTranslation,
          y: 0,
        });

        moveText({ x: -oLetter.position.x + oStartPosition.x, y: 0 });
        projectMove({x: -oLetter.position.x + oStartPosition.x});
      } else {
        oStartPosition = { x: -100, y: oStartPosition.y };
      }
    } else if (level === 3) {
      if (leftGround2.angle > 1.65) {
        Composite.remove(floorTwoComposite, [leftGround2, rightGround2]);
      }
    }

  });

  const handleMouseMove = (e) => {
    Body.setPosition(cursor, {x: e.clientX, y: e.clientY})
  };

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
    } else if (e.type === 'wheel') {
      if (!oDetached) {
        if (oLetter.position.y < screen.h * 0.4) {
          return;
        }
        oDetached = true;
        handleRemoveConstraint(false);
      }
      if (oDetached) {
        if (drop === true) {
          handleScene(3);
        } else {
          handleScene(2);
        }

      }
    }
  }

  const moveToProject = () => {
    Body.setVelocity(oLetter, { x: 100 * screen.w / 1920, y: 6 });
  }

  return (
  <div id="container" ref={matter} onKeyDown={handleDown} onWheel={handleDown} tabIndex={0}>
    <div id="overlay">
      <FlashingKeys onChange={removeArrowKeys} />
      <ProfileText projectOnClick={moveToProject} onChange={makeProfileEnter} onPositionChange={moveProfileText} />
      <ProjectText onPositionChange={handleProjectMove} />
    </div>
  </div>
  )
}

export default MatterWorld;
