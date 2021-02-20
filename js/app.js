'use strict';

// create some objects
// will have an array of objects, and randomly display 3 on page
// we will track our clicks
// when we hit 10 clicks, remove event listener - close polls
// when polls have closed, we render the results
// results: name of the object, number of times it was viewed, and the number of times voted



//global variables
var myProducts = [];
var allowedVotes = 25;
var clicks = 0;
var renderQueue = [];
var myContainer = document.getElementById('container');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
var imgThreeEl = document.getElementById('image-three');
var myList = document.getElementById('list');

// constructor
function Products(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  myProducts.push(this);
}

// functions
function getRandomProductIndex() {
  return Math.floor(Math.random() * myProducts.length);
}

// executable code
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

  // while (productOne === productTwo) {
  //   productTwo = getRandomProductIndex();
  // }
  imageProperties(imgOneEl, productOne);
  imageProperties(imgTwoEl, productTwo);
  imageProperties(imgThreeEl, productThree);
}

function renderResults() {
  for (var i = 0; i < myProducts.length; i++) {
    // create element
    var li = document.createElement('li');
    // give it content
    li.textContent = `${myProducts[i].name} had ${myProducts[i].votes} votes, and was seen ${myProducts[i].views} times.`;
    //append it to the dom
    myList.appendChild(li);
  }
}

renderMyProducts(); // gives us initial images


// event handler - takes one parameter: event or often 'e'
function handleClick(event) {
  // this grabs the image alt property - which is the same as the product name property
  var clickedProduct = event.target.alt;
  if (clickedProduct) {
    console.log(clickedProduct);

    clicks++;

    for (var i = 0; i < myProducts.length; i++) {
      // we are looking at ALL the name properties inside the product array and comparing them to our image alt property
      if (clickedProduct === myProducts[i].name) {
        // if true, we KNOW we have the correct product object and we can increment its votes.
        myProducts[i].votes++;
      }
    }

    renderMyProducts(); // gives us the images after each click/vote

    if (clicks === allowedVotes) {
      // remove event listener takes parameters; event, and the call back function.
      myContainer.removeEventListener('click', handleClick);

      renderResults();
      // renders our results in a list
    }
  } else {
    alert('click on an image!');
  }
}

// event listener
myContainer.addEventListener('click', handleClick);
