class Hog {
  constructor(hogData){
    this.id = hogData.id;
    this.name = hogData.name;
    this.specialty = hogData.specialty;
    this.greased = hogData.greased;
    this.medal = hogData['highest medal achieved'];
    this.weight = hogData['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'];
    this.image = hogData.image;
    //Hog.all.push(this)
  }

  element(){
      const div = document.createElement('div');
      div.id = `hog-card-${this.id}`;
      div.classList = "hog-card";

      const pName = document.createElement('p');
      pName.innerText = `Name: ${this.name}`;
      div.appendChild(pName);

      const pSpecialty = document.createElement('p');
      pSpecialty.innerText = `Specialty: ${this.specialty}`;
      div.appendChild(pSpecialty);

      const titleSpan = document.createElement('span');
      const checkboxSpan = document.createElement('span');
      const checkbox = document.createElement('input');
      checkboxSpan.appendChild(checkbox);
      titleSpan.innerText = "Greased: "
      checkbox.type = "checkbox";
      checkbox.checked = this.greased;
      checkbox.dataset.id = this.id;
      div.appendChild(titleSpan);
      div.appendChild(checkboxSpan);
      checkbox.addEventListener('change', HogController.updateGrease);

      const pMedal = document.createElement('p');
      pMedal.innerText = `Medal: ${this.medal}`;
      div.appendChild(pMedal);

      const pWeight = document.createElement('p');
      pWeight.innerText = `Weight Ratio: ${this.weight}`;
      div.appendChild(pWeight);

      const img = document.createElement('img');
      img.src = this.image;
      div.appendChild(img);

      const pButton = document.createElement('p');
      const button = document.createElement('button');
      pButton.appendChild(button);
      button.innerText = "Delete Me!";
      button.dataset.id = this.id;
      div.appendChild(pButton);
      button.addEventListener('click', HogController.deletePig);

      return div;
  }
}
