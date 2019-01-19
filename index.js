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
        return !(this.data.length);
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
    isConnected_BFS(src, dest) {
        if (!this.adjSet.has(src)) return false;
        const queue = new Queue();
        queue.add(src);
        const marked = new Set();
        marked.add(src);
        while (!queue.isEmpty()) {
            const current = queue.get();
            if (current === dest) {
                return true;
            }
            this.adjSet.get(current).forEach(value => {
                if (!marked.has(value)) {
                    queue.add(value);
                    marked.add(value);
                }
            });
        }
        return false;
    }
    // Depth-First Search
    isConnected_DFS(src, dest) { // src: String, dest: String
        if (!this.adjSet.has(src)) return false;
        const marked = new Set(); // visited nodes
        //recursive function
        const dfs = (current, dest) => {
            if (current === dest) {
                return true;
            }
            marked.add(current);
            const iterator = this.adjSet.get(current).values();
            let value = iterator.next().value;
            while (value) {
                if (!marked.has(value) && dfs(value, dest)) {
                    return true;
                }
                value = iterator.next().value;
            }
            return false;
        };
        return dfs(src, dest);
    }
    removeEdge(src, dest) {
        if (!this.adjSet.get(src).has(dest)) {
            return false;
        }
        this.adjSet.get(src).delete(dest);
        return true;
    }
    removeNode(node) {
        if (!this.adjSet.has(node)) {
            return false;
        }
        this.adjSet.forEach((value, key) => {
            this.removeEdge(key, node);
        });
        this.adjSet.delete(node);
        return true;
    }
    minDistance(src, dest) { // https://www.geeksforgeeks.org/finding-the-path-from-one-vertex-to-rest-using-bfs/
        if (!(this.adjSet.has(src) && this.adjSet.has(dest))) return false;
        const writeMinDistance = (obj, str) => {
            let distance = str;
            let city = str;
            while (true) {
                if (city === obj[city]) {
                    return distance;
                } else {
                    distance = obj[city] + ' -> ' + distance;
                    city = obj[city];
                }
            }
        };
        const marked = new Set(); // use a Set instead of an Array
        const queue = new Queue();
        const parent = {}; // use an Object instead of an Array
        marked.add(src);
        queue.add(src);
        parent[src] = src;
        while (!queue.isEmpty()) {
            const current = queue.get();
            if (current === dest) {
                return writeMinDistance(parent, dest);
            }
            this.adjSet.get(current).forEach(value => {
                if (!marked.has(value)) {
                    queue.add(value);
                    marked.add(value);
                    parent[value] = current;
                }
            });
        }
        return false;
    }
}

const g = new Graph(['Detroit','Chicago','Philadelphia','Boston','San Diego','New York','San Francisco','Phoenix',
    'Houston','Atlanta','Orlando']);

g.addEdge('Detroit','Chicago');
g.addEdge('Detroit','Philadelphia');
g.addEdge('Chicago','Boston');
g.addEdge('Chicago','San Diego');
g.addEdge('Philadelphia','New York');
g.addEdge('Philadelphia','San Francisco');
g.addEdge('Boston','Phoenix');
g.addEdge('San Diego','Houston');
g.addEdge('New York','Atlanta');
g.addEdge('San Francisco','Orlando');
g.addEdge('Boston','San Diego');
g.addEdge('San Diego','Boston');
g.addEdge('San Diego','New York');
g.addEdge('New York','San Diego');
g.addEdge('New York','San Francisco');
g.addEdge('San Francisco','New York');
g.addEdge('Boston','San Francisco');
g.addEdge('San Francisco','Boston');

// g.printGraph();

// console.log(g.isConnected_BFS('Detroit', 'Philadelphia'));
// console.log(g.isConnected_BFS('Philadelphia', 'Detroit'));
// console.log(g.isConnected_BFS('Detroit', 'Los Angeles'));
// console.log(g.isConnected_DFS('Detroit', 'New York'));
// console.log(g.isConnected_DFS('Detroit', 'Boston'));
// console.log(g.isConnected_DFS('Detroit', 'Los Angeles'));
// g.removeEdge('New York','San Francisco');
// console.log('---------');
// g.printGraph();
g.printGraph();
console.log('-----------------------------');
// g.removeNode('Boston');
// g.printGraph();
console.log(g.minDistance('Detroit', 'Orlando'));


