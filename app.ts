import { readFileSync } from 'fs'

function readFile(path: string) {
    let file: string[];
    try {
        file = readFileSync(path, "utf8").split("\n");
        return (file);
    }
    catch (e) {
        return undefined;
    }
}

function parseFile(file: string[]) {
    let data: Array<number> = [];
    try {
        let first_line: string[] = file[0].split(" ");
        let max_capacity: number = parseInt(first_line[0]);

        let nbr_turns: number = parseInt(first_line[1]);
        let nbr_groups: number = parseInt(first_line[2]);
        if (nbr_groups === 0) {
            return undefined;
        }
        data.push(max_capacity);
        data.push(nbr_turns);
        data.push(nbr_groups + 3);
    }
    catch (e) {
        return undefined;
    }
    let size: number = file.length;
    try {
        for (let i: number = 1; i < size; i++) {
            data.push(parseInt(file[i]));
        }
    }
    catch (e) {
        return undefined;
    }
    return data;
}

function rollerCoaster(data: Array<number>) {
    let gain: number = 0;
    let first: number = 3;
    for (let i: number = 0; i < data[1]; i++) {
        let nbr_inside: number = 0;
        let actual_inside: number = 0;
        while (nbr_inside + data[first] <= data[0] && actual_inside < data[2]) {
            nbr_inside += data[first];
            actual_inside++;
            first++;
            if (first == data[2]) {
                first = 3;
            }
        }
        gain += nbr_inside;
    }
    console.log(gain);
}

function program() {
    let file = readFile("ressources/roller_coaster.hard");
    if (file === undefined) {
        console.log("The first file cannot be read");
    }
    else {
        let data: Array<number> = parseFile(file);
        if (data !== undefined) {
            rollerCoaster(data);
        }
        else {
            console.log("The first file is not well formated")
        }
    }
    file = readFile("ressources/roller_coaster.harder");
    if (file === undefined) {
        console.log("The second file cannot be read");
        return (undefined);
    }
    else {
        let data: Array<number> = parseFile(file);
        if (data !== undefined) {
            rollerCoaster(data);
        }
        else {
            console.log("The second file is not well formated")
            return undefined;
        }
    }
}
program();