//hi
function mousePressed() {
      if (mouseButton === LEFT) {
        if (points.length < 3) {
            // Add first two points normally
            points.push({x: mouseX, y: mouseY});
        } else {
            // Ensure smooth transition: Set last lerp point as first
            points[0] = {...points[2]};  // Keep final point of last curve
            points[1] = {x: mouseX, y: mouseY};  // New selected second point
            points.splice(2, 1); // New selected third point
        }

        t = 0;
        console.log(points);
        gamelPoints = null;
    }
}

/*
function mousePressed() {
    if (mouseButton === LEFT) {
        if (points.length < 3) {
            // Add up to 3 points
            points.push({x: mouseX, y: mouseY});
        } else {
            // Shift points: third becomes first, fourth becomes second
            points[0] = points[1];
            points[1] = points[2];
            points[2] = {x: mouseX, y: mouseY};
        }

        t = 0;
        console.log(points);
        gamelPoints = null;
        background(200, 200, 200);
    }
}


function mousePressed() {
    if (mouseButton === LEFT) {
        if (points.length < 3) {
            points.push({x: mouseX, y: mouseY});
        } else {
            // Transition smoothly: maintain last direction
            let lastPoint = points[2]; 
            let midPoint = {
                x: lerp(points[1].x, lastPoint.x, 0.5), 
                y: lerp(points[1].y, lastPoint.y, 0.5)
            };

            points[0] = points[1]; // Preserve second point as new first
            points[1] = midPoint;  // Make the transition smoother
            points[2] = {x: mouseX, y: mouseY}; // Set the new clicked point
        }

        t = 0;
        console.log(points);
        gamelPoints = null;
        background(200, 200, 200);
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        if (points.length < 2) {
            // Add first two points normally
            points.push({x: mouseX, y: mouseY});
        } else {
            // Ensure smooth transition: Set last lerp point as first
            points[0] = {...points[2]};  // Keep final point of last curve
            points[1] = {x: mouseX, y: mouseY};  // New selected second point
            points[2] = {x: mouseX, y: mouseY};  // New selected third point
        }

        t = 0;
        console.log(points);
        gamelPoints = null;
        background(200, 200, 200);
    }
}
*/