
// capturing all red flags and interventions
let redFlags = document.getElementsByClassName('red-flag');
let interventions = document.getElementsByClassName('intervention');

// Add event listener for red flag hover
for (let i = 0; i < redFlags.length; i++){
	redFlags[i].addEventListener('mouseenter', handleRedflagClick);
	redFlags[i].addEventListener('mouseleave', handleRedflagMouseLeave);
}

// Add event listener for intervention hover
for (let i = 0; i < interventions.length; i++){
	interventions[i].addEventListener('mouseenter', handleRedflagClick);
	interventions[i].addEventListener('mouseleave', handleRedflagMouseLeave);
}

// sample red-flag data
const redFlagData = [
    {title: 'Police Bribery', location:'13 Ikorodu Road, Lagos'},
    {title: 'Corrupted Jugde', location:'65, kanku street, Lagos'},
    {title: 'Corrupted Teacher', location:'105, Ulateju street, Lagos'},
    {title: 'funds misappropriation', location:'18, Ilepeju , Lagos '},
    {title: 'nepotism', location:'16, Ulateju street, Lagos'},
]; 

// sample intervention data
const interventionData = [
    {title: 'Bridge collapse', location:'19 Ikorodu Road, Lagos'},
    {title: 'Flooding', location:'45, kanku street, Lagos'},
    {title: 'Bad road', location:'15, Ulateju street, Lagos'},
    {title: 'water shortage', location:'18, Ilepeju , Lagos '},
    {title: 'Blackout', location:'16, Ulateju street, Lagos'},
]; 

function handleRedflagClick (event){

	let clickedElement = event.target;
	// capture the name of the clicked element and extract the number;
	let clickedElementId = parseInt(event.target.id.slice(-1));
	
	// match id to indexes of sample data array
	let currentId = clickedElementId - 1;

	// capturing the computed style of the current element
	currentStyles = window.getComputedStyle(clickedElement, null);

	let top = currentStyles.getPropertyValue('top');
	let left = currentStyles.getPropertyValue('left');

	// Create a div
	let div = document.createElement('div');
	// create h3
	let h3 = document.createElement('h3');
	// create h5
	let h5 = document.createElement('h5');

	// Adding div attributes
	if (clickedElement.id.startsWith('red')){
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
    clickedElement.parentNode.insertBefore(div, clickedElement);

    // make the flag transparent so detail can be read properly
    clickedElement.style.opacity = 0.3;

    // Add some styling
    div.style.position = 'absolute';
    
    // setting position for the newly created div
    divTop = parseInt(top) - 30;
    divLeft = parseInt(left);

    div.style.top = divTop + 'px';
    div.style.left = divLeft + 'px';

    // extend the width of the red-flag so that it can fit the 
    // size of the summary card
    clickedElement.style.width = '5%';
	
}

function handleRedflagMouseLeave(event){
    let parentSummaryCard = document.querySelector('.map');
    let summaryCard;

    // capture the clicked element
    let clickedElement = event.target;

    if (clickedElement.id.startsWith('red')){
    	summaryCard = document.querySelector('.red-flag-summary');
    }else{
    	summaryCard = document.querySelector('.intervention-summary');
    }

    // removing the summary card from the dom
	parentSummaryCard.removeChild(summaryCard);

	// restore the opacity of the the clicked element
	clickedElement.style.opacity = 1;
}

// Handling user-profile toggle 
let avatar = document.querySelector('.avatar');

let userCard = document.querySelector('.user-card');

avatar.addEventListener('click', handleToggleUserCard);

function handleToggleUserCard(){
    userCard.style.visibility = 'visible';
}

userCard.addEventListener('mouseenter', function(){
	userCard.style.visibility = 'visible';
});

userCard.addEventListener('mouseleave', function(){
	userCard.style.visibility = 'hidden';
});