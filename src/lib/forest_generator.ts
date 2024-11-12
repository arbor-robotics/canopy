import * as d3 from "d3";

import {
    plan, type Plan
} from "$lib/stores";
import type OsmMap from "$lib/misc/OsmMap.svelte";

import species_json from "$lib/species.json"

let seedlings: object[] = [];

let L;

export type Species = {
    common: string,
    scientific: string,
    height_ft: number,
    included: boolean,
    description: string,
    page: number,
    icon: string
}

function isMarkerInsidePolygon(x, y, polyPoints) {
    // https://stackoverflow.com/a/31813714/6238455
    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {

        var xi = polyPoints[i][1], yi = polyPoints[i][0];
        var xj = polyPoints[j][1], yj = polyPoints[j][0];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;

        // console.log(`x: ${x}, y: ${y}, xi ${xi}, yi ${yi}, xj ${xj}, yj ${yj}`)
    }
    return inside;
};

export class ForestGenerator {
    species: Map<number, Species>;
    locations: Map<number[], Species>;
    bbox: number[];
    geojson: any;

    constructor(public changeCb: any) {
        this.species = new Map<number, Species>([]);
        this.locations = new Map<number[], Species>([]);
        this.bbox = [-1, -1, -1, -1];
        this.geojson = undefined;
        species_json.forEach((species) => {

            this.species.set(species.page, species)
        });
        console.log(this.species)
    }

    public loadFromString(plan_string: string) {
        let plan_obj = JSON.parse(JSON.parse(plan_string));
        console.log(plan_obj)

        this.locations.clear();

        plan_obj.locations.forEach((location) => {
            this.locations.set([location.lat, location.lon], this.species.get(location.species))
        })

        this.geojson = plan_obj.geojson

        this.changeCb()

        console.log(this.geojson)
    }

    public toString() {
        let locations_obj = [];

        for (let [latlon, seedling] of this.locations) {
            // console.log(seedling)
            locations_obj.push({
                lat: latlon[0],
                lon: latlon[1],
                species: seedling.page
            })
        }

        let obj = {
            locations: locations_obj,
            geojson: this.geojson
        }

        return JSON.stringify(obj)
    }

    public getSpeciesOptions() {
        return this.species;
    }

    public markIncluded(id: number, included = true) {
        this.species.get(id).included = included;
    }

    public getIncludedSpecies() {
        let included_species: Array<Species> = [];
        for (let [id, species] of this.species) {
            if (species.included) included_species.push(species)
        }
        return included_species;
    }

    public getIncludedSpeciesCount() {
        return this.getIncludedSpecies().length
    }

    public regeneratePoints() {
        // let point = this.getRandomPoint()
        // console.log(point)
        // this.locations.set(point, this.species.get(1)!)
        this.generateSeedlings()
        console.log(this.locations)
        this.changeCb()
    }

    public setGeoJSON(json) {
        console.log(json);
        this.bbox = getBoundingBox(json)
        this.geojson = json;
        console.log(this.bbox)
        this.regeneratePoints()
    }

    public async generateSeedlings(max_failures = 100, min_dist = 5.0) {
        let num_failures = 0

        this.locations.clear()


        if (L == undefined)
            L = await import("leaflet");

        while (num_failures < max_failures) {
            let coord = this.getRandomPoint()

            let species_id = Math.floor(randomFromInterval(1, 59))
            let species = this.species.get(species_id)

            let minDist = 99999;
            for (let [latlon, seedling] of this.locations) {
                // let dist = d3.geoDistance(coord, [seedling.lat, seedling.lon])
                let latLngA = L.latLng(coord[0], coord[1])
                let latLngB = L.latLng(latlon)
                let dist = latLngA.distanceTo(latLngB)
                if (dist < minDist) minDist = dist;
            }
            if (minDist < min_dist) {
                // console.log(`Too close! Dist was ${minDist}`)
                num_failures++;
                continue;
            }

            this.locations.set(coord, species!)
        }
    }

    public getRandomPoint() {

        let min_lat, max_lat, min_lon, max_lon;

        if (this.bbox == undefined) {
            [min_lat, max_lat, min_lon, max_lon] = getBoundingBox(this.geojson.geometry);
            // console.log(`Interval: [${min_lat}, ${max_lat}], [${min_lon}, ${max_lon}]`)
        } else {
            [min_lat, max_lat, min_lon, max_lon] = this.bbox;
        }




        const MAX_TRIES = 100;

        let result_found = false;
        let result = [0, 0]

        for (let i = 0; i < MAX_TRIES; i++) {
            let rand_lon = randomFromInterval(min_lon, max_lon);
            let rand_lat = randomFromInterval(min_lat, max_lat);

            this.geojson.geometry.coordinates.forEach((shape) => {
                if (shape.length == 1) {
                    shape = shape[0]
                }
                // console.log(shape)
                if (result_found) return result;
                if (isMarkerInsidePolygon(rand_lat, rand_lon, shape)) {
                    // console.log(`${rand_lat} ${rand_lon} FALLS WITHIN!`);
                    result = [rand_lat, rand_lon]
                    result_found = true;
                }
            })
        }

        // console.log(`(${min_lon},${min_lat}) -> (${max_lon}, ${max_lat})`)



        return result
    }

}

plan.subscribe((val) => {
    if (val == undefined) return;
    seedlings = val.seedlings;
})

function randomFromInterval(min: number, max: number) { // min and max included 
    return Math.random() * (max - min) + min;
}

function getBoundingBox(json: any) {
    let shapes = json.geometry.coordinates;
    let min_lat = 99999.9;
    let min_lon = 99999.9;

    let max_lat = -99999.9;
    let max_lon = -99999.9;
    console.log(shapes)

    shapes.forEach((shape_coords) => {
        if (shape_coords.length == 1) {
            shape_coords = shape_coords[0]
        }
        shape_coords.forEach((coord) => {
            // console.log(coord)
            let lon = coord[0];
            let lat = coord[1];

            if (lat < min_lat) {
                min_lat = lat;
                // console.log(`MIN LAT IS NOW ${min_lat}`)
            }
            else if (lat > max_lat) {
                max_lat = lat;
                // console.log(`MAX LAT IS NOW ${max_lat}`)

            }

            if (lon < min_lon)
                min_lon = lon;
            if (lon > max_lon)
                max_lon = lon;
        })
    })

    return [min_lat, max_lat, min_lon, max_lon];
}

export function getRandomPoint(points: object, bbox: number[] | undefined = undefined) {

    let min_lat, max_lat, min_lon, max_lon;

    if (bbox == undefined) {
        [min_lat, max_lat, min_lon, max_lon] = getBoundingBox(points);
        // console.log(`Interval: [${min_lat}, ${max_lat}], [${min_lon}, ${max_lon}]`)
    } else {
        [min_lat, max_lat, min_lon, max_lon] = bbox;
    }




    const MAX_TRIES = 100;

    for (let i = 0; i < MAX_TRIES; i++) {
        let rand_lon = randomFromInterval(min_lon, max_lon);
        let rand_lat = randomFromInterval(min_lat, max_lat);
        if (!d3.geoContains(points, [rand_lon, rand_lat])) {
            // console.log("FALLS WITHIN!");
            return [rand_lat, rand_lon]
        }
    }

    // console.log(`(${min_lon},${min_lat}) -> (${max_lon}, ${max_lat})`)



    return ([0, 0])
}

export async function generateSeedlings(json: any, clearFn, addFn, min_dist: number = 1, max_failures = 100) {

    let boundary = json.geometry

    // Clear old seedlings
    seedlings = [];

    console.log(boundary)

    let bbox = getBoundingBox(boundary)

    clearFn();

    if (L == undefined)
        L = await import("leaflet");

    let num_failures = 0

    while (num_failures < max_failures) {
        let coord = getRandomPoint(boundary, bbox)

        let minDist = 99999;
        seedlings.forEach((seedling) => {
            // let dist = d3.geoDistance(coord, [seedling.lat, seedling.lon])
            let latLngA = L.latLng(coord[0], coord[1])
            let latLngB = L.latLng(seedling.lat, seedling.lon)
            let dist = latLngA.distanceTo(latLngB)
            if (dist < minDist) minDist = dist;
        })
        if (minDist < min_dist) {
            // console.log(`Too close! Dist was ${minDist}`)
            num_failures++;
            continue;
        }
        let seedling = { lat: coord[0], lon: coord[1] }
        seedlings.push(seedling)
        await addFn(seedling)
        // plan_seedlings.set(seedlings);
    }

    return seedlings;
}