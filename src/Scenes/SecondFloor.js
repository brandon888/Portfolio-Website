import { Composite, Bodies, Constraint } from 'matter-js';

const SecondFloor = (screen) => {
  var floorTwoComposite = Composite.create();

  var projectGround = Bodies.rectangle(screen.w * 1.5, 2 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var workGround = Bodies.rectangle(screen.w * -0.5, 2 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var workGround = Bodies.rectangle(screen.w * -0.5, 2 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var leftGround = Bodies.rectangle(0.25 * screen.w, 2 * screen.h, screen.w * 0.5, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var rightGround = Bodies.rectangle(0.75 * screen.w, 2 * screen.h, screen.w * 0.5, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 },
  });

  var leftJoint = Bodies.rectangle(0, 2 * screen.h, 30, 30, {
    isStatic: true,
  });

  var rightJoint = Bodies.rectangle(screen.w, 2 * screen.h, 30, 30, {
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

  var rightBound = Bodies.rectangle(screen.w * 2, screen.h * 1.5, 50, screen.h, {
    isStatic: true,
    render: { visible: false },
  })

  var leftBound = Bodies.rectangle(-screen.w - 25, screen.h * 1.5, 50, screen.h, {
    isStatic: true,
    render: { visible: false },
  })


  Composite.add(floorTwoComposite, [rightBound, leftBound, leftGround, rightGround, workGround, leftConstraint, rightConstraint, projectGround, workGround]);

  return { floorTwoComposite, leftGround, rightGround };
}

export default SecondFloor;
