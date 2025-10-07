// Get references to all the HTML elements
const robot1Input = document.getElementById('robot1-input');
const robot2Input = document.getElementById('robot2-input');
const raceBtn = document.getElementById('race-btn');
const gameBoard = document.getElementById('game-board');
const robot1 = document.getElementById('robot1');
const robot2 = document.getElementById('robot2');
const resultArea = document.getElementById('result-area');

// A new, reusable function to draw the track
function drawTrack(limit) {
    gameBoard.innerHTML = ''; // Clear the board first
    for (let i = 1; i <= limit; i++) {
        const square = document.createElement('div');
        square.classList.add('track-square');
        square.textContent = i;
        gameBoard.appendChild(square);
    }
    // Add the robots and their names back to the board
    gameBoard.appendChild(robot1);
    gameBoard.appendChild(robot2);
    // Note: The names are already in the HTML, we just need to re-add the robots
}

function startGame() {
    // 1. Reset the result text and robot positions to the new starting line
    resultArea.textContent = 'The LCM is... ?';
    robot1.style.transform = 'translateX(5px)';
    robot2.style.transform = 'translateX(5px)';

    // 2. Get and validate the numbers
    const num1 = parseInt(robot1Input.value);
    const num2 = parseInt(robot2Input.value);
    if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1 || num1 > 25) {
        resultArea.textContent = 'Please enter numbers between 1 and 25.';
        return;
    }

    // 3. Calculate the dynamic track length and redraw the track
    const calculatedLimit = num1 * num2;
    const trackLimit = Math.min(calculatedLimit + 10, 200);
    drawTrack(trackLimit); // Redraw the track to the correct size for the race

    // 4. Run the race!
    runRace(num1, num2);
}

function runRace(num1, num2) {
    let turn = 0;
    const robot1Stops = [];
    const robot2Stops = [];
    
    const raceInterval = setInterval(() => {
        turn++;

        // Move Robot 1
        if (turn % 2 !== 0) { 
            const multiple = (Math.ceil(turn / 2)) * num1;
            robot1Stops.push(multiple);
            const pixelPosition = multiple * 60 - 30;
            robot1.style.transform = `translateX(${pixelPosition}px)`;
            gameBoard.scrollLeft = pixelPosition - 100;

            if (robot2Stops.includes(multiple)) {
                resultArea.textContent = `The LCM is ${multiple}!`;
                robot2.style.transform = `translateX(${pixelPosition}px)`;
                clearInterval(raceInterval);
            }
        }
        // Move Robot 2
        else { 
            const multiple = (turn / 2) * num2;
            robot2Stops.push(multiple);
            const pixelPosition = multiple * 60 - 30;
            robot2.style.transform = `translateX(${pixelPosition}px)`;
            gameBoard.scrollLeft = pixelPosition - 100;

            if (robot1Stops.includes(multiple)) {
                resultArea.textContent = `The LCM is ${multiple}!`;
                robot1.style.transform = `translateX(${pixelPosition}px)`;
                clearInterval(raceInterval);
            }
        }
    }, 1000); 
}

// --- INITIAL SETUP ---
// This runs once when the page loads to draw a default track
drawTrack(30);
raceBtn.addEventListener('click', startGame);

// We need to re-add the name divs after the first drawTrack
const robot1Name = document.getElementById('robot1-name');
const robot2Name = document.getElementById('robot2-name');
gameBoard.appendChild(robot1Name);
gameBoard.appendChild(robot2Name);