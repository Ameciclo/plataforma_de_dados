export function getDirectionsNew(latitude, longitude, dirName) {
  // offset do ponto central
  var latOff = 0.001;
  var lonOff = 0.001;
  // vetores de alteração
  var latOffs = [latOff, 0.0, -latOff, 0.0];
  var lonOffs = [0.0, lonOff, 0.0, -lonOff];
  var latOff2 = 0.0002;
  var lonOff2 = 0.0002;
  var latlonCoords = [
    latitude + latOff2,
    longitude + lonOff2,
    latitude - latOff2,
    longitude - lonOff2,
  ];
  var nameCoords = ["north", "east", "south", "west"];
  var coordinates = [];
  var i = 0;
  //for (var i = 0; i < 1; i ++) {
  var directionsN = Maps.newDirectionFinder()
    .setOrigin(latitude, longitude)
    .setDestination(latitude + latOffs[i], longitude + lonOffs[i])
    .setMode(Maps.DirectionFinder.Mode.WALKING)
    .getDirections();
  var steps = directionsN.routes[0].legs[0].steps;

  var north = [];
  var first = [true, true, true, true];
  for (var j = 0; j < steps.length; j++) {
    var point = Maps.decodePolyline(steps[j].polyline.points);
    for (var w = 0; w < point.length / 2; w++) {
      if (
        nameCoords[i] == nameCoords[0] &&
        latlonCoords[i] <= point[2 * w] &&
        first[i]
      ) {
        //coordinates.push([point[2*w+1], point[2*w]])
        north.push([point[2 * w + 1], point[2 * w]]);
        first[i] = false;
      }
    }
  }
  var tangent = getEquation(latitude, longitude, north[0][0], north[0][1]);
  var radius = 0.0005;
  var alfa = Math.atan(-tangent);
  var beta = Math.atan(1 / tangent);
  var angles = [beta, alfa, beta, alfa];
  var sines = [1, 1, -1, -1];

  // nameCoords é North, South...
  for (var c = 0; c < 4; c++) {
    coordinates[nameCoords[c]] = {
      location: {
        coordinates: [
          longitude + sines[c] * radius * Math.sin(angles[c]),
          latitude + sines[c] * radius * Math.cos(angles[c]),
        ],
        type: "Point",
      },
      name: dirName[c],
    };
  }
  return coordinates;
}

function getEquation(lat0, lon0, lon1, lat1) {
  var angular = (lat1 - lat0) / (lon1 - lon0);
  return angular;
}
