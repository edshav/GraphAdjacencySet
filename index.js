class Graph {
    constructor(arr = []) {
        this.noOfNodes = arr.length;
        this.adjSet = new Map();
        arr.map(x => this.adjSet.set(x, new Set()));
    }
    addNode(node) {
        if (this.adjSet.has(node)) {
            return false;
        } else {
            this.adjSet.set(node, new Set);
            return true;
        }
    }
    addEdge(src, dest) {
        if (this.adjSet.get(src).has(dest)) {
            return false;
        } else {
            this.adjSet.get(src).add(dest);
            this.adjSet.get(dest).add(src);
            return true;
        }
    }
    

}

const g = new Graph(['Chicago','Boston','New York','Los Angeles','Philadelphia','Detroit']);
console.log(g);
g.addEdge('Chicago','Boston');
console.log(g);
console.log(g.addEdge('Chicago','Boston'));
// console.log(g);