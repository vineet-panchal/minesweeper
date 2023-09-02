document.addEventListener('DOMContentLoaded', () => {
// setting up dom event listener, all of html is loaded before

    const grid = document.querySelector('.grid');
    // creating a variable for the grid using a query selector

    const flagsLeft = document.querySelector('#flags-left');
    const result = document.querySelector('#result');
    // creating variables called from the html document for result and flags-left

    let width = 20;
    // width of grid will be 20 squares

    let bombAmount = 99;
    // amount of bombs in the game

    let flags = 0;
    // initializing flags variable

    let squares = []
    // creating an array of squares

    let isGameOver = false;
    // initializing boolean to false for gameOver
    // needed for to check the state of the game to perform different functions

    // creating the board
    function createBoard() {
        flagsLeft.innerHTML = bombAmount
        // update flags number to the number of bombs

        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        // initializing arrays for the bombs(99) and the empty squares(301) 

        const gameArray = emptyArray.concat(bombsArray);
        // initializing a game array that combines both bomb and empty arrays

        const shuffledArray = gameArray.sort(() => Math.random() -0.5);
        // initialzing a shuffled array that shuffles the game array

        for(let i = 0; i < width * width; i++) {
        // create for 400 squares

            const square = document.createElement('div');
            // setting square varibale to create 400 divs

            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);
            // pushing all the squares made to the html with an unique id

            square.addEventListener('click', function(e) {
            // setting up an event listener when a square is clicked
                click(square);
                // square clicked
            })

            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
                // adding flag on a square
            }
        }

        // adding the numbers in each valid square
        for (let i = 0; i < squares.length; i++) {
        // loop for until counter reaches lenth of 400 squares

            let total = 0;
            // setting total for each square

            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width -1);
            // variables to check for each row

            if (squares[i].classList.contains('valid')) {
            // checking the count for each scenario of squares for each empty square

                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
                if (i > 19 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
                if (i > 20 && squares[i -width].classList.contains('bomb')) total ++
                if (i > 21 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
                if (i < 398 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
                if (i < 390 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
                if (i < 388 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
                if (i < 389 && squares[i +width].classList.contains('bomb')) total ++
                squares[i].setAttribute('data', total)
                // algorithm for adding numbers in each case of the grid
                // adding it to the total
            }
        }
    }

    createBoard();
    // calling the createBoard function

    function addFlag(square) {
    // function for adding flags onto squares

        if (isGameOver) return
        // if gameOver is false, return: 

        if (!square.classList.contains('checked') && (flags < bombAmount)) {

            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '   🚩'
                flags ++
                flagsLeft.innerHTML = bombAmount- flags
                checkForWin()
                // add a flag to a square
            } 

            else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags --
                flagsLeft.innerHTML = bombAmount- flags
                // remove a flag
            }
        }
    }

    function click(square) {
    // function for different square actions

        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total !=0) {
                square.classList.add('checked')
                if (total == 1) square.classList.add('one')
                if (total == 2) square.classList.add('two')
                if (total == 3) square.classList.add('three')
                if (total == 4) square.classList.add('four')
                if (total == 5) square.classList.add('five')
                if (total == 6) square.classList.add('six')
                if (total == 7) square.classList.add('seven')
                if (total == 8) square.classList.add('eight')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')

    }
    
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1)
    
        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 19 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 20) {
                const newId = squares[parseInt(currentId -width)].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 21 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 398 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 390 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 388 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 389) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 20)
    }

    function gameOver(square) {
    // function for if the user lost

        result.innerHTML = 'Game Over!'
        isGameOver = true
        // print results and initialize boolean
    
        //show ALL the bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '  💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }

    function checkForWin() {
    // function for the user won

        let matches = 0
    
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches ++
            }
            if (matches === bombAmount) {
                result.innerHTML = 'You Win!'
                isGameOver = true
                // show results and initialize boolean
            }
        }
    }
})