import { readFileSync } from 'fs'

// The structure for the data from the file
interface DataStruct {
    max_capacity: number;
    nbr_turns: number;
    nbr_groups: number;
    groups: Array<number>;
}

// The structure to find the first cycle in the queue
interface Cycle {
    detect: Array<boolean>;
    index: Array<number>;
    value: Array<number>;
    size: number;
    gain: number;
}

function initializeCycle(nbr_groups: number) {
    let detect = new Array<boolean>(nbr_groups);
    detect.fill(false);
    let index = new Array<number>(nbr_groups);
    let value: Array<number> = [];
    let size: number = 0;
    let gain: number = 0;
    return {
        detect,
        index,
        value,
        size,
        gain,
    }
}

function readFile(path: string) {
    try {
        return readFileSync(path, "utf8").split("\n");
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
}

function parseFile(file: string[]) {
    let max_capacity: number;
    let nbr_turns: number;
    let nbr_groups: number;
    let groups: Array<number> = [];
    try {
        let first_line: string[] = file[0].split(" ");
        max_capacity = parseInt(first_line[0]);
        if (max_capacity == NaN) {
            throw "The capacity must be a numerical value.";
        }
        if (max_capacity <= 0) {
            throw "The capacity must be at list 1.";
        }
        nbr_turns = parseInt(first_line[1]);
        if (nbr_turns == NaN) {
            throw "The number of turns must be a numerical value.";
        }
        if (nbr_turns <= 0) {
            throw "The number of turns must be at list 1.";
        }
        nbr_groups = parseInt(first_line[2]);
        if (nbr_groups == NaN) {
            throw "The number of groups must be a numerical value.";
        }
        if (nbr_groups <= 0) {
            throw "The number of groups must be at list 1.";
        }
    }
    catch (e) {
        console.log(e)
        return undefined;
    }
    try {
        let size: number = file.length - 1;
        if (size != nbr_groups + 1) {
            throw "The number of groups is not the same as declared.";
        }
        for (let i: number = 1; i < size; i++) {
            let value = parseInt(file[i]);
            if (value == NaN) {
                throw "The group size must be a numerical value."
            }
            if (value > max_capacity) {
                throw "The group size must be equal to the maximum capacity for maximum."
            }
            if (value <= 0) {
                throw "The group size must be equal to 1 at least.";
            }
            groups.push(value);
        }
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
    return {
        max_capacity,
        nbr_turns,
        nbr_groups,
        groups,
    };
}

function rollerCoaster(data: DataStruct) {
    let gain: number = 0;
    let first: number = 0;
    let i: number = 0;
    let cycle: Cycle = initializeCycle(data.nbr_groups);
    while (i < data.nbr_turns) {
        // nbr of people inside the roller coaster
        let nbr_inside: number = 0;
        // Number of groups inside the roller coaster
        let actual_inside: number = 0;
        // To stock from where we start
        let actual_first: number = first;
        // Loop to fill the roller coaster
        while (nbr_inside + data.groups[first] <= data.max_capacity && actual_inside < data.nbr_groups) {
            nbr_inside += data.groups[first];
            actual_inside++;
            first++;
            if (first == data.nbr_groups) {
                first = 0;
            }
        }
        cycle.value.push(gain);
        gain += nbr_inside;
        // If it's set to true, we find the first cycle
        if (cycle.detect[first] == true) {
            cycle.size = i - cycle.index[first] + 1;
            cycle.gain = gain - cycle.value[cycle.index[first]];
            break;
        }
        cycle.detect[actual_first] = true;
        cycle.index[actual_first] = i;
        i++;
    }
    if (i == data.nbr_turns) {
        console.log(gain);
        return ;
    }
    // Number of turns remaining
    let rest = data.nbr_turns - i - 1;
    // Number of cycle we can cut from the remaining
    let cycle_count = Math.floor(rest / cycle.size);
    // The last few turns and their gain
    let last_values = rest - (cycle_count * cycle.size);
    let last_values_gain: number = cycle.value[cycle.index[first] + last_values] - cycle.value[cycle.index[first]];
    gain += (cycle.gain * cycle_count) + last_values_gain;
    console.log("gain = ", gain);
}

function program() {
    let file = readFile("ressources/roller_coaster.hard");
    if (file !== undefined) {
        let data: DataStruct = parseFile(file);
        if (data !== undefined) {
            rollerCoaster(data);
        }
    }
    console.log()
    file = readFile("ressources/roller_coaster.harder");
    if (file !== undefined) {
        let data: DataStruct = parseFile(file);
        if (data !== undefined) {
            rollerCoaster(data);
        }
    }
}

program();
