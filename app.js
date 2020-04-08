"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readFile(path) {
    let file;
    try {
        file = fs_1.readFileSync(path, "utf8").split("\n");
        return (file);
    }
    catch (e) {
        return undefined;
    }
}
function parseFile(file) {
    let data = [];
    try {
        let first_line = file[0].split(" ");
        let max_capacity = parseInt(first_line[0]);
        let nbr_turns = parseInt(first_line[1]);
        let nbr_groups = parseInt(first_line[2]);
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
    let size = file.length;
    try {
        for (let i = 1; i < size; i++) {
            data.push(parseInt(file[i]));
        }
    }
    catch (e) {
        return undefined;
    }
    return data;
}
function rollerCoaster(data) {
    let gain = 0;
    let first = 3;
    for (let i = 0; i < data[1]; i++) {
        let nbr_inside = 0;
        let actual_inside = 0;
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
        let data = parseFile(file); // [groups, nbr_groups, nbr_turns, max_capacity]
        rollerCoaster(data);
    }
    file = readFile("ressources/roller_coaster.harder");
    if (file === undefined) {
        console.log("The second file cannot be read");
        return (undefined);
    }
    else {
        let data = parseFile(file); // [groups, nbr_groups, nbr_turns, max_capacity]
        rollerCoaster(data);
    }
}
program();
while (true) { }
//# sourceMappingURL=app.js.map