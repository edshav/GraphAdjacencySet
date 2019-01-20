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
// The graph is a JS Map.
// The key of each key-value pair is a node.
// The value of each key-value pair is a Set of edges (directly connected nodes).
// The graph is a directed graph
class Graph {
    constructor(arr = []) {
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
    // The BFS method traverses the minimum distance (if any). But we need to know the path.
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
        // The Set is used to collect visited nodes.
        const marked = new Set();
        const queue = new Queue();
        // The object is used to store the paths from the source to each visited node.
        const parent = {};
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

    // isHamiltonianPath: Given a Graph, this method indicates whether the List of node values represents a Hamiltonian
    // Path. A Hamiltonian Path is a valid path through the graph in which every node in the graph is visited exactly
    // once, except for the start and end nodes, which are the same, so that it is a cycle.
    // The argument is an Array of nodes
    isHamiltonianPath(path) {
        if (path === null || path[0] !== path[path.length - 1]) return false;
        // The Set is used to store unvisited nodes
        const unvisited = new Set(this.adjSet.keys());
        console.log(unvisited);
        for (let i = 0; i < path.length - 1; i++) {
            // check if the current node is not visited and if the current node has edge to the next node of path
            if (!unvisited.has(path[i]) || !this.adjSet.get(path[i]).has(path[i + 1])) return false;
            unvisited.delete(path[i]); // remove current (visited) node from the Set of unvisited nodes;
        }
        // The path is passed and there are no unvisited nodes.
        return unvisited.size === 0;
    }
}

const g = new Graph(['Detroit','Chicago','Philadelphia','Boston','San Diego','New York','San Francisco','Phoenix',
    'Houston','Atlanta','Orlando']);

g.addEdge('Detroit','Chicago');
g.addEdge('Chicago','Philadelphia');
g.addEdge('Philadelphia','Boston');
g.addEdge('Boston','San Diego');
g.addEdge('San Diego','New York');
g.addEdge('New York','San Francisco');
g.addEdge('San Francisco','Phoenix');
g.addEdge('Phoenix','Houston');
g.addEdge('Houston','Atlanta');
g.addEdge('Atlanta','Orlando');
g.addEdge('Orlando','Detroit');


console.log(g.isHamiltonianPath(['Detroit','Chicago','Philadelphia','Boston','San Diego','New York',
    'San Francisco','Phoenix','Houston','Atlanta','Orlando','Detroit']));


