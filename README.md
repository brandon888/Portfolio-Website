<h1 align="center">
  Portfolio Website
</h1>

A visual introduction to myself and a showcase of previous work created using ReactJS and MatterJS

## Features

### Matter.js
Used this JavaScript physics engine to render objects (Letters, Floors, Constraints, etc...) <br>
Used Matter engine event handlers to handle user interaction (Keyboard input w/ arrow keys)

### React
Used React hooks (useState, useEffect, useRef) for several purposes, including integrating the Matter engine with React and aligning the positioning of DOM elements with movement in the Matter render camera.

## To-Do
- [x] Adding page indicators
- [ ] Perfect responsiveness
- [ ] Allowing upward movement
- [ ] Finish 'Work Experience' Page
- [ ] Finish 'About Me' Page
- [ ] Add contact buttons (email, Github, etc...)

## Idea
Main page:
  Floor is rotatable
   - Moving the cursor rotates the ground
   - Leave main page after 7 seconds if not click

"Project" and "Work experience" buttons tilt the ground to either side and slides into the page (translate digonally)