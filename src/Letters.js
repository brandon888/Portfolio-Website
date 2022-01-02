import Matter, { Body } from 'matter-js';

const Letters = (props) => {
    var Bodies = Matter.Bodies;

    var bOuterTop = Bodies.rectangle(500, 50, 100, 85, {
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
        render: {
            fillStyle: 'black',
        }
    });

    return ({
        bLetter: bLetter,
    })
}

export default Letters;