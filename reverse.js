var raw = require('./reliability_new.geojson').data.features;

var countReversed = 0;
var segmentCount = 0;
var j;
for (j = 0; j < raw.length; j++) {
  var segment = raw[j];
  var coordinates = segment.geometry.coordinates;
  var direction = segment.properties.direction;

  // Iterate over each linestring
  var i;
  for (i = 0; i < coordinates.length; i++) {
    segmentCount++;
    var ls = coordinates[i];

    var first = ls[0];
    var last = ls[ls.length - 1];

    /*
    Northbound lines:
    Should start south and go north.
    First latitude should be lower than last
    */
    if (direction === 'NB' && (first[1] > last[1])) {
      coordinates[i] = ls.reverse();
      countReversed++;
    }

    /*
    Southbound lines:
    Should start north and go south.
    First latitude should be higher than last
    */
    if (direction === 'SB' && (first[1] < last[1])) {
      coordinates[i] = ls.reverse();
      countReversed++;
    }

    /*
    Westbound lines:
    Should start east and go west
    First longitude should be lower than last
    */
    if (direction === 'WB' && (first[0] > last[0])) {
      coordinates[i] = ls.reverse();
      countReversed++;
    }

    /*
    Eastbound lines
    Should start west and go east
    First longitude should be higher than last
    */
    if (direction === 'EB' && (first[0] < last[0])) {
      coordinates[i] = ls.reverse();
      countReversed++;
    }
  }

  raw[j].geometry.coordinates = coordinates;
}

console.log(JSON.stringify({
  "type": "FeatureCollection",
  "features": raw
}));
