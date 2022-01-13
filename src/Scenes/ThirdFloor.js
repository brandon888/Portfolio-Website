import { Composite, Bodies } from 'matter-js'

const ThirdFloor = (screen) => {
  var floorThreeComposite = Composite.create();

  var ground = Bodies.rectangle(0.5 * screen.w, 3 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
    collisionFilter: { group: -3 }
  });

  Composite.add(floorThreeComposite, [ground]);

  return floorThreeComposite;
}

export default ThirdFloor;
