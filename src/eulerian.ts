const eul = (options: any) => {
  var g: any = [];
  var i: any;
  var edgePointer: any = [];
  var edgeUsed: any = [];
  var trail: any = [];

  var id: any = {};
  var idReverse: any = [];
  var idCount: any = 0;
  function getId(x: any) {
    if (!id.hasOwnProperty(x)) {
      edgePointer[idCount] = 0;
      idReverse[idCount] = x;
      id[x] = idCount++;
    }
    return id[x];
  }

  function dfs(v: any) {
    for (; edgePointer[v] < g[v].length; edgePointer[v] += 1) {
      var edge: any = g[v][edgePointer[v]];
      var to: any = edge[0];
      var id: any = edge[1];
      if (!edgeUsed[id]) {
        edgeUsed[id] = true;
        dfs(to);
      }
    }
    trail.push(v);
  }

  function pushEdge(u: any, v: any, id: any) {
    g[u] = g[u] || [];
    g[v] = g[v] || [];
    g[u].push([v, id]);
  }

  // main
  var deg: any = [];
  var inDeg: any = [],
    outDeg: any = [];
  for (i = 0; i < options.edges.length; i += 1) {
    var edge = options.edges[i];
    var u = getId(edge[0]);
    var v = getId(edge[1]);
    pushEdge(u, v, i);
    if (!options.directed) {
      pushEdge(v, u, i);
    }

    if (options.directed) {
      outDeg[u] = outDeg[u] || 0;
      inDeg[u] = inDeg[u] || 0;
      outDeg[v] = outDeg[v] || 0;
      inDeg[v] = inDeg[v] || 0;
      outDeg[u] += 1;
      inDeg[v] += 1;
    } else {
      deg[u] = deg[u] || 0;
      deg[v] = deg[v] || 0;
      deg[u] += 1;
      deg[v] += 1;
    }
  }

  function checkDirected() {
    var oddVertex = 0;
    var start = 0,
      end;
    for (i = 0; i < idCount; i += 1) {
      if (outDeg[i] - inDeg[i] !== 0) {
        if (outDeg[i] > inDeg[i]) {
          start = i;
        } else {
          end = i;
        }
        oddVertex += 1;
      }
    }
    return { odd: oddVertex, start: start };
  }

  function checkUndirected() {
    var oddVertex = 0;
    var start = 0;
    for (i = 0; i < idCount; i += 1) {
      if (deg[i] % 2 !== 0) {
        start = i;
        oddVertex += 1;
      }
    }
    return { odd: oddVertex, start: start };
  }

  var check = options.directed ? checkDirected() : checkUndirected();
  if (check.odd % 2 !== 0 || check.odd > 2) {
    throw Error("the graph does not have an eulerian trail");
  }
  dfs(check.start);

  if (trail.length !== options.edges.length + 1) {
    throw Error("the graph does not have an eulerian trail");
  }

  trail.reverse();

  // id to input
  return trail.map(function(id: any) {
    return idReverse[id];
  });
};

export default eul;
