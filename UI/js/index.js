
// capturing all red flags and interventions
let redFlags = document.getElementsByClassName('red-flag');
let interventions = document.getElementsByClassName('intervention');

// Add event listener for red flag hover
for (let i = 0; i < redFlags.length; i++){
	redFlags[i].addEventListener('mouseenter', handleIncidentHover);
	redFlags[i].addEventListener('mouseleave', handleIncidentMouseLeave);

    // handle click event
    redFlags[i].addEventListener('click', handleIncidentClick);
}
// Add event listener for intervention hover
for (let i = 0; i < interventions.length; i++){
	interventions[i].addEventListener('mouseenter', handleIncidentHover);
	interventions[i].addEventListener('mouseleave', handleIncidentMouseLeave);

    // handle click event
    interventions[i].addEventListener('click', handleIncidentClick);
}

// sample red-flag data
const redFlagData = [
    {title: 'Police Bribery', location:'13 Ikorodu Road, Lagos',
     imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'
    },
    {title: 'Corrupted Jugde', location:'65, kanku street, Lagos',
     imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
    {title: 'Corrupted Teacher', location:'105, Ulateju street, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
    {title: 'funds misappropriation', location:'18, Ilepeju , Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
    {title: 'nepotism', location:'16, Ulateju street, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
]; 

// sample intervention data
const interventionData = [
    {title: 'Bridge collapse', location:'19 Ikorodu Road, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'
    },
    {title: 'Flooding', location:'45, kanku street, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
    {title: 'Bad road', location:'15, Ulateju street, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'
    },
    {title: 'water shortage', location:'18, Ilepeju , Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
    {title: 'Blackout', location:'16, Ulateju street, Lagos',
    imgUrl:'../img/fancycrave.jpg', createdAt: '10/11/2018',
     createBy:'Thierno-ss', status: 'under inquiry'},
]; 

function handleIncidentHover (event){

	let hoveredElement = event.target;
	// capture the name of the clicked element and extract the number;
	let hoveredElementId = parseInt(event.target.id.slice(-1));
	
	// match id to indexes of sample data array
	let currentId = hoveredElementId - 1;

	// capturing the computed style of the current element
	currentStyles = window.getComputedStyle(hoveredElement, null);

	let top = currentStyles.getPropertyValue('top');
	let left = currentStyles.getPropertyValue('left');

	// Create a div
	let div = document.createElement('div');
	// create h3
	let h3 = document.createElement('h3');
	// create h5
	let h5 = document.createElement('h5');

	// Adding div attributes
	if (hoveredElement.id.startsWith('red')){
		div.setAttribute('class', 'red-flag-summary');
		h3.textContent = redFlagData[currentId].title;
	    h5.textContent = redFlagData[currentId].location;
	}else{
		div.setAttribute('class', 'intervention-summary');
		h3.textContent = interventionData[currentId].title;
	    h5.textContent = interventionData[currentId].location;
	}
	
    // Add created element to the div
    div.appendChild(h3);
    div.appendChild(h5);

    // insert the div after the clicked element
    hoveredElement.parentNode.insertBefore(div, hoveredElement);

    // make the flag transparent so detail can be read properly
    hoveredElement.style.opacity = 0.3;

    // Add some styling
    div.style.position = 'absolute';
    
    // setting position for the newly created div
    divTop = parseInt(top) - 30;
    divLeft = parseInt(left);

    div.style.top = divTop + 'px';
    div.style.left = divLeft + 'px';

    // extend the width of the red-flag so that it can fit the 
    // size of the summary card
    hoveredElement.style.width = '5%';

    // remove animations
    removeClass('.red-flag', 'animate-icon');
    removeClass('.intervention', 'animate-icon');
	
}


// handle mouseleave
function handleIncidentMouseLeave(event){
    let parentSummaryCard = document.querySelector('.map');
    let summaryCard;

    // capture the clicked element
    let hoveredElement = event.target;

    if (hoveredElement.id.startsWith('red')){
    	summaryCard = document.querySelector('.red-flag-summary');
    }else{
    	summaryCard = document.querySelector('.intervention-summary');
    }

    // removing the summary card from the dom
	parentSummaryCard.removeChild(summaryCard);

	// restore the opacity of the the clicked element
	hoveredElement.style.opacity = 1;

	// Add animation
	addClass('.red-flag', 'animate-icon');
    addClass('.intervention', 'animate-icon');
}

// Handling user-profile toggle 
let avatar = document.querySelector('.avatar');

let userCard = document.querySelector('.user-card');

avatar.addEventListener('click', handleToggleUserCard);

// handle toggle user card
function handleToggleUserCard(){
    userCard.style.visibility = 'visible';
}

userCard.addEventListener('mouseenter', function(){
	userCard.style.visibility = 'visible';
});

userCard.addEventListener('mouseleave', function(){
	userCard.style.visibility = 'hidden';
});

// handle detail 
   let overlay = document.querySelector('#overlay');
   let detailCard = document.querySelector('.incident-detail-card');
   let close = document.querySelector('.close-button');
   close.addEventListener('click', handleCloseClick);  

// Handle click 
function handleIncidentClick(event){

    // add blue color on top of the document
    overlay.style.visibility = 'visible';

    // show the detail-page
    detailCard.style.visibility = 'visible';

}

// handle close
function handleCloseClick(){
    overlay.style.visibility = 'hidden';
    detailCard.style.visibility = 'hidden';
}

// helper functions

// add css class
function addClass(selector, myClass) {

  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // add class to all chosen elements
  for (let i=0; i<elements.length; i++) {
    elements[i].classList.add(myClass);
  }
}

// remove css class
function removeClass(selector, myClass) {

  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // remove class from all chosen elements
  for (let i=0; i<elements.length; i++) {
    elements[i].classList.remove(myClass);
  }
}
