// selectors
const personInput = document.querySelector('.person-input');
const addPersonButton = document.querySelector('.add-person-button');
const personList = document.querySelector('.person-list');
const randomButton = document.querySelector('.randomize-button');
const resetButton = document.querySelector('.reset-button');
const teamList = document.querySelector('.teams-list');
//const teamAmount = document.querySelector('.amount-selector');

const teamAmount = document.querySelector('.count');

const incButton = document.querySelector('.plus');
const decButton = document.querySelector('.minus');

// event listeners
addPersonButton.addEventListener('click', addPerson);
personList.addEventListener('click', deletePerson);
randomButton.addEventListener('click', randomizeTeams);
resetButton.addEventListener('click', resetTeams);
incButton.addEventListener('click', incrementTeam);
decButton.addEventListener('click', decrementTeam);

// functions
function addPerson(e) {
	// prevent form from submitting
	e.preventDefault();
	// person div
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');
    // create li
    const newPerson = document.createElement('li');
    newPerson.innerText = personInput.value;
    newPerson.classList.add('person-item');
	personDiv.appendChild(newPerson);
	// check trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	personDiv.appendChild(trashButton);
	// append to list
    personList.appendChild(personDiv);
    // clear todo input value
    personInput.value = "";
}

function deletePerson(event) {
    const item = event.target;
    // delete person
    if (item.classList[0] === 'trash-btn') {
        const person = item.parentElement;
        // animation
        person.classList.add('fall');
        //removeLocalTodos(todo);
        person.addEventListener('transitionend', function() {
            person.remove();
        })
    }

    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function randomizeTeams(e) {
	const teams = teamList.getElementsByTagName('div');
	if (teams.length != 0) {
		resetTeams();
	}

	const teamNumber = parseInt(teamAmount.value);
	if (teamNumber >= 1 && teamNumber <= 10) {
		generateTeams(teamNumber);
	} else {
		console.log('Team amount out of range');
	}

	let people = [].slice.call(document.getElementById('persons').getElementsByTagName('li'));
	shuffleArray(people);

	const peopleTotal = people.length;

	let teamPick = 0;
	for (j=0; j<peopleTotal; j++) {

		//let peopleLeft = people.length;
		//let randomIndex = Math.floor(Math.random() * Math.floor(peopleLeft));

		const teamMember = document.createElement('p');
		teamMember.innerText = people[0].innerText;
		teamMember.classList.add('team-member');
		teams.item(teamPick).appendChild(teamMember);

		people.splice(0,1);

		teamPick += 1;
		if (teamPick === teams.length) {
			teamPick = 0;
		}
	}
}

function resetTeams() {
	teamList.innerHTML = "";
}

function generateTeams(num) {
	for (i=0; i<num; i++) {
		const teamDiv = document.createElement('div');
		teamDiv.classList.add('team');
		
		const teamTitle = document.createElement('h3');
		teamTitle.innerText = `Team ${i+1}`;
    	teamTitle.classList.add('team-title');
		teamDiv.appendChild(teamTitle);

		teamList.appendChild(teamDiv);
	}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function incrementTeam() {
	let curValue = parseInt(teamAmount.value);
	if (curValue != 10) {
		teamAmount.value = String(curValue += 1);
	}
}

function decrementTeam() {
	let curValue = parseInt(teamAmount.value);
	if (curValue != 1) {
		teamAmount.value = String(curValue -= 1);
	}
}