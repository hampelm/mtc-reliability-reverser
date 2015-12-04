## Aligns reliability segments to the direction of travel

Some of the reliability road segments go in the direction of travel. Some do
not. For example, for some northbound segments, the first point is in the south
and the last in the north (as we'd expect). Some go in the opposite direction,
starting in the south and ending in the north.

To style the data, we need all segments to consistently flow in the direction
of travel.

## Setup:

Requires an export of the relaibility data in geojson format. The start of the
file should look something like this
`exports.data = {"type": "FeatureCollection", "features":[...`

## Usage:

To run the script:

`node reverse.js`

To save the output to a file:

`node reverse.js > new_data.geojson`

## License

MIT
