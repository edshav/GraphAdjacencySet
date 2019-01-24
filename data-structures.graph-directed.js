class Graph {
    constructor() {
        this._vertices = {};
        this.size = 0;
    }


    addVertex(data) {
        if (this.hasVertex(data)) return false;
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
        this.size--;
        return true;
    }


    removeEdge(src, dest) {
        if (!this.hasVertex(src) || !this.hasVertex(dest)) return false;
        delete this._vertices[src].edges[dest];
        return true;
    }


    printGraph() {
        let answer = ``;
        for (const vertex in this._vertices) {
            answer += `${vertex} -> ` + ` `.repeat(21 - vertex.length) + `|`;
            for (const dest in this._vertices[vertex].edges) {
                answer += ` * ${dest}`;
            }
            answer += `\n`;
        }
        return answer;
    }


    dfs() {
        const explorer = vertex => {
            this._vertices[vertex].color = `grey`;
            for (const neighbor in this._vertices[vertex].edges) {
                if (this._vertices[neighbor].color === `white`) {
                    explorer(neighbor);
                }
            }
        };
        for (const vertex in this._vertices) {
            if (this._vertices[vertex].color === `white`) {
                explorer(vertex)
            }
        }
        // does it need?
        for (const vertex in this._vertices) {
            this._vertices[vertex].color = `white`;
        }
    }


    // strongly connected components
    scc() {
        const list = [];
        const explorer = vertex => {
            this._vertices[vertex].color = `grey`;
            for (const neighbor in this._vertices[vertex].edges) {
                if (this._vertices[neighbor].color === `white`) {
                    explorer(neighbor);
                }
            }
            this._vertices[vertex].color = `black`;
            list.unshift(vertex);
        };

        const getTranspose = () => {
            const newGraph = new Graph();
            for (const vertex in this._vertices) {
                newGraph.addVertex(vertex);
                newGraph._vertices[vertex].assigned = false;
                for (const dest in this._vertices[vertex].edges) {
                    newGraph.addVertex(dest);
                    newGraph.addEdge(dest, vertex);
                }
            }
            return newGraph;
        };

        const assign = (node, graph, SCC) => {
            this._vertices[node].scc = SCC;
            graph._vertices[node].assigned = true;
            for (const neighbor in graph._vertices[node].edges) {
                if (graph._vertices[neighbor].assigned === false) {
                    assign(neighbor, graph, SCC);
                }
            }
        };

        for (const vertex in this._vertices) {
            if (this._vertices[vertex].color === `white`) {
                explorer(vertex);
            }
        }
        const transposeGraph = getTranspose();
        let SCC = 0;
        while (list.length) {
            const element = list.shift();
            if (transposeGraph._vertices[element].assigned === false) {
                SCC++;
                assign(element, transposeGraph, SCC);
            }
        }
        return SCC;
    }

}

const gr = new Graph();

for (let i = 1; i < 9; i++) {
    gr.addVertex(i);
}
const e = [[1,8],[8,6],[1,4],[6,7],[7,8],[6,1],[6,3],[7,3],[4,3],[5,3],[5,4],[4,2],[2,5]];
e.map(x => gr.addEdge(...x));
console.log(gr.scc());
console.log(gr.printGraph());
