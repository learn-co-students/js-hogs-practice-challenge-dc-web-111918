document.addEventListener('DOMContentLoaded', () => {
  displayAllHogs();

  newHogForm().addEventListener('submit', handleNewHogSubmit);
})



// Get DOM Elements //
function hogsContainerDiv() {
  return document.getElementById('hog-container')
}

function newHogForm() {
  return document.getElementById('hog-form')
}

function newHogName() {
  return document.getElementById('new-hog-name')
}

function newHogSpecialty() {
  return document.getElementById('new-hog-specialty')
}

function newHogMedal() {
  return document.getElementById('new-hog-medal')
}

function newHogWeight() {
  return document.getElementById('new-hog-weight')
}

function newHogImg() {
  return document.getElementById('new-hog-img')
}

function newHogGreased() {
  return document.getElementById('new-hog-greased').checked
}

function hogCheckbox(hogObj) {
  return document.getElementById(`hog-${hogObj.id}-checkbox`)
}



// Fetch Requests //
function getAllHogs() {
  return fetch('http://localhost:3000/hogs')
}

function createNewHog(newHogObj) {
  const data = newHogObj
  return fetch('http://localhost:3000/hogs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
}

function deleteHog(hogId) {
  return fetch(`http://localhost:3000/hogs/${hogId}`, {
    method: 'DELETE'
  })
}

function updateHogGreasedAttribute(hogObj) {
  const data = {greased: hogCheckbox(hogObj).checked}
  return fetch(`http://localhost:3000/hogs/${hogObj.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
}



// HTML Creation Functions //
function renderHogOnContainerDiv(hogObj) {
  const div = document.createElement('div')
  div.classList.add('hog-card')
  div.id = `hog-${hogObj.id}`

  const h2 = document.createElement('h2')
  h2.innerText = hogObj.name

  const img = document.createElement('img')
  img.src = hogObj.image

  const specialtyH4 = document.createElement('h4')
  specialtyH4.innerText = `Specialty: ${hogObj.specialty}`

  const medalH4 = document.createElement('h4')
  medalH4.innerText = `Highest medal achieved: ${hogObj["highest medal achieved"]}`

  const weightH4 = document.createElement('h4')
  weightH4.innerText = `Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${hogObj["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`

  const checkboxDiv = document.createElement('div')
  const checkboxLabel = document.createElement('label')
  checkboxLabel.innerText = 'Greased: '
  const checkbox = document.createElement("input");
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = `hog-${hogObj.id}-checkbox`;
  checkbox.checked = hogObj.greased

  checkbox.addEventListener('click', () => updateHogGreasedAttribute(hogObj));

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete Hog";
  // deleteBtn.dataset.deleteHogId = hogObj.id;
  deleteBtn.addEventListener('click', () => handleDeleteHog(hogObj));

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(specialtyH4)
  div.appendChild(medalH4)
  div.appendChild(weightH4)
  div.appendChild(checkbox)

  checkboxLabel.appendChild(checkbox)
  checkboxDiv.appendChild(checkboxLabel)
  div.appendChild(checkboxDiv)

  div.appendChild(deleteBtn)

  hogsContainerDiv().appendChild(div)
}



// Event Handlers //
function displayAllHogs() {
  getAllHogs()
    .then(r => r.json())
    .then(hogs => {
      hogs.forEach(hog => renderHogOnContainerDiv(hog))
    })
}

function handleNewHogSubmit(e) {
  e.preventDefault();
  //construct new hog obj from user input
  const newHog = {
    name: newHogName().value,
    specialty: newHogSpecialty().value,
    greased: newHogGreased(),
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": newHogWeight().value,
    "highest medal achieved": newHogMedal().value,
    "image": newHogImg().value
  }

  createNewHog(newHog)
    .then(r => r.json())
    .then(newHogObj => renderHogOnContainerDiv(newHogObj))

  newHogForm().reset();
}

function handleDeleteHog(hogObj) {
  deleteHog(hogObj.id)
    .then(r => r.json())
    .then(() => {
      // console.log(hogObj)
      // debugger
      document.getElementById(`hog-${hogObj.id}`).remove()
  })
}
