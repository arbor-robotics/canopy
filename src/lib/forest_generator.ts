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
    page: number
}

export class ForestGenerator {
    species: Map<number, Species>;
    locations: Map<number[], Species>;
    bbox: number[];

    constructor() {
        this.species = new Map<number, Species>([]);
        this.locations = new Map<number[], Species>([]);
        this.bbox = [-1, -1, -1, -1];
        species_json.forEach((species) => {
            this.species.set(species.page, species)
        });
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

    public getLocations() {

    }

    public setGeometry(geom) {
        console.log(geom);
        this.bbox = getBoundingBox(geom)
        console.log(this.bbox)
    }
}

plan.subscribe((val) => {
    if (val == undefined) return;
    seedlings = val.seedlings;
})

function randomFromInterval(min: number, max: number) { // min and max included 
    return Math.random() * (max - min) + min;
}

function getBoundingBox(geom: any) {
    let shapes = geom.coordinates;
    let min_lat = 99999.9;
    let min_lon = 99999.9;

    let max_lat = -99999.9;
    let max_lon = -99999.9;
    console.log(shapes)

    shapes.forEach((shape_coords) => {

        shape_coords[0].forEach((coord) => {
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
            console.log(`Too close! Dist was ${minDist}`)
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