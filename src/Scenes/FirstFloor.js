import {
  Body,
  Composite,
  Bodies,
  Constraint
} from 'matter-js'
import Letters from '../Letters';

const SecondFloor = (screen) => {
  var floorOneComposite = Composite.create();

  var bLetter = Letters(screen).bLetter;
  Body.scale(bLetter, 1, 1);

  var rLetter = Letters(screen).rLetter;

  var aLetter = Letters(screen).aLetter;

  var nLetter = Letters(screen).nLetter;
  Body.scale(nLetter, 0.9, 1);

  var dLetter = Letters(screen).dLetter;

  var nLetter2 = Letters(screen).nLetter2;
  Body.scale(nLetter2, 0.9, 1);

  var bigO = Letters(screen).bigO;

  var leftGround = Bodies.rectangle(0.25 * screen.w, 0.55 * screen.h, screen.w * 0.5, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var rightGround = Bodies.rectangle(0.75 * screen.w, 0.55 * screen.h, screen.w * 0.5, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 },
  });

  var leftJoint = Bodies.rectangle(0, 0.55 * screen.h, 30, 30, {
    isStatic: true,
  });

  var rightJoint = Bodies.rectangle(screen.w, 0.55 * screen.h, 30, 30, {
    isStatic: true,
  });

  var leftConstraint = Constraint.create({
    bodyA: leftJoint,
    pointA: { x: -15, y: -15 },
    bodyB: leftGround,
    pointB: { x: -screen.w * 0.25, y: 0 },
    stiffness: 0.1,
    render: { visible: false }
  });

  var rightConstraint = Constraint.create({
    bodyA: rightJoint,
    pointA: { x: 15, y: 15 },
    bodyB: rightGround,
    pointB: { x: screen.w * 0.25, y: 0 },
    stiffness: 0.1,
    render: { visible: false }
  });

  Composite.add(floorOneComposite,
    [leftGround, rightGround, bLetter, rLetter, aLetter, nLetter, dLetter, bigO, nLetter2, leftConstraint, rightConstraint]
  )

  return { floorOneComposite, leftGround, rightGround, bigO };
}

export default SecondFloor;
