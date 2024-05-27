// Sample data (nodes and links)
//Khai báo đỉnh
var nodes = [];
//Khai báo cạnh
var links = [];

var width = 500;
var height = 500;

//Lấy đỉnh đẩy vào nodes để vẽ
function addNode() {
  let nodeInput = document.getElementById('nodeInput');
  let nodeValue = nodeInput.value.trim();
  nodes = nodeValue.split(' ').map(item => ({ id: item }));

}

//Lấy cạnh đẩy vào links để vẽ
function generateLinks() {
  const pairInput = document.getElementById('edge');
  const pairString = pairInput.value.trim().replace(/\s/g, '');
  const pairs = pairString.match(/.{2}/g);
  const lienket = pairs.map(pair => ({ source: pair[0], target: pair[1] }));
  links = lienket;
}

function createAdjacencyList() {
  const adjacencyList = {};

  links.forEach(({ source, target }) => {
    if (!adjacencyList[source]) {
      adjacencyList[source] = [];
    }
    if (!adjacencyList[target]) {
      adjacencyList[target] = [];
    }

    adjacencyList[source].push(target);
    // adjacencyList[target].push(source); // For undirected graph
  });

  return adjacencyList;
}
//Hàm để khởi tạo vẽ đồ thị
function drawGraph() {

  deleteGraph();

  addNode();
  generateLinks();
  const adjacencyList = createAdjacencyList(links);
  // console.log(adjacencyList);

  function dfs(graph, start, end, visited = new Set(), path = []) {
    visited.add(start);
    path.push(start);

    if (start === end) {
      return path;
    }
    for (let neighbor of graph[start]) {
      if (!visited.has(neighbor)) {
        // console.log('Going to neighbor:', neighbor);
        let result = dfs(graph, neighbor, end, visited, path);
        if (result) {
          return result;
        }
      }
    }

    // console.log('No unvisited neighbors. Backtracking from:', start);
    path.pop();
    return null;
  }
  const startNode = document.getElementById('start').value;
  const endNode = document.getElementById('end').value;
  const path = dfs(adjacencyList, startNode, endNode);
  // Tạo 1 container svg
  var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(
      d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", function () {
          svg.attr("transform", d3.event.transform);
        })
    )
    .append("g");

  // Khởi chạy D3 vẽ
  var simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("attractToCenter", attractToCenter());

  // Đẩy mũi tên vào graph
  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 22) // Điều chỉnh vị trí mũi tên
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowhead");

  // Thêm liên kết có mũi tên
  var link = svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow)"); // Add arrowhead marker

  // Khởi tạo đỉnh đẩy vào svg
  var node = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 15)
    .attr("fill", "red")
    .attr("stroke", "black")   // Thêm viền màu đen
    .attr("stroke-width", 2)   // Độ dày của viền
    .call(d3.drag().on("start", dragStart).on("drag", drag).on("end", dragEnd));

  // Tạo nhãn vào gắn cho đỉnh
  var labels = svg
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text((d) => d.id)
    .attr("font-size", 12)
    .attr("dx", 25)
    .attr("dy", 5);

  // Cập nhật vị trí cho đỉnh, liên kết, nhãn
  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });

  // Tìm đường đi từ DFS và thay đổi màu sắc
if (path) {
  document.getElementById("KQ").textContent = "Đường đi tìm DFS tìm được là:\n" + path.join(' -> ');

  // Thay đổi màu sắc đường đi trên đồ thị
  path.forEach((nodeId, index) => {
    if (index < path.length - 1) {
      const source = nodeId;
      const target = path[index + 1];
      svg.selectAll("line")
        .filter((d) => d.source.id === source && d.target.id === target)
        .classed("highlighted", true);
    }
  });
} else {
  document.getElementById("KQ").textContent = "Không tìm được đường đi từ " + startNode + " đến " + endNode;
}


  
  //Các hàm định vị lại tọa độ x,y cho các nodes khi được kéo
  function dragStart(d) {
    simulation.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function drag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragEnd(d) {
    simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function attractToCenter() {
    const strength = 0.1;
    return function (alpha) {
      nodes.forEach((d) => {
        if (d.index >= nodes.length - 1) {
          const distanceToCenter = Math.sqrt((d.x - width / 2) ** 2 + (d.y - height / 2) ** 2);
          const targetX = width / 2 + (d.x - width / 2) * strength * alpha / distanceToCenter;
          const targetY = height / 2 + (d.y - height / 2) * strength * alpha / distanceToCenter;
          d.vx += (targetX - d.x) * strength * alpha;
          d.vy += (targetY - d.y) * strength * alpha;
        }
      });
    };
  }



}


//Xóa đồ thị
function deleteGraph() {
  // Remove the SVG element that contains the graph
  d3.select("svg").remove();
  nodes = [];
  links = [];
}