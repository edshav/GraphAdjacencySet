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

// g.printGraph();

// console.log(g.isConnected_BFS('Detroit', 'Philadelphia'));
// console.log(g.isConnected_BFS('Philadelphia', 'Detroit'));
g.addNode('Los Angeles');
// console.log(g.isConnected_BFS('Detroit', 'Los Angeles'));
// console.log(g.isConnected_DFS('Detroit', 'New York'));
// console.log(g.isConnected_DFS('Detroit', 'Boston'));
// console.log(g.isConnected_DFS('Detroit', 'Los Angeles'));
// g.removeEdge('New York','San Francisco');
// console.log('---------');
// g.printGraph();
g.printGraph();
console.log('-----------------------------');
g.removeNode('Boston');
g.printGraph();


