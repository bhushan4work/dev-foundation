let currentMode = "multicolor";  //default mode

function createGrid(size) { //creates size * size squares & appends them to #container
  const container = document.querySelector('#container');
  container.innerHTML = '';  //clear any existing squares

  const containerSize = container.clientWidth; //960(or whatever is taken by css)
  const squareSize = Math.floor(containerSize / size); //integer pixel size

  //total squares = size * size
  for(let r = 0; r < size * size; r++){
    const square = document.createElement('div'); //<div></div>
    square.classList.add('square'); //adds the CSS class named 'square' to the HTML element
    
    square.dataset.darkness = "0"; //0=no dark(white) ,10=fully black

    //set width & height in px so flex will wrap correctly
    square.style.width = square.style.height = `${squareSize}px`;

    // quick hover paint: change color when mouse enters
    square.addEventListener('mouseenter', () => {
        if(currentMode === "multicolor"){
        square.style.backgroundColor = getRandomColor(); //paints in multicolor
        } 
        else if(currentMode === "darken"){
        darkenSquare(square); //paints darker gradually
        }
    });
    container.appendChild(square);
  }
}

createGrid(16);  //initially grid remains 16x16

const btn = document.querySelector('#resizeBtn');
btn.addEventListener('click', () => {
  let input = prompt('Enter number of squares per side (1–100):');

  if (input === null) return; //If user clicks "Cancel"

  const size = Number(input);

  // basic validation
  if (Number.isNaN(size) || size < 1 || size > 100) {
    alert('Please enter a valid number between 1 and 100.');
    return;
  }
  createGrid(size);   //rebuilds grid with new size
});


const multicolorBtn = document.querySelector('#multicolorBtn');
const darkenBtn = document.querySelector('#darkenBtn');
const clearBtn = document.querySelector('#clearBtn');

multicolorBtn.addEventListener('click', () => {
  currentMode = "multicolor";
  clearGridColors(); //clears the grid or resets it to default white
});
darkenBtn.addEventListener('click', () => {
  currentMode = "darken";
  clearGridColors(); //clears the grid or resets it to default white
});
clearBtn.addEventListener('click', () => {
  clearGridColors();
});



function getRandomColor() {
  return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
}

function darkenSquare(square) {
  let amount = Number(square.dataset.darkness) || 0;   //read level
  if (amount < 10) {
    amount++;      //darken by 1 step
    square.dataset.darkness = amount;   // store new level
  }
  // calculate new color
  const darknessPercent = amount * 10;  // 0%, 10%, 20% ... 100%
  const value = 255 - Math.floor((darknessPercent / 100) * 255);
  square.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
}

function clearGridColors() {
    const squares = document.querySelectorAll('.square'); //selects all squares

    squares.forEach(square => {
    square.style.backgroundColor = 'white'; //resets color
    square.dataset.darkness = "0";  //resets darken mode memory to use it again from scratch when needed
  });
}

