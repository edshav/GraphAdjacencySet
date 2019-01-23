class Graph {
    constructor(arr = []){
        this.vertices = new Map();
        arr.map(x => this.vertices.set(x, new Set()));
    }

    addVertex(vertex){
        if (this.vertices.has(vertex)) {
            return false;
        }
        this.vertices.set(vertex, new Set);
        return true;
    }

    // undirected graph
    addEdge(src, dest){
        if (this.vertices.get(src).has(dest)) {
            return false;
        }
        this.vertices.get(src).add(dest);
        this.vertices.get(dest).add(src);
        return true;
    }

    printGraph(){
        let ans = '';
        this.vertices.forEach((value, key) => {
            let str = key + ' -> |';
            value.forEach(value => {
                str += ' * ' + value;
            });
            ans += str + ' * |\n';
        });
        return ans;
    }

    DFS(){
        const white = new Set(this.vertices.keys());
        const grey = new Set();
        const black = new Set();
        const dfsVisit = (v) => {
            white.delete(v);
            grey.add(v);
            this.vertices.get(v).forEach(dest => {
                if (white.has(dest)) {
                    dfsVisit(dest);
                }
            });
            grey.delete(v);
            black.add(v);
        };
        this.vertices.forEach((value, key) => {
            if (white.has(key)) {
                dfsVisit(key);
            }
        });
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
g.addEdge('Detroit','Boston');
g.addEdge('San Diego','San Francisco');
g.addEdge('Philadelphia','San Diego');
g.addEdge('Houston','Orlando');
g.addEdge('Houston','New York');


console.log(g.printGraph());
g.DFS();