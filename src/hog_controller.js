class HogController {
  static init(){
      HogController.fetchHogs().
      then(HogController.renderHogs);
      HogController.newHogButtonEventListener();
  };

  static fetchHogs(){
    return fetch('http://localhost:3000/hogs')
    .then(res => res.json());
  };

  static renderHogs(hogsData){
    hogsData.forEach(HogController.renderHog);
  };

  static renderHog(hogData){
    const hogContainer = document.getElementById("hog-container");
    const newHog = new Hog(hogData);
    hogContainer.append(newHog.element());
  };

  static updateGrease(event){
    const hogData = {
      id: event.target.dataset.id,
      greased: event.target.checked
    };
    HogController.modifyHog(hogData);
  };

  static modifyHog(hogData){
    return fetch(`http://localhost:3000/hogs/${hogData.id}`,
      {
        method: "PATCH",
        headers:
          {
            "content-type":"application/json",
            accept: "application/json"
          },
          body: JSON.stringify(hogData)
      }
    );
  };

  static deletePig(event){
    return fetch(`http://localhost:3000/hogs/${event.target.dataset.id}`,
      { method: "DELETE"}).then(data => {
          let idToDelete = data.url.match(/\d+$/)[0];
          let elementToDelete = document.getElementById(`hog-card-${idToDelete}`);
          elementToDelete.parentNode.removeChild(elementToDelete);
      });

  };

  static createNewPig(hogData){
    return fetch(`http://localhost:3000/hogs`,
      {
        method: "POST",
        headers:
          {
            "content-type":"application/json",
            accept: "application/json"
          },
          body: JSON.stringify(hogData)
      })
  };

  static newHogButtonEventListener(){
    let hogForm = document.getElementById('hog-form');
    hogForm.addEventListener("submit",function(event){
        let hogData = HogController.getHogFormData();
        HogController.createNewPig(hogData)
        .then(res => res.json())
        .then(data => {});
    });
  };

  static getHogFormData(){
    return {
          "name": document.getElementById("hog-form-name").value,
          "specialty": document.getElementById("hog-form-specialty").value,
          "greased": document.getElementById("hog-form-greased").checked,
          "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": document.getElementById("hog-form-weight").value,
          "highest medal achieved": document.getElementById("hog-form-medal").value,
          "image": document.getElementById("hog-form-img").value
        };
  };



};
