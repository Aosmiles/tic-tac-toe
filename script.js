
//get player choice for mark assign it to player object
const controlBtns = document.querySelectorAll('.controls__btn-mark')


const game = function () {
  let playerMark = 'X' // initialize mark to X
  let computerMark = 'O'
  let grid = document.querySelectorAll('.game__btn');
  const turn = function() {
    const player = 0
    const computer = 1
    return {player, computer}
  }();
  
  let currentTurn = turn.player
  
  function start() {
    setupGrid()
    computerMark = playerMark === 'X' ? 'O' : 'X'
    computerTakeTurn()
  }

  function gameOver() {
    grid.forEach(btn => btn.classList.add('disabled'))
  }

  function highlightWinner(track) {
    track.forEach(sqr => sqr.classList.add('winner'))
  }

  function checkForWinner() {
    
    const row1 = [grid[0], grid[1], grid[2]]
    const row2 = [grid[3], grid[4], grid[5]]
    const row3 = [grid[6], grid[7], grid[8]]
    
    const col1 = [grid[0], grid[3], grid[6]]
    const col2 = [grid[1], grid[4], grid[7]]
    const col3 = [grid[2], grid[5], grid[8]]
    
    const diag1 = [grid[0], grid[4], grid[8]]
    const diag2 = [grid[6], grid[4], grid[2]]
    
    switch(true){
      case grid[0].innerText !== '.' && row1.every(mark => mark.innerText === grid[0].innerText):
        console.log(`winner is ${grid[0].innerText}`)
        highlightWinner(row1)
        return true
      case grid[3].innerText !== '.' && row2.every(mark => mark.innerText === grid[3].innerText):
        console.log(`winner is ${grid[3].innerText}`)
        highlightWinner(row2)
        return true
      case grid[6].innerText !== '.' && row3.every(mark => mark.innerText === grid[6].innerText):
        console.log(`winner is ${grid[6].innerText}`)
        highlightWinner(row3)
        return true
      case grid[0].innerText !== '.' && col1.every(mark => mark.innerText === grid[0].innerText):
        console.log(`winner is ${grid[0].innerText}`)
        highlightWinner(col1)
        return true
      case grid[1].innerText !== '.' && col2.every(mark => mark.innerText === grid[1].innerText):
        console.log(`winner is ${grid[1].innerText}`)
        highlightWinner(col2)
        return true
      case grid[2].innerText !== '.' && col3.every(mark => mark.innerText === grid[2].innerText):
        console.log(`winner is ${grid[2].innerText}`)
        highlightWinner(col3)
        return true
      case grid[0].innerText !== '.' && diag1.every(mark => mark.innerText === grid[0].innerText):
        console.log(`winner is ${grid[0].innerText}`)
        highlightWinner(diag1)
        return true
      case grid[6].innerText !== '.' && diag2.every(mark => mark.innerText === grid[6].innerText):
        console.log(`winner is ${grid[6].innerText}`)
        highlightWinner(diag2)
        return true
    }
    
    return false
  }

  function computerTakeTurn() {
    currentTurn = turn.computer
    let spaces = Array.from(grid).filter(btn => btn.innerText === '.')
    let mark = spaces[Math.floor(Math.random() * spaces.length)]
    mark.innerText = computerMark;
    if (!checkForWinner()){
      currentTurn = turn.player
    } else {
      gameOver()
    }
  }

  function takeTurn(e) {
    if (currentTurn === turn.player){
      if (e.target.innerText === '.' && !e.target.classList.contains('disabled')) {
        e.target.innerText = playerMark
        if(!checkForWinner()){
          computerTakeTurn()
        } else {
          gameOver()
        }
      }
    }
  }

  function setupGrid() {
    grid.forEach((btn) => {
      btn.innerText = '.'
      btn.classList.remove('disabled')
      btn.classList.remove('winner')
      btn.addEventListener('click', takeTurn)
    })
  }

  function resetGame(e) {
    playerMark = e.target.innerText
    controlBtns.forEach(btn => btn.classList.remove('current-mark'))
    e.target.classList.add('current-mark')
    console.log(playerMark)
    start()
  }
  return {start, resetGame}
}();

//start game once player has chosen a mark

game.start()
controlBtns.forEach(btn => btn.addEventListener('click', game.resetGame))
document.querySelector('.controls__btn-reset').addEventListener('click', game.start)



