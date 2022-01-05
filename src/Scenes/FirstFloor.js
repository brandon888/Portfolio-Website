import { Body, Composite, Bodies } from 'matter-js'
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

    var groundLeft = Bodies.rectangle(0.4 * screen.w, 0.66 * screen.h, screen.w * 0.8, 200, {
        isStatic: true,
    });
    var groundRight = Bodies.rectangle(0.902 * screen.w, 0.66 * screen.h, screen.w * 0.1, 200, {
        isStatic: true,
    });

    var leftBound = Bodies.rectangle(-20, screen.h / 2, 20, screen.h, {
        isStatic: true,
    });

    var rightBound = Bodies.rectangle(screen.w + 20, screen.h / 2, 20, screen.h, {
        isStatic: true,
    });

    Composite.add(floorOneComposite,
        [groundRight, leftBound, rightBound, bLetter, rLetter, aLetter, nLetter, dLetter, nLetter2, groundLeft]
    )

    return floorOneComposite;
}

export default SecondFloor;