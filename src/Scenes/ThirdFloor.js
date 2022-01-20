import { Composite, Bodies } from 'matter-js'

const ThirdFloor = (screen) => {
  var floorThreeComposite = Composite.create();

  var ground = Bodies.rectangle(0.5 * screen.w, 3 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  var leftBound = Bodies.rectangle(-25, screen.h * 2.5, 50, screen.h, {
    isStatic: true,
    render: { visible: false },
    collisionFilter: { group: -3 },
  })

  var rightBound = Bodies.rectangle(screen.w + 25, screen.h * 2.5, 50, screen.h, {
    isStatic: true,
    render: { visible: false },
    collisionFilter: { group: -3 },
  })

  Composite.add(floorThreeComposite, [ground, rightBound, leftBound]);

  return floorThreeComposite;
}

export default ThirdFloor;
