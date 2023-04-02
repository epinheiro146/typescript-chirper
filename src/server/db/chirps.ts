import * as fs from "fs";
import { Chirp } from "../../types";

interface Metadata {
    insertId?: number;
    results: string;
}

interface ChirpstoreStructure {
    [id: number]: Chirp;
    nextid: number;
}

let chirps: ChirpstoreStructure = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

let getChirps = () => {
    return new Promise<Chirp[]>(resolve => {
        const chirpstore = Object.assign({}, chirps);
        const transformed = Object.keys(chirpstore).map(key => {
            const chirp = { ...chirpstore[Number(key)], id: Number(key) };
            return chirp;
        });
        transformed.pop();

        resolve(transformed); //create a copy and return it
    });
}

let getChirp = (id: number) => {
    return new Promise<Chirp[]>(resolve => {
        const chirp = Object.assign({}, chirps[id]); //create a copy and return it
        resolve([{ id, ...chirp }]);
    });
};

let createChirp = (chirp: Chirp) => {
    return new Promise<Metadata>(resolve => {
        chirps[chirps.nextid++] = chirp;
        writeChirps();
        resolve({ insertId: chirps.nextid - 1, results: "Successfully created chirp!" })
    })
};

let updateChirp = (id: number, chirp: Chirp) => {
    return new Promise<Metadata>(resolve => {
        chirps[id] = chirp;
        writeChirps();
        resolve({ results: "Chirp updated successfully!" })
    })
};

let deleteChirp = (id: number) => {
    return new Promise<Metadata>(resolve => {
        delete chirps[id];
        writeChirps();
        resolve({ results: "Chirp deleted successfully!" });
    })
};

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

export default {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}