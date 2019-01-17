class Graph {
    constructor(arr = []) {
        this.noOfNodes = arr.length;
        this.adjSet = new Map();
        arr.map(x => this.adjSet.set(x, []));
    }
}

const g = new Graph(['a','b','c','d','e','f']);
