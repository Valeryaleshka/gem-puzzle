let arrayOfNumbers = [];
let grid = 4;
let moves = 0;
let min = 0;
let sec = 0;
let timerStart = false;
let z;

// eslint-disable-next-line prefer-const
let savedGame = {
  savedMoves: 0,
  array: [],
  minutes: 0,
  seconds: 0,
  grids: 0,
};

class BestScores {
  constructor(timeScore, nameScore, movesScore) {
    this.timeScore = timeScore;
    this.nameScore = nameScore;
    this.movesScore = movesScore;
  }
}

function time() {
  timerStart = true;
  setTimeout(function run() {
    if (timerStart) {
      sec++;
      document.querySelector('#min').innerHTML = min;
      document.querySelector('#sec').innerHTML = sec;
      if (sec === 60) {
        min++;
        sec = 0;
      }
      setTimeout(run, 1000);
    }
  }, 1000);
}

function check() {
  if (!timerStart) {
    time();
  }
  const all = document.querySelectorAll('.drop');
  let bool = true;

  for (let i = 1; i < all.length - 1; i++) {
    if ((+all[i - 1].innerHTML + 1) !== (+all[i].innerHTML)) {
      bool = false;
    }
  }
  if (bool) {
    timerStart = false;
    document.querySelector('.winner').classList.add('menu_clicked');
    document.querySelector('#winner_time').innerHTML = (`${min}:${sec}`);
    document.querySelector('#winner_moves').innerHTML = moves;
  }
}

function checkBlank() {
  document.querySelector('#moves').innerHTML = moves;

  document.querySelectorAll('.drop').forEach((e) => {
    e.classList.remove('blank');
    if (e.innerHTML === '') {
      e.classList.add('blank');
    }
  });
  moves++;
}

function playMusic() {
  const audio = new Audio();

  audio.src = './assets/tik.mp3';
  audio.volume = 0.1;
  audio.play();
  setTimeout(() => {
    audio.remove();
  }, 1000);
}

function playMusicDrop() {
  const audio = new Audio();

  audio.src = './assets/drop.mp3';
  audio.volume = 0.1;
  audio.play();
  setTimeout(() => {
    audio.remove();
  }, 1000);
}

function getDrop() {
  document.querySelectorAll('.drop').forEach((e) => {
    e.draggable = true;

    e.addEventListener('click', () => {
      const blank = document.querySelector('.blank');
      if (+blank.id.slice(1) === +e.id.slice(1) + 1) {
        z = e.innerHTML;
        e.innerHTML = blank.innerHTML;
        blank.innerHTML = z;
        blank.animate([
          { transform: 'translateX(-100%)' },
          { transform: 'translateX(0)' },
        ], {
          // timing options
          duration: 150,
        });
        check();
        checkBlank();
        playMusic();
      }
      if (+blank.id.slice(1) === +e.id.slice(1) - 1) {
        z = e.innerHTML;
        e.innerHTML = blank.innerHTML;
        blank.innerHTML = z;
        blank.animate([
          { transform: 'translateX(100%)' },
          { transform: 'translateX(0)' },
        ], {
          // timing options
          duration: 150,
        });
        check();
        checkBlank();
        playMusic();
      }
      if (+blank.id.slice(1) === +e.id.slice(1) + 10) {
        z = e.innerHTML;
        e.innerHTML = blank.innerHTML;
        blank.innerHTML = z;
        blank.animate([
          { transform: 'translateY(-100%)' },
          { transform: 'translateY(0)' },
        ], {
          // timing options
          duration: 150,
        });
        check();
        checkBlank();
        playMusic();
      }
      if (+blank.id.slice(1) === +e.id.slice(1) - 10) {
        z = e.innerHTML;
        e.innerHTML = blank.innerHTML;
        blank.innerHTML = z;
        blank.animate([
          { transform: 'translateY(100%)' },
          { transform: 'translateY(0)' },
        ], {
          // timing options
          duration: 150,
        });
        check();
        checkBlank();
        playMusic();
      }
    });

    e.ondragstart = (event) => {
      if (event.target.innerHTML !== '') {
        event.dataTransfer.setData('id', event.target.id);
      }
    };
    e.ondragover = (event) => {
      if (event.target.innerHTML === '') {
        event.preventDefault();
      }
    };
    e.ondrop = (event) => {
      const evented = event;
      const v = evented.target.innerHTML;
      const temp = evented.target;
      const fromEl = document.querySelector(`#${event.dataTransfer.getData('id')}`);

      if (+temp.id.slice(1) === +fromEl.id.slice(1) + 10) {
        evented.target.innerHTML = fromEl.innerHTML;
        fromEl.innerHTML = v;
        check();
        checkBlank();
        playMusicDrop();
      }
      if (+temp.id.slice(1) === +fromEl.id.slice(1) + 1) {
        evented.target.innerHTML = fromEl.innerHTML;
        fromEl.innerHTML = v;
        check();
        checkBlank();
        playMusicDrop();
      }
      if (+temp.id.slice(1) === +fromEl.id.slice(1) - 1) {
        evented.target.innerHTML = fromEl.innerHTML;
        fromEl.innerHTML = v;
        check();
        checkBlank();
        playMusicDrop();
      }
      if (+temp.id.slice(1) === +fromEl.id.slice(1) - 10) {
        evented.target.innerHTML = fromEl.innerHTML;
        fromEl.innerHTML = v;
        check();
        checkBlank();
        playMusicDrop();
      }
    };
  });
}

function topScore() {
  const saveGameJson = JSON.stringify(savedGame);
  localStorage.setItem('savedGame', saveGameJson);
}

function saveResult() {
  const best10 = new BestScores(`${min}:${sec}`, document.querySelector('#winner_name').value, moves - 1);
  const topTen = JSON.parse(localStorage.getItem('top'));
  topTen.push(best10);
  topTen.sort((obj1, obj2) => obj1.movesScore - obj2.movesScore);
  topTen.pop();
  const saveGameJson = JSON.stringify(topTen);
  localStorage.setItem('top', saveGameJson);
  document.querySelector('.winner').classList.remove('menu_clicked');
  setTimeout(() => {
    document.querySelector('.topTen').classList.add('menu_clicked');
  }, 1000);
  document.querySelector('body > div.topTen > div').innerHTML = '';
  document.querySelector('body > div.topTen > div').insertAdjacentHTML('beforeend', '<table></table>');
  document.querySelector('body > div.topTen > div > table').insertAdjacentHTML('beforeend', '<tr><td>Position</td><td>Name</td><td>Moves</td><td>Time</td></tr></>');

  let count = 1;

  topTen.forEach((elem) => {
    document.querySelector('body > div.topTen > div > table').insertAdjacentHTML('beforeend', `<tr><td>${count}</td><td>${elem.nameScore}</td><td>${elem.movesScore}</td><td>${elem.timeScore}</td></tr></>`);
    count++;
  });
}

function menu() {
  document.querySelector('.menu').classList.add('menu_clicked');
}

function addInnerHtml() {
  let count = 0;
  document.querySelectorAll('.drop').forEach((e) => {
    if (arrayOfNumbers[count] === 0) {
      e.innerHTML = '';
      count++;
    } else {
      e.innerHTML = arrayOfNumbers[count];
      count++;
    }
  });
}

function createTable() {
  let elementId = 1;
  let countId = 1;

  for (let i = 0; i < grid * grid; i++) {
    if (countId > grid) {
      countId %= grid;
      elementId = elementId - grid + 10;
    }
    document.querySelector('body > div.drop_list').insertAdjacentHTML('beforeend', `<div id="a${elementId}" class="drop drop${grid}"></div>`);
    countId++;
    elementId++;
  }
}

function loadSavesGame() {
  if (localStorage.getItem('savedGame')) {
    document.querySelector('.menu').classList.remove('menu_clicked');
    const returnObj = JSON.parse(localStorage.getItem('savedGame'));
    arrayOfNumbers = [];
    returnObj.array.forEach((item) => arrayOfNumbers.push(+item));
    min = returnObj.minutes;
    sec = returnObj.seconds;
    moves = returnObj.savedMoves;
    grid = returnObj.grid;
    document.querySelector('body > div.drop_list').innerHTML = '';
    createTable();
    addInnerHtml();
    checkBlank();
    getDrop();
  } else {
    // eslint-disable-next-line no-alert
    alert('Нету сохраненной игры');
  }
}

function initArrayOfNumbers() {
  const arrayHasNumberBeenUsed = new Array(grid * grid);
  for (let i = 0; i < grid * grid; i++) {
    arrayHasNumberBeenUsed[i] = 0;
  }
  for (let i = 0; i < grid * grid; i++) {
    // If our random numer is unique, add it to the board.
    const random = Math.floor(Math.random() * grid * grid);
    if (arrayHasNumberBeenUsed[random] === 0) {
      arrayHasNumberBeenUsed[random] = 1;
      arrayOfNumbers.push(random);
    } else {
      i -= 1;
    }
  }
}

function init() {
  document.body.insertAdjacentHTML('beforeEnd', '<div class="drop_list"></div>');
  document.body.insertAdjacentHTML('beforeEnd', '<div class="winner">  <div class="inner">    <p>      Well dine, you finished in <span id="winner_time"></span> sec and      <span id="winner_moves"></span>      moves      <input id="winner_name" type="text" placeholder="Enter your name" />    </p>    <button id="saveResult">Save Result</button>  </div></div>');
  document.body.insertAdjacentHTML('beforeEnd', '<div class="topTen">  <div class="inner"></div></div>');
  document.body.insertAdjacentHTML('afterbegin',
    '<header>'
  + '<div>'
    + 'Time'
    + '<div id="min"></div>'
    + '<div id="sec"></div>'
  + '</div>'
  + '<div>'
    + 'Moves'
    + '<div id="moves"></div>'
  + '</div>'
  + '<button type="button" id="menu">Menu</button>'
+ '</header>');

  document.body.insertAdjacentHTML('beforebegin', ' <div class="menu">'
  + '<div class="inner">'
    + '<div class="buttons" id="back">Back to Game</div>'
   + '<div class="buttons" id="restart">New Game</div>'
    + '<div class="buttons" id="saveGame">Save</div>'
    + '<div class="buttons" id="loadGame">Load Game</div>'
    + '<div class="buttons" id="getBestScore">Best Scores</div>'
    + '<div class="buttons" id="getField">'
      + 'Field'
      + '<select>'
        + '<option value="3">3x3</option>'
        + '<option selected value="4">4x4</option>'
        + '<option value="5">5x5</option>'
        + '<option value="6">6x6</option>'
        + '<option value="7">7x7</option>'
        + '<option value="8">8x8</option>'
      + '</select>'
    + '</div>'
  + '</div>'
+ '</div>');

  document.querySelector('#menu').addEventListener('click', menu);
  document.querySelector('#saveResult').addEventListener('click', saveResult);

  createTable();
  if (!localStorage.getItem('top')) {
    const topTen = [];
    for (let i = 0; i < 10; i++) {
      topTen.push(new BestScores(0, 'None', 10000));
    }
    const saveGameJson = JSON.stringify(topTen);
    localStorage.setItem('top', saveGameJson);
  }
  document.querySelector('#back').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('menu_clicked');
  });

  document.querySelector('#loadGame').addEventListener('click', () => {
    loadSavesGame();
    addInnerHtml();
    checkBlank();
  });

  function changeGrid() {
    grid = document.querySelector('#getField > select').value;
  }

  document.querySelector('#getField > select').onchange = changeGrid;

  document.querySelector('#restart').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('menu_clicked');
    moves = 0;
    min = 0;
    sec = 0;
    arrayOfNumbers = [];
    timerStart = false;
    document.querySelector('#sec').innerHTML = sec;
    document.querySelector('#min').innerHTML = min;
    document.querySelector('body > div.drop_list').innerHTML = '';
    createTable();
    initArrayOfNumbers();
    addInnerHtml();
    checkBlank();
    getDrop();
  });

  document.querySelector('#saveGame').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('menu_clicked');
    savedGame.minutes = min;
    savedGame.seconds = sec;
    savedGame.grid = grid;
    savedGame.savedMoves = moves;
    savedGame.array = [];
    document.querySelectorAll('.drop').forEach((item) => savedGame.array.push(item.innerHTML));
    const saveGameJson = JSON.stringify(savedGame);

    localStorage.setItem('savedGame', saveGameJson);
  });

  document.querySelector('#getBestScore').addEventListener('click', () => {
    document.querySelector('.topTen').classList.add('menu_clicked');
    document.querySelector('body > div.topTen > div').innerHTML = '';
    document.querySelector('body > div.topTen > div').insertAdjacentHTML('beforeend', '<table></table>');
    document.querySelector('body > div.topTen > div > table').insertAdjacentHTML('beforeend', '<tr><td>Position</td><td>Name</td><td>Moves</td><td>Time</td></tr></>');

    const topTen = JSON.parse(localStorage.getItem('top'));
    let count = 1;

    topTen.forEach((elem) => {
      document.querySelector('body > div.topTen > div > table').insertAdjacentHTML('beforeend', `<tr><td>${count}</td><td>${elem.nameScore}</td><td>${elem.movesScore}</td><td>${elem.timeScore}</td></tr></>`);
      count++;
    });
  });
  document.querySelector('body > div.topTen').addEventListener('click', () => {
    document.querySelector('body > div.topTen').classList.remove('menu_clicked');
  });

  document.querySelector('#min').innerHTML = min;
  document.querySelector('#sec').innerHTML = sec;

  getDrop();

  initArrayOfNumbers();
  addInnerHtml();
  checkBlank();
}

init();
