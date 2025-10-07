// Get references to all the HTML elements we need to interact with
const robot1Input = document.getElementById('robot1-input');
const robot2Input = document.getElementById('robot2-input');
const raceBtn = document.getElementById('race-btn');
const gameBoard = document.getElementById('game-board');
const robot1 = document.getElementById('robot1');
const robot2 = document.getElementById('robot2');
const resultArea = document.getElementById('result-area');

// Add a click event listener to the "Race!" button
raceBtn.addEventListener('click', startGame);
function startGame() {
    // 1. Reset the game board and results
    resultArea.textContent = 'The LCM is... ?';
    robot1.style.transform = 'translateX(-30px)';
    robot2.style.transform = 'translateX(-30px)';
    gameBoard.innerHTML = '';

    // 2. Get and validate the numbers
    const num1 = parseInt(robot1Input.value);
    const num2 = parseInt(robot2Input.value);
    if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1 || num1 > 25) {
        resultArea.textContent = 'Please enter numbers between 1 and 25.';
        return;
    }

    // 3. THIS IS THE NEW PART: Calculate a dynamic track length
    const calculatedLimit = num1 * num2;
    // We'll add a small buffer and cap it at 200 to keep the game running smoothly.
    const trackLimit = Math.min(calculatedLimit + 10, 200);

    // 4. Draw the track using our new dynamic limit
    for (let i = 1; i <= trackLimit; i++) {
        const square = document.createElement('div');
        square.classList.add('track-square');
        square.textContent = i;
        gameBoard.appendChild(square);
    }
    
    gameBoard.appendChild(robot1);
    gameBoard.appendChild(robot2);

    // 5. Run the race!
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
            // Use transform for movement
            robot1.style.transform = `translateX(${pixelPosition}px)`;
            gameBoard.scrollLeft = pixelPosition - 100;

            if (robot2Stops.includes(multiple)) {
                resultArea.textContent = `The LCM is ${multiple}!`;
                // Use transform for the final position fix
                robot2.style.transform = `translateX(${pixelPosition}px)`;
                clearInterval(raceInterval);
            }
        }
        // Move Robot 2
        else { 
            const multiple = (turn / 2) * num2;
            robot2Stops.push(multiple);

            const pixelPosition = multiple * 60 - 30;
            // Use transform for movement
            robot2.style.transform = `translateX(${pixelPosition}px)`;
            gameBoard.scrollLeft = pixelPosition - 100;

            if (robot1Stops.includes(multiple)) {
                resultArea.textContent = `The LCM is ${multiple}!`;
                // Use transform for the final position fix
                robot1.style.transform = `translateX(${pixelPosition}px)`;
                clearInterval(raceInterval);
            }
        }
    }, 1000); 
}