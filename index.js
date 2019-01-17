// Queue for Breadth-First Search
class Queue {
    constructor() {
        this.data = [];
    }
    add(node) {
        this.data.push(node);
    }
    get() {
        return this.data.shift();
    }
    isEmpty() {
        return !Boolean(this.data.length);
    }
}

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
    // directed graph
    addEdge(src, dest) {
        if (this.adjSet.get(src).has(dest)) {
            return false;
        } else {
            this.adjSet.get(src).add(dest);
            return true;
        }
    }
    printGraph() {
        this.adjSet.forEach((value, key) => {
            let str = key + ' -> ';
            value.forEach(value => {
                str += value + ' ';
            });
            console.log(str);
        });
    }
    // Breadth-First Search
    isConnected(src, dest) {
        const queue = new Queue();
        queue.add(src);
        const marked = new Set();
        marked.add(src);
        while (!queue.isEmpty()) {
            const current = queue.get();
            console.log(current);
            if (current === dest) return true;
            this.adjSet.get(current).forEach(value => {
                if (!marked.has(value)) {
                    queue.add(value);
                    marked.add(value);
                }
            });
        }
        return false;
    }
}

const g = new Graph(['Detroit','Chicago','Philadelphia','Boston','New York']);

g.addNode('San Francisco');

g.addEdge('Detroit','Chicago');
g.addEdge('Detroit','Philadelphia');
g.addEdge('Chicago','New York');
g.addEdge('Chicago','Boston');
g.addEdge('Philadelphia','Boston');
g.addEdge('Philadelphia','San Francisco');
g.addEdge('Philadelphia','New York');
g.addEdge('Boston','New York');
g.addEdge('New York','San Francisco');

g.printGraph();

console.log(g.isConnected('Detroit', 'Philadelphia'));
console.log(g.isConnected('Detroit', 'San Francisco'));
g.addNode('Los Angeles');
console.log(g.isConnected('Detroit', 'Los Angeles'));
