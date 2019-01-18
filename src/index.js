document.addEventListener('DOMContentLoaded', function(){
	console.log('Connected')
	getAllHogs();

	const form = document.querySelector('form')
	form.addEventListener('submit', onSubmitForm)

})

function onSubmitForm(e){
	e.preventDefault();
	postNewHog();
	e.target.reset();
}

function getAllHogs(){
	fetch('http://localhost:3000/hogs')
		.then(res => res.json())
		.then(hogs => {
			// console.log(hogs)
			hogs.forEach(hog => {
				renderHog(hog)

			})
		})
}

function renderHog(hog){
	
	const hogContainer = document.querySelector('#hog-container')
	const hogCard = document.createElement('div')
	hogCard.classList.add('hog-card')
	hogCard.id = `hog-${hog.id}`
	hogContainer.appendChild(hogCard)

	const hogName = document.createElement('h2')
	hogName.innerText = hog.name
	hogCard.appendChild(hogName)

	const image = document.createElement('img')
	image.classList.add('hog-avatar')
	image.src = hog.image
	hogCard.appendChild(image)

	const hogSpecialty = document.createElement('h3')
	hogSpecialty.innerText = hog.specialty
	hogCard.appendChild(hogSpecialty)

	const hogMedal = document.createElement('h5')
	hogMedal.innerText = `highest medal achieved: ${hog['highest medal achieved']}` 
	hogCard.appendChild(hogMedal)

	const hogWeight = document.createElement('h5')
	hogWeight.innerText = `weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water : ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`
	hogCard.appendChild(hogWeight)

	const hogGreased = document.createElement('p')
	hogGreased.innerText = 'greased'
	hogCard.appendChild(hogGreased)

	const hogCheckbox = document.createElement('INPUT')
	hogCheckbox.setAttribute('type', 'checkbox')
	hogCheckbox.id = `hog-check-${hog.id}`
	if (hog.greased === true){
		hogCheckbox.checked = true
	} else {
		hogCheckbox.checkbox = false
	}
	hogGreased.appendChild(hogCheckbox)

	hogCheckbox.addEventListener('click', function(){
		greased(hog);
	})

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete-btn')
	deleteBtn.innerText = 'Delete'
	hogCard.appendChild(deleteBtn)

	deleteBtn.addEventListener('click', function(){
		deleteHog(hog);
	})
}


function postNewHog(hog){
	const name = document.querySelector('input[name="name"]').value;
	const specialty = document.querySelector('input[name="specialty"]').value;
	const medal = document.querySelector('input[name="medal"]').value;
	const weight = document.querySelector('input[name="weight"]').value;
	const img_url = document.querySelector('input[name="img"]').value;
	const checkBox = document.querySelector('input[type=checkbox]').checked;


	
	fetch('http://localhost:3000/hogs', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify({
			name: name,
			specialty: specialty,
			'highest medal achieved': medal,
			'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
			image: img_url,
			greased: checkBox
		})
	}).then(res => res.json())
	.then(hog => { 
		
		renderHog(hog)
	})
}

function deleteHog(hog){
	fetch(`http://localhost:3000/hogs/${hog.id}`, {
		method: 'DELETE'
	}).then(res => res.json())
	.then(() => {
		document.querySelector(`#hog-${hog.id}`).remove()
	})
}

function greased(hog){
	let checkbox = document.getElementById(`hog-check-${hog.id}`)
	
	let data = {'greased': checkbox.checked }

	fetch(`http://localhost:3000/hogs/${hog.id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify(data)
		})
}









