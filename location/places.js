window.onload = () => {
  // if you want to statically add places, de-comment following line
  let method = "static";

  if (method === "static") {
    let places = staticLoadPlaces();
    renderPlaces(places);
  }
};

function staticLoadPlaces() {
  return [
    {
      name: "Your place name",
      location: {
        lat: 35.20526, // add here latitude if using static data
        lng: 126.81173, // add here longitude if using static data
      },
    },
  ];
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    const latitude = place.location.lat;
    const longitude = place.location.lng;

    // add place icon
    const text = document.createElement("a-text");
    text.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude}`
    );
    text.setAttribute("name", place.name);

    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
    text.setAttribute("scale", "20, 20");

    text.addEventListener("loaded", () =>
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"))
    );

    const clickListener = function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      const name = ev.target.getAttribute("name");

      const el = ev.detail.intersection && ev.detail.intersection.object.el;

      if (el && el === ev.target) {
        const label = document.createElement("span");
        const container = document.createElement("div");
        container.setAttribute("id", "place-label");
        label.innerText = name;
        container.appendChild(label);
        document.body.appendChild(container);

        setTimeout(() => {
          container.parentElement.removeChild(container);
        }, 1500);
      }
    };

    text.addEventListener("click", clickListener);

    scene.appendChild(icon);
  });
}
