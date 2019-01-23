class Graph {
    constructor(arr = []) {
        this.adjSet = new Map();
        arr.map(x => this.adjSet.set(x, new Set()));
    }

    addNode(node) {
        if (this.adjSet.has(node)) {
            return false;
        }
        this.adjSet.set(node, new Set);
        return true;
    }

    // undirected graph
    addEdge(src, dest) {
        if (this.adjSet.get(src).has(dest)) {
            return false;
        }
        this.adjSet.get(src).add(dest);
        this.adjSet.get(dest).add(src);
        return true;
    }

    printGraph() {
        let ans = '';
        this.adjSet.forEach((value, key) => {
            let str = key + ' -> |';
            value.forEach(value => {
                str += ' * ' + value;
            });
            ans += str + ' * |\n';
        });
        return ans;
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

console.log(g.printGraph());