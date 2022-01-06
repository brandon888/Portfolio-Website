import {
  Body,
  Composite,
  Bodies
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

  var ground = Bodies.rectangle(0.5 * screen.w, 0.66 * screen.h, screen.w, screen.h * 0.05, {
    isStatic: true,
  });


  Composite.add(floorOneComposite,
    [ground, bLetter, rLetter, aLetter, nLetter, dLetter, nLetter2]
  )

  return floorOneComposite;
}

export default SecondFloor;
