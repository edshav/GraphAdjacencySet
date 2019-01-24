class Graph {
    constructor() {
        this._vertices = {};
        this.size = 0;
    }

    addVertex(data) {
        if (this._vertices[data]) return false;
        this._vertices[data] = {
            edges: {},
            color: 'white'
        };
        this.size++;
        return true;
    }

    hasVertex(value) {
        return this._vertices.hasOwnProperty(value);
    }

    hasEdge(src, dest) {
        return this.hasVertex(src) && this._vertices[src].edges.hasOwnProperty(dest);
    }

    // directed
    addEdge(src, dest) {
        if (this.hasVertex(src) && this.hasVertex(dest) && !this.hasEdge(src, dest)) {
            this._vertices[src].edges[dest] = true;
            return true;
        }
        return false;
    }

    removeVertex(value) {
        if (!this.hasVertex(value)) return false;
        for (const vertex in this._vertices) {
            this.removeEdge(vertex, value);
        }
        delete this._vertices[value];
        return true;
    }

    removeEdge(src, dest) {
        if (!this.hasVertex(src) || !this.hasVertex(dest)) return false;
        delete this._vertices[src].edges[dest];
        return true;
    }

    printGraph() {
        let answer = '';
        for (const vertex in this._vertices) {
            answer += `${vertex} -> ` + ` `.repeat(21 - vertex.length) + `|`;
            for (const dest in this._vertices[vertex].edges) {
                answer += ` * ${dest}`;
            }
            answer += `\n`;
        }
        return answer;
    }


}

const g = new Graph();
const vert = ['Detroit','Chicago','Philadelphia','Boston','San Diego','New York','San Francisco','Phoenix','Houston',
    'Atlanta','Orlando'];
vert.map(x => g.addVertex(x));
const edges = [['Detroit','Chicago'],['Chicago','Philadelphia'],['Philadelphia','Boston'],['Boston','San Diego'],
    ['San Diego','New York'],['New York','San Francisco'],['San Francisco','Phoenix'],['Phoenix','Houston'],
    ['Houston','Atlanta'],['Atlanta','Orlando'],['Detroit','Boston'],['San Diego','San Francisco'],
    ['Philadelphia','San Diego'],['Houston','Orlando'],['Houston','New York']];
edges.map(y => g.addEdge(...y));
console.log(g.printGraph());
