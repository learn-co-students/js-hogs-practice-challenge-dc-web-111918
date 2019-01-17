document.addEventListener('DOMContentLoaded', () =>{
  displayHogs()
  getSubmitButton().addEventListener('click', handleSubmitButton)
})

HOGS_URL = 'http://localhost:3000/hogs'

  // FETCH REQUESTS
function getAllHogs() {
  return fetch(HOGS_URL)
}

function updateHog(hogId, data) {
  return fetch(`${HOGS_URL}/${hogId}`, {
    method: 'PATCH',
    headers:
      {
          'Content-Type' : 'application/json',
          Accept : 'application/json'
      },
    body: JSON.stringify(data)
  })
}

function createHog(data) {
  return fetch(HOGS_URL, {
    method: 'POST',
    headers:
      {
        'Content-Type' : 'application/json',
        Accept : 'application/json'
      },
    body: JSON.stringify(data)
  })
}

function deleteHog(hogId) {
  return fetch(`${HOGS_URL}/${hogId}`, {
    method: 'DELETE'
  })
}

  // GET DOM ELEMENTS
function getHogContainer() {
  return document.querySelector('#hog-container')
}

function getForm() {
  return document.querySelector('#hog-form')
}

function getFormCheckbox() {
  return document.querySelector('#hog-form span input')
}

function getCheckBoxValue(hogId) {
  return document.querySelector(`[data-hog-id='${hogId}']`)
}

function getSubmitButton(hogObj) {
  return document.querySelector('#submit-button')
}

  // RENDER DOM ELEMENTS
function renderHogCard(hogObj) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('hog-card')
  cardDiv.dataset.hogCardId = hogObj.id

  const nameP = document.createElement('h2')
  nameP.innerText = hogObj.name

  const specialtyP = document.createElement('h3')
  specialtyP.innerText = hogObj.specialty

  const imageTag = document.createElement('img')
  imageTag.src = hogObj.image
  imageTag.classList.add('hog-avatar')

  const weightTag = document.createElement('h4')
  weightTag.innerText = `Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${hogObj['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`

  const highestMedalTag = document.createElement('h4')
  highestMedalTag.innerText = `Highest Medal Achieved: ${hogObj['highest medal achieved']}`

  // CHECKBOX
  const checkBoxLabel = document.createElement('label')
  checkBoxLabel.innerText = `Greased:`
  const greasedCheckBox = document.createElement('input')
  greasedCheckBox.setAttribute('type', 'checkbox')
  greasedCheckBox.checked = hogObj.greased
  greasedCheckBox.dataset.hogId = hogObj.id
  greasedCheckBox.addEventListener('click', () => handleCheckBox(hogObj))

  const deleteDiv = document.createElement('div')
  const deleteHogButton = document.createElement('button')
  deleteHogButton.innerText = 'Delete'
  deleteHogButton.addEventListener('click', () => handleDeleteButton(hogObj))

  checkBoxLabel.appendChild(greasedCheckBox)
  deleteDiv.appendChild(deleteHogButton)

  cardDiv.appendChild(nameP)
  cardDiv.appendChild(imageTag)
  cardDiv.appendChild(specialtyP)
  cardDiv.appendChild(weightTag)
  cardDiv.appendChild(highestMedalTag)
  cardDiv.appendChild(checkBoxLabel)
  cardDiv.appendChild(deleteDiv)
  getHogContainer().appendChild(cardDiv)
 }

  // DISPLAY DOM ELEMENTS
function displayHogs() {
  getAllHogs()
  .then(res => res.json())
  .then(hogs => {
    hogs.forEach(hogObj => renderHogCard(hogObj))
  })
}

  // EVENT HANDLERS
function handleCheckBox(hogObj) {
  const isGreased = getCheckBoxValue(hogObj.id).checked
  const data = {greased: isGreased}
  updateHog(hogObj.id, data)
}

function handleSubmitButton(event) {
  event.preventDefault()
  const nameData = getForm().name.value
  const specialtyData = getForm().specialty.value
  const medalData = getForm().medal.value
  const weightData = getForm().weight.value
  const imgUrlData = getForm().img.value
  const checkBoxData = getFormCheckbox().checked


  data = {name: nameData, specialty: specialtyData, 'highest medal achieved': medalData, 'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weightData, image: imgUrlData, greased: checkBoxData}

  createHog(data)
  .then(res => res.json())
  .then(createdHog => renderHogCard(createdHog))
  getForm().reset()
}

function handleDeleteButton(hogObj) {
  deleteHog(hogObj.id)
  .then(res => res.json())
  .then(() => {
    document.querySelector(`[data-hog-card-id='${hogObj.id}']`).remove()
    })
}
