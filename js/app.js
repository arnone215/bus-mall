'use strict';

let myProducts = [];
let allowedVotes = 25;
let clicks = 0;
let renderQueue = [];
let myContainer = document.getElementById('container');
let imgOneEl = document.getElementById('image-one');
let imgTwoEl = document.getElementById('image-two');
let imgThreeEl = document.getElementById('image-three');
let myList = document.getElementById('list');

function Products(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  myProducts.push(this);
}

new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep');
new Products('tauntaun');
new Products('unicorn');
new Products('usb');

// functions
function getRandomProductIndex() {
  return Math.floor(Math.random() * myProducts.length);
}


function populateRenderQueue() {
  renderQueue = [];
  while (renderQueue.length < 3) {
    var uniqueProduct = getRandomProductIndex();
    while (!renderQueue.includes(uniqueProduct)) {
      renderQueue.push(uniqueProduct);
    }
  }
}

function imageProperties(imgEl, prod) {
  imgEl.src = myProducts[prod].src;
  imgEl.alt = myProducts[prod].name;
  myProducts[prod].views++;
}

function renderMyProducts() {
  populateRenderQueue();
  var productOne = renderQueue[0];
  var productTwo = renderQueue[1];
  var productThree = renderQueue[2];

  imageProperties(imgOneEl, productOne);
  imageProperties(imgTwoEl, productTwo);
  imageProperties(imgThreeEl, productThree);
}

function renderResults() {
  for (var i = 0; i < myProducts.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${myProducts[i].name} had ${myProducts[i].votes} votes, and was seen ${myProducts[i].views} times.`;
    myList.appendChild(li);
  }
}

renderMyProducts(); // gives us initial images

function handleClick(event) {
  var clickedProduct = event.target.alt;
  if (clickedProduct) {
    clicks++;

    for (var i = 0; i < myProducts.length; i++) {
      if (clickedProduct === myProducts[i].name) {
        myProducts[i].votes++;
      }
    }

    renderMyProducts(); // gives us the images after each click/vote
    if (clicks === allowedVotes) {
      myContainer.removeEventListener('click', handleClick);

      renderResults();
      // renders our results in a list
    }
  } else {
    alert('click on an image!');
  }
}
function handleListClick(event) {
  if (clicks === allowedVotes) {
    renderResults();
  }
}

// event listener
myContainer.addEventListener('click', handleClick);
myList.addEventListener('click', handleListClick);
