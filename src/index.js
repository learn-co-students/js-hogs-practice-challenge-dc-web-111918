document.addEventListener('DOMContentLoaded',()=>{
  loadHogs()
})

function loadHogs(){
  fetch('http://localhost:3000/hogs')
  .then(response=>(response.json()))
  .then(hogs=>{
    hogs.forEach(hog=>{
      displayHog(hog)
    })
  })
}

function displayHog(hog){
  let hogContainer = document.querySelector('#hog-container')
  let hogDiv = document.createElement('div')
  hogContainer.appendChild(hogDiv)

  //Name
  let hogName = document.createElement('h2')
  hogName.innerText = hog.name
  hogDiv.appendChild(hogName)
  //Specialty
  let hogSpecialty = document.createElement('li')
  hogSpecialty.innerText = `Specialty: ${hog.specialty}`
  hogDiv.appendChild(hogSpecialty)
  //Medal
  let hogMedal = document.createElement('li')
  hogMedal.innerText = `Medal: ${hog['highest medal achieved']}`
  hogDiv.appendChild(hogMedal)
  //Weight
  let hogWeight = document.createElement('li')
  hogWeight.innerText = `Weight: ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`
  hogDiv.appendChild(hogWeight)
  //Img
  let hogImg = document.createElement('img')
  hogImg.src = hog.image
  hogDiv.appendChild(hogImg)
  let space = document.createElement('br')
  hogDiv.appendChild(space)
  //delete
  let greased = document.createElement('input');
  greased.type = "checkbox";
  greased.name = "name";
  greased.value = "value";
  greased.id = `greased-${hog.id}`;
  greased.classList.add('greased')
  if(hog.greased){
  greased.checked=true;
  }
  greased.addEventListener("change",checkboxClickEdit)

  let label = document.createElement('label')
  label.htmlFor = "greased-id";
  label.appendChild(document.createTextNode('Greased'));

  hogDiv.appendChild(greased);
  hogDiv.appendChild(label);
  //break
  let spaceAgain = document.createElement('br')
  hogDiv.appendChild(spaceAgain)

  //delete
  let deleteButton = document.createElement('button')
  deleteButton.innerText = `Delete ${hog.name}`
  deleteButton.id= hog.id
  hogDiv.appendChild(deleteButton)
  deleteButton.addEventListener('click',onClickDelete)

}

document.querySelector('form').addEventListener('submit',e=>{
  e.preventDefault()
  postNewHog()
  e.target.reset()
})

function postNewHog(){
  let name = document.querySelector('input[name]').value
  let specialty = document.querySelector('input[name=specialty]').value
  let medal = document.querySelector('input[name=medal]').value
  let weight = document.querySelector('input[name=weight]').value
  let image = document.querySelector('input[name=img]').value
  let greased = document.querySelector('input[name=greased]').checked

  fetch('http://localhost:3000/hogs',{
    method: 'POST',
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json",
    },
    body: JSON.stringify({
      name: name,
      specialty: specialty,
      greased: greased,
      image: image,
      "highest medal achieved": medal,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight
    })
  })
  .then(response=>response.json())
  .then(hog=>{
    displayHog(hog)
  })
}


function onClickDelete(e){
  let hogId = e.currentTarget.id
  deleteHog(hogId)
}

function deleteHog(hogId){
  fetch(`http://localhost:3000/hogs/${hogId}`,{
    method: 'DELETE',
  })
  .then(response=>response.json())
  .then(()=>{
    document.querySelector(`button[id="${hogId}"]`).parentElement.remove()
  })
}

function checkboxClickEdit(e){
  let greased = e.currentTarget.checked
  let hogId = e.currentTarget.id.split('-')[1]
  editHog(greased,hogId)
}

function editHog(greased,hogId){
  fetch(`http://localhost:3000/hogs/${hogId}`,{
    method: "PATCH",
    headers:{
      "Content-Type" : "application/json",
      "Accepts" : "application/json"
    },
    body: JSON.stringify({
      greased: greased
    })
  })
  .then(res=> res.json())
}



/*make the checkbox work so you can grease/ungrease each hog at will.
this should persist in the database as well*/
//=>Patch
