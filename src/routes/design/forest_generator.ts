import * as d3 from "d3";

function randomFromInterval(min: number, max: number) { // min and max included 
    return Math.random() * (max - min + 1) + min;
}

export function getRandomPoint(points: object) {

    console.log(points.coordinates[0])

    let coords: Array<Array<number>> = points.coordinates[0];

    if (coords.length < 2)
        coords = coords[0]



    let min_lat = 99999.9;
    let min_lon = 99999.9;

    let max_lat = -99999.9;
    let max_lon = -99999.9;

    coords.forEach((coord) => {
        console.log(coord)
        let lon = coord[0];
        let lat = coord[1];

        if (lat < min_lat) {
            min_lat = lat;
            console.log(`MIN LAT IS NOW ${min_lat}`)
        }
        else if (lat > max_lat) {
            max_lat = lat;
            console.log(`MAX LAT IS NOW ${max_lat}`)

        }

        if (lon < min_lon)
            min_lon = lon;
        if (lon > max_lon)
            max_lon = lon;
    })


    const MAX_TRIES = 100;

    for (let i = 0; i < MAX_TRIES; i++) {
        let rand_lon = randomFromInterval(min_lon, max_lon);
        let rand_lat = randomFromInterval(min_lat, max_lat);
        if (d3.geoContains(points, [rand_lon, rand_lat])) {
            console.log("FALLS WITHIN!");
            return [rand_lon, rand_lat]
        }
    }

    console.log(`(${min_lon},${min_lat}) -> (${max_lon}, ${max_lat})`)



    return ([0, 0])
}