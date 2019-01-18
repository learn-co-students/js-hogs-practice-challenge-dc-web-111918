document.addEventListener('DOMContentLoaded', function(){
  getAllHogs()
  initHogForm()

})

function weight(){
  return "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"
}

function medal(){
  return "highest medal achieved"
}

// getElements
function hogContainer(){
  return document.querySelector('#hog-container')
}

function hogForm(){
  return document.querySelector('#hog-form')
}

//fetches
function getAllHogs() {
  fetch('http://localhost:3000/hogs')
  .then(res => res.json())
  .then(hogs => {
    hogs.forEach(hog => renderHog(hog))
  })
}

function renderHog(hog){
  let hogCard = document.createElement('div')
    hogCard.classList.add('hog-card')
    hogCard.id = `hog-card-${hog.id}`
      let hogName = document.createElement('h1')
        hogName.innerText = hog.name
        hogCard.appendChild(hogName)
      let hogSpecialty = document.createElement('p')
        hogSpecialty.innerText = `Specialty: ${hog.specialty}`
        hogCard.appendChild(hogSpecialty)
      let hogWeightRatio = document.createElement('p')
        hogWeightRatio.innerText = `Hog Weight Ratio: ${hog[weight()]}`
        hogCard.appendChild(hogWeightRatio)
      let hogMedal = document.createElement('p')
        hogMedal.innerText = hog[medal()]
        hogCard.appendChild(hogMedal)
      let hogImage = document.createElement('img')
        hogImage.src = hog.image
        hogImage.classList.add("hog-image")
        hogCard.appendChild(hogImage)
      let hogBoxDiv = document.createElement('p')
        hogBoxDiv.innerText = "greased: "
        let hogGreasedBox = document.createElement('INPUT')
          hogGreasedBox.setAttribute("type", "checkbox")
          hogGreasedBox.id = `hog-box-${hog.id}`
          hogGreasedBox.checked = (hog.greased)
          hogGreasedBox.name = "greased"
          hogGreasedBox.value = hog.greased
          hogGreasedBox.addEventListener('click', (e) => handleGreasedBox(hog))
        hogBoxDiv.appendChild(hogGreasedBox)
        hogCard.appendChild(hogBoxDiv)
      let deleteHogBtnDiv = document.createElement('div')
        let deleteHogBtn = document.createElement('button')
          deleteHogBtn.innerText = 'DELETE'
          deleteHogBtn.addEventListener('click', (e)=>{handleDeleteHogBtn(hog)})
        deleteHogBtnDiv.appendChild(deleteHogBtn)
      hogCard.appendChild(deleteHogBtnDiv)

  hogContainer().appendChild(hogCard)
}

function handleDeleteHogBtn(hog){
  fetch(`http://localhost:3000/hogs/${hog.id}`,{
    method: "DELETE"
  })
  .then(r => r.json())
  .then(delHog => document.querySelector(`#hog-card-${hog.id}`).remove()
  )
}

function handleGreasedBox(hog){
  let hogGreasedBox = document.querySelector(`#hog-box-${hog.id}`)
  let data={
    "greased": hogGreasedBox.checked
  }
  fetch(`http://localhost:3000/hogs/${hog.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

function initHogForm(){
  hogForm().addEventListener('submit', handleHogForm)
}

function handleHogForm(e){
  e.preventDefault()
  let data = {
    "name": document.querySelector('#name').value,
    "specialty": document.querySelector('#specialty').value,
    "greased": document.querySelector('#greased').checked,
    "image": document.querySelector('#image').value
  }
  data[weight()] = document.querySelector('#weight').value
  data[medal()] = document.querySelector('#medal').value
  fetch('http://localhost:3000/hogs', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(newHog => {
    renderHog(newHog)
  })
}
