import '../App.css';
import { useState, useEffect } from 'react';
import { Composite, Bodies } from 'matter-js'

const ProjectScene = (screen) => {
  var projectComposite = Composite.create();

  var projectGround = Bodies.rectangle(screen.w * 0.8, screen.h * 0.9, screen.w / 2, screen.h / 4, {
    isStatic: true,
    collisionFilter: {
      group: -3
    }
  });

  Composite.add(projectComposite, projectGround);

  return projectComposite;
}

export default ProjectScene;
