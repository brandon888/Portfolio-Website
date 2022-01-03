import Matter, { Body } from 'matter-js';

const Letters = (param) => {
    var Bodies = Matter.Bodies;

    const bTopPos = { x: 500, y: 50 };


    // B
    var bOuterTop = Bodies.rectangle(bTopPos.x, bTopPos.y, 100, 85, {
        chamfer: { radius: [0, 40, 40, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var bOuterBot = Bodies.rectangle(500, 130, 100, 85, {
        chamfer: { radius: [0, 40, 40, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var bInnerTop = Bodies.rectangle(500, 50, 50, 40, {
        chamfer: { radius: [0, 20, 20, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var bInnerBot = Bodies.rectangle(500, 130, 50, 40, {
        chamfer: { radius: [0, 20, 20, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var bLeftLine = Bodies.rectangle(473, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var bLetter = Matter.Body.create({
        parts: [bInnerTop, bInnerBot, bOuterTop, bOuterBot, bLeftLine],
    });

// ----------------------------------------------------------------------------------------
    
    // R
    var rOuterTop = Bodies.rectangle(560, 50, 100, 85, {
        chamfer: { radius: [0, 40, 40, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var rInnerTop = Bodies.rectangle(560, 50, 50, 40, {
        chamfer: { radius: [0, 20, 20, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var rLeftLine = Bodies.rectangle(533, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var rLeg = Bodies.fromVertices(558, 113, [
        {x: 0, y: 22},
        {x: 100, y: 139},
        {x: 100, y: 163},
        {x: 65, y: 163},
        {x: 0, y: 87},
        ], {
            render: { opacity: 0.5 },
        }
    );
    var rLetter = Matter.Body.create({
        parts: [rOuterTop, rLeg, rInnerTop, rLeftLine],
    });

// ----------------------------------------------------------------------------------------

    // A
    var aOuter = Bodies.polygon(800, 20, 3, 87, {
        angle: -0.52,
        render: { opacity: 0.5 },
    });

    var aInner = Bodies.polygon(800, 65, 3, 60, {
        angle: -0.52,
        render: { opacity: 0.5 },
    })

    var aBottom = Bodies.polygon(800, 20, 3, 35, {
        angle: -0.52,
        render: { opacity: 0.5 },
    })

    var aLetter = Matter.Body.create({
        parts: [aOuter, aInner, aBottom],
    })

// ----------------------------------------------------------------------------------------

    var nLeftLine = Bodies.rectangle(900, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var nRightLine = Bodies.rectangle(1000, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var nBigTriangle = Bodies.fromVertices(927, 120, [
        {x: 0, y: 0},
        {x: 140, y: 155},
        {x: 0, y: 155},
        ], {
            render: { opacity: 0.5 },
        }
    );
    var nSmallTriangle = Bodies.fromVertices(935, 147, [
        {x: 0, y: 0},
        {x: 70, y: 75},
        {x: 0, y: 75},
        ], {
            render: { opacity: 0.5},
        }
    );

    var nLetter = Matter.Body.create({
        parts: [nLeftLine, nRightLine, nBigTriangle, nSmallTriangle],
    })


    // D
    var dOuter = Bodies.rectangle(1300, 90, 120, 165, {
        chamfer: { radius: [0, 80, 80, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var dInner = Bodies.rectangle(1300, 90, 70, 100, {
        chamfer: { radius: [0, 50, 50, 0] },
        render: {
            opacity: 0.5,
        }
    });
    var dBot = Bodies.rectangle(1300, 163, 110, 20, {
        render: {
            visible: false  ,
            opacity: 0.5,
        }
    });


    var dLetter = Matter.Body.create({
        parts: [dOuter, dBot, dInner],
    })

    // N

    var nLeftLine2 = Bodies.rectangle(1600, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var nRightLine2 = Bodies.rectangle(1700, 90, 40, 163, {
        render: {
            opacity: 0.5,
        }
    });
    var nBigTriangle2 = Bodies.fromVertices(1627, 120, [
        {x: 0, y: 0},
        {x: 140, y: 155},
        {x: 0, y: 155},
        ], {
            render: { opacity: 0.5 },
        }
    );
    var nSmallTriangle2 = Bodies.fromVertices(1635, 147, [
        {x: 0, y: 0},
        {x: 70, y: 75},
        {x: 0, y: 75},
        ], {
            render: { opacity: 0.5},
        }
    );

    var nLetter2 = Matter.Body.create({
        parts: [nLeftLine2, nRightLine2, nBigTriangle2, nSmallTriangle2],
    })




    return ({
        bLetter: bLetter,
        rLetter: rLetter,
        aLetter: aLetter,
        nLetter: nLetter,
        dLetter: dLetter,
        nLetter2: nLetter2,
    })
}

export default Letters;