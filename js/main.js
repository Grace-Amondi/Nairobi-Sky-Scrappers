mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JhY2VhbW9uZGkiLCJhIjoiY2poampha2g1MDQ5czNkcXplMzMycGJtYyJ9.uec448K2BkM1FADfN4YA9Q";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [36.8166,-1.28333],
  zoom: 10.3,
  pitch: 0
});

var chapters = {
  nairobi: {
    center: [36.8166,-1.28333],
    zoom: 10.3
  },
  teleposta: {
    bearing: 27,
    center: [36.819578, -1.28599],
    zoom: 15.5,
    pitch: 20
  },
  prism: {
    duration: 6000,
    center: [36.809274, -1.293326],
    bearing: 150,
    zoom: 15,
    pitch: 0
  },
  times: {
    bearing: 90,
    center: [36.823868, -1.289967],
    zoom: 13,
    speed: 0.6,
    pitch: 40
  },
  montave: {
    bearing: 90,
    center: [36.81674, -1.293251],
    zoom: 17.3,
    speed: 0.8,
    pitch: 25
  },
  uap: {
    bearing: 45,
    center: [36.819496, -1.298979],
    zoom: 15.3,
    pitch: 20,
    speed: 0.5
  },
  avic: {
    bearing: 180,
    center: [36.808846, -1.270421],
    zoom: 12.3
  },
  hazina: {
    bearing: 90,
    center: [36.815994, -1.282123],
    zoom: 17.3,
    pitch: 40
  },
  britam: {
    bearing: 90,
    center: [36.81337, -1.29934],
    zoom: 17.3,
    pitch: 20
  }
};

// On every scroll event, check which element is on screen
window.onscroll = function() {
  var chapterNames = Object.keys(chapters);
  var marker = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
    var chapterName = chapterNames[i];
    var popup = new mapboxgl.Popup({ offset: 25 })
    .setText(chapterName);
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      // setMarker(marker);
      new mapboxgl.Marker(el)
        .setLngLat(chapters[chapterName].center)
        // .setPopup(popup)
        .addTo(map); 
      break;
    }
  }
};

var activeChapterName = "nairobi";
console.log(activeChapterName);
var el = document.createElement("div");
el.id = "marker";

// function setMarker(marker){
//     if (marker === activeChapterName) return ;
//     new mapboxgl.Marker(el)
//     .setLngLat(chapters[marker].center)
//     .addTo(map);
//     document.getElementById(marker).setAttribute('class', 'active');
//     document.getElementById(activeChapterName).setAttribute('class', '');

//     activeChapterName = marker;
// }
function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).setAttribute("class", "active");
  document.getElementById(activeChapterName).setAttribute("class", "");

  activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}
