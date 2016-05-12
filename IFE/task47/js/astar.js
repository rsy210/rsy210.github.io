(function(definition) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = definition();
  }else if (typeof define === 'function' && define.amd) {
    define("astar",[], definition);
  }
})(function(){
  var astar = {
    path:function(map,start,end,ops){
      var open = new Array();
      var heuristic = astar.heuristic;
      open.pushs(start);

      start.h = heuristic(start,end);
      while(open.length > 0){
        var curNode = open.pop();
        if (curNode === end) {
          return pathNode(curNode);
        }

        curNode.closed = true;

        var neighbors = map.neighbors(curNode);
        
        var nborL = neighbors.length;
        for (var i = 0; i < nborL; i++) {
          var nbs = neighbors[i];

          if (nbs.closed || nbs.isWall()) {
            continue;
          }

          var nbsG = curNode.g;
          if (nbs.x != curNode.x && nbs.y != curNode.y) {
            nbsG += 14;
          }else{
            nbsG += 10;
          }
          var nbsV = nbs.visited;
          if (!nbsV || nbsG < nbs.g) {
            nbs.visited = true;
            nbs.parent = curNode;
            nbs.h = nbs.h || heuristic(nbs, end);
            nbs.g = nbsG;
            nbs.f = nbs.g + nbs.h;

            if (nbs === end) {
              return pathNode(nbs);
            }
            if (!nbsV) {

              open.pushs(nbs);
            }else{
              open.sorts();
            }
            
            
          }
        }

      }
    },
    heuristic:function(s,e){
      var xd = Math.abs(s.x-e.x)*10;
      var yd = Math.abs(s.y-e.y)*10;

      return xd<yd ? yd:xd;
    }
  };
  function Map(mapA,t){
    /**
    * A graph memory structure
    * @param {Array} mapA 2D array of input weights
    * @param {Object} [ops]
    * @param {bool} [ops.dg] whether diagonal moves are allowed
    */
    this.t = t;
    this.nodes = [];//存储地图上所有点
    this.maps = [];
    var rowN = mapA.length;
    for(var i = 0;i<rowN;i++){
      this.maps[i] = [];
      var row = mapA[i];
      var rowL = row.length;
      for (var j = 0; j < rowL; j++) {
        var node = new mapNode(i, j, row[j]);
        this.maps[i][j] = node;
        this.nodes = node;
      };
    }
   // this.init();
  }

  Map.prototype.init = function(){
    //map 节点初始化函数
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].nodeInit();
    }
  }
  Map.prototype.neighbors = function(node){
    var x = node.x;
    var y = node.y;
    var maps = this.maps;
    var neighbor = [];

    //左
    if (maps[x] && maps[x][y-1]) {
      neighbor.push(maps[x][y-1]);
    }

    //右
    if (maps[x] && maps[x][y+1]) {
      neighbor.push(maps[x][y+1]);
    }

    //上
    if (maps[x-1] && maps[x-1][y]) {
      neighbor.push(maps[x-1][y]);
    }

    //下
    if (maps[x+1] && maps[x+1][y]) {
      neighbor.push(maps[x+1][y]);
    }

    //左上
    if (maps[x-1] && maps[x-1][y-1]) {
      neighbor.push(maps[x-1][y-1]);
    }

    //左下
    if (maps[x-1] && maps[x-1][y+1]) {
      neighbor.push(maps[x-1][y+1]);
    }

    //右上
    if (maps[x-1] && maps[x-1][y+1]) {
      neighbor.push(maps[x-1][y+1]);
    }

    //右下
    if (maps[x+1] && maps[x+1][y+1]) {
      neighbor.push(maps[x+1][y+1]);
    }

    return neighbor;

  }

  mapNode.prototype.isWall = function() {
    return this.w === 0;
  };
  
  Array.prototype.pushs = function(node){
    
      this.push(node);
    
      this.sorts();
  }
  Array.prototype.sorts = function(){
    this.sort(sortNumber);
    function sortNumber(aN, bN){
    return bN.f - aN.f;
    }
  }

/*  mapNode.prototype.nodeInit = function(){
    //节点状态初始化
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
  }*/

  function mapNode(x,y,w){
    //节点x,y坐标,权值
    this.x = x;
    this.y = y;
    this.w = w;

    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
  }

  function pathNode(node){
    var curN = node;
    var path = [];
    while(curN.parent){
      path.unshift(curN);
      curN = curN.parent;
    }
    return path;
  }
  return {
  astar: astar,
  Map: Map
  };
});