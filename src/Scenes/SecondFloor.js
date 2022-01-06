import { Composite, Bodies } from 'matter-js'

const SecondFloor = (screen) => {
  var floorTwoComposite = Composite.create();

  var secondGround = Bodies.rectangle(screen.w / 2, 2 * screen.h, screen.w, 200, {
    isStatic: true,
    collisionFilter: {
      group: -1
    }
  });

  Composite.add(floorTwoComposite, secondGround);

  return floorTwoComposite;
}

export default SecondFloor;
