window.onload = () => {
  let testEntityAdded = false;

  const el = document.querySelector("[gps-new-camera]");

  el.addEventListener("gps-camera-update-position", e => {
      if(!testEntityAdded) {
          alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
          // Add a box to the north of the initial GPS position
          const entity = document.createElement("a-box");
          entity.setAttribute("scale", {
              x: 20, 
              y: 20,
              z: 20
          });
          // entity.setAttribute('material', { color: 'red' } );
          entity.setAttribute('src', 'https://previews.123rf.com/images/giamportone/giamportone1711/giamportone171100568/90514900-gps-%EC%9C%84%EC%B9%98-%EB%A7%88%EC%BB%A4-%EC%9C%84%EC%B9%98-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%A7%80%EB%8F%84-%ED%95%80-%EC%98%A4%EB%A0%8C%EC%A7%80-%EC%95%84%EC%9D%B4%EC%BD%98.jpg');  
          entity.setAttribute('gps-new-entity-place', {
              latitude: e.detail.position.latitude + 0.001,
              longitude: e.detail.position.longitude
          });

          const gps = ev.target.getAttribute('gps-new-entity-place');

          entity.setAttribute('value', gps)
   

        document.querySelector("a-scene").appendChild(entity);
      }
      testEntityAdded = true;
  });
};