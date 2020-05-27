let greenWave = canvas => {
  var ctx = canvas.getContext("2d");
  var roadName = [
    "诸光路与蟠中东路路口",
    "诸光路与徐民东路路口",
    "盈港东路与诸光路路口",
    "诸光路与会卓路路口",
    "诸光路与徐泾港路路口",
    "诸光路与谢卫路路口"
  ];
  // 相位名称 A 为 绿灯， B,C,D 为 红灯
  var phaseName = [
    ["A", "B", "C"],
    ["A", "B", "C"],
    ["A", "B", "C", "D"],
    ["A", "B", "C"],
    ["A", "B"],
    ["A", "B"]
  ];
  // 协调相位
  var coordinate = ["A", "A", "A", "A", "A", "A"];

  // 相位时长
  var phaseTime = [
    [92, 35, 33],
    [105, 25, 30],
    [51, 33, 38, 38],
    [84, 34, 43],
    [125, 35],
    [112, 42]
  ];
  var cycle = [160, 160, 160, 160, 160, 154]; // 周期
  var phaseDiff = [41, 20, 0, 115, 92, 49]; // 相位差
  var distance = [0, 349, 381, 452, 277, 541]; //第一位为第一根柱子和坐标轴的距离
  var green = [92, 105, 51, 84, 125, 112]; // 协调相位时长
  var red = [68, 55, 109, 76, 35, 42]; // 非协调相位时长
  var time = [
    0,
    35.56814437,
    54.20294733,
    52.84762046,
    26.98580922,
    47.18201591
  ];
  var speedData = [0, 9.8121, 7.029128, 8.55289, 10.264654, 11.46623325];
  var bottom = 50;
  var graphAttr = [];
  var graphs = [];
  var tempGraphArr = []; // 用于暂存需要绘制的图形
  var color = "";
  var dragGraph;

  dragGraph = function(x1, x2, y1, y2, color, canvas) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.canvas = canvas;
    this.color = color;
    this.context = canvas.getContext("2d");
    this.canvasPos = canvas.getBoundingClientRect(); // 获取元素的边界框
  };

  function drawChangeRect() {
    var phaseData = []; // 存放每个路口的左右数据
    var phaseNameData = [];
    for (var i = 0; i < roadName.length; i++) {
      Array.prototype.getNumArrayTotal = function(num) {
        var total = this.reduce(function(pre, cur, index, arr) {
          if (index > num - 1) {
            return pre + 0;
          }
          return pre + cur;
        });
        return total;
      };
      var remainder = phaseDiff[i] % cycle[i];
      // 如果余数为0
      if (remainder === 0) {
        smallAllPhase = phaseTime[i].concat(phaseTime[i]).concat(phaseTime[i]);
        smallAllPhaseName = phaseName[i]
          .concat(phaseName[i])
          .concat(phaseName[i]);
        phaseData.push(smallAllPhase);
        phaseNameData.push(smallAllPhaseName);
        for (var k = 0; k < smallAllPhaseName.length; k++) {
          color = smallAllPhaseName[k] === coordinate[i] ? "white" : "red"; // 获取颜色

          graphAttr.push({
            x1: (distance[i] + distance.getNumArrayTotal(i)) / 2 + 100,
            x2: (distance[i] + distance.getNumArrayTotal(i)) / 2 + 20 + 100,
            y1:
              canvas.height -
              (k === 0 ? 0 : smallAllPhase.getNumArrayTotal(k)) -
              bottom,
            y2:
              canvas.height -
              smallAllPhase.getNumArrayTotal(k + 1) -
              bottom +
              1,
            color: color,
            canvasobj: canvas
          });
        }
      } else {
        var endtempPhase = []; // 第三个周期的相位
        var endtempPhaseName = []; // 第三个周期的相位名称
        var starttempPhase = phaseTime[i].slice(); // 拷贝数组并且不改变原数组
        var starttempName = phaseName[i].slice();
        // 如果一个相位周期的长度为4
        if (phaseTime[i].length === 4) {
          if (
            // 相位差大于前三个值的和
            phaseDiff[i] >
            phaseTime[i][phaseTime[i].length - 1] +
              phaseTime[i][phaseTime[i].length - 2] +
              phaseTime[i][phaseTime[i].length - 3]
          ) {
            starttempPhase.unshift(
              phaseDiff[i] -
                (phaseTime[i][phaseTime[i].length - 1] +
                  phaseTime[i][phaseTime[i].length - 2] +
                  phaseTime[i][phaseTime[i].length - 3]),
              phaseTime[i][phaseTime[i].length - 3],
              phaseTime[i][phaseTime[i].length - 2],
              phaseTime[i][phaseTime[i].length - 1]
            );
            starttempName.push(
              phaseName[i][0],
              phaseName[i][1],
              phaseName[i][2],
              phaseName[i][3]
            );
            endtempPhaseName.unshift(coordinate[i]);
            endtempPhase.push(cycle[i] - phaseDiff[i]);
          }
          if (
            // 相位差大于最后两个值的和小于最后三个值的和
            phaseDiff[i] >
              phaseTime[i][phaseTime[i].length - 1] +
                phaseTime[i][phaseTime[i].length - 2] &&
            phaseDiff[i] <
              phaseTime[i][phaseTime[i].length - 1] +
                phaseTime[i][phaseTime[i].length - 2] +
                phaseTime[i][phaseTime[i].length - 3]
          ) {
            starttempPhase.unshift(
              phaseDiff[i] -
                (phaseTime[i][phaseTime[i].length - 1] +
                  phaseTime[i][phaseTime[i].length - 2]),
              phaseTime[i][phaseTime[i].length - 2],
              phaseTime[i][phaseTime[i].length - 1]
            );
            endtempPhase.push(
              phaseTime[i][0],
              cycle[i] - phaseDiff[i] - phaseTime[i][0]
            );
            starttempName.unshift(
              phaseName[i][1],
              phaseName[i][2],
              phaseName[i][3]
            );
            endtempPhaseName.push(phaseName[i][0], phaseName[i][1]);
          }
          // 相位差大于最后一个数的值小于最后两个数的值
          if (
            phaseDiff[i] > phaseTime[i][phaseTime[i].length - 1] &&
            phaseDiff[i] <
              phaseTime[i][phaseTime[i].length - 1] +
                phaseTime[i][phaseTime[i].length - 2]
          ) {
            starttempPhase.unshift(
              phaseDiff[i] - phaseTime[i][phaseTime[i].length - 1],
              phaseTime[i][phaseTime[i].length - 1]
            );
            endtempPhase.push(
              phaseTime[i][0],
              cycle[i] - phaseDiff[i] - phaseTime[i][0]
            );
            starttempName.unshift(phaseName[i][2], phaseName[i][3]);
            endtempPhaseName.push(phaseName[i][0], phaseName[i][1]);
          }
          // 相位差小于最后一个数的值
          if (phaseDiff[i] < phaseTime[i][phaseTime[i].length - 1]) {
            starttempPhase.unshift(phaseDiff[i]);
            endtempPhase.push(
              phaseTime[i][0],
              phaseTime[i][1],
              phaseTime[i][2],
              phaseTime[i][phaseTime[i].length - 1] - phaseDiff[i]
            );
            starttempName.unshift(phaseName[i][3]);
            endtempPhaseName.push(
              phaseName[i][0],
              phaseName[i][1],
              phaseName[i][2],
              phaseName[i][3]
            );
          }
        }
        // 如果一个相位周期的长度为3
        if (phaseTime[i].length === 3) {
          if (phaseDiff[i] < phaseTime[i][phaseTime[i].length - 1]) {
            var starttempPhase = phaseTime[i].slice(); // 拷贝数组并且不改变原数组
            starttempPhase.unshift(phaseDiff[i]);
            starttempName.unshift(phaseName[i][phaseName[i].length - 1]);
            endtempPhase.push(
              phaseTime[i][0],
              phaseTime[i][1],
              phaseTime[i][phaseTime[i].length - 1] - phaseDiff[i]
            );
            endtempPhaseName.push(
              phaseName[i][0],
              phaseName[i][1],
              phaseName[i][2]
            );
          }
          if (
            phaseDiff[i] > phaseTime[i][phaseTime[i].length - 1] &&
            phaseDiff[i] <
              phaseTime[i][phaseTime[i].length - 1] +
                phaseTime[i][phaseTime[i].length - 2]
          ) {
            starttempPhase.unshift(
              phaseDiff[i] - phaseTime[i][phaseTime[i].length - 1],
              phaseTime[i][phaseTime[i].length - 1]
            );
            starttempName.unshift(phaseName[i][2], phaseName[i][3]);
            endtempPhase.push(
              phaseTime[i][0],
              cycle[i] - phaseDiff[i] - phaseTime[i][0]
            );
            endtempPhaseName.push(phaseName[i][0], phaseName[i][1]);
          }
          if (
            phaseDiff[i] >
            phaseTime[i][phaseTime[i].length - 1] +
              phaseTime[i][phaseTime[i].length - 2]
          ) {
            starttempPhase.unshift(
              phaseDiff[i] -
                (phaseTime[i][phaseTime[i].length - 1] +
                  phaseTime[i][phaseTime[i].length - 2]),
              phaseTime[i][phaseTime[i].length - 2],
              phaseTime[i][phaseTime[i].length - 1]
            );
            endtempPhase.push(cycle[i] - phaseDiff[i]);
            starttempName.unshift(
              phaseName[i][0],
              phaseName[i][1],
              phaseName[i][2]
            );
            endtempPhaseName.push(phaseName[i][0]);
          }
        }
        // 如果一个相位周期的长度为2
        if (phaseTime[i].length === 2) {
          if (phaseDiff[i] > phaseTime[i][phaseTime[i].length - 1]) {
            starttempPhase.unshift(
              phaseDiff[i] - phaseTime[i][phaseTime[i].length - 1],
              phaseTime[i][phaseTime[i].length - 1]
            );
            endtempPhase.push(cycle[i] - phaseDiff[i]);
            starttempName.push("A", "B");
            endtempPhaseName.push("A");
          }
          if (phaseDiff[i] < phaseTime[i][phaseTime[i].length - 1]) {
            starttempPhase.unshift(phaseDiff[i]);
            // 最后一个周期为周期第一个数，相位差减去周期第一个数
            endtempPhase.push(
              phaseTime[i][phaseTime[i].length - 1],
              phaseDiff[i] - phaseTime[i][phaseTime[i].length - 1]
            );
            starttempName.unshift(phaseName[i][2]);
            endtempPhaseName.push(phaseName[i][0], phaseName[i][1]);
          }
        }
        // 一个周期的长度为1
        if (phaseTime[i].length === 1) {
          starttempPhase.unshift(phaseTime[i][0]);
          endtempPhase.push(cycle[i] - phaseDiff[i]);
          starttempName.unshift(phaseName[i][0]);
          endtempPhaseName.push(phaseName[i][0]);
        }

        var smallAllPhase = starttempPhase
          .concat(phaseTime[i])
          .concat(endtempPhase);
        var smallAllPhaseName = starttempName
          .concat(phaseName[i])
          .concat(endtempPhaseName);

        phaseData.push(smallAllPhase);
        phaseNameData.push(smallAllPhaseName);

        for (var k = 0; k < smallAllPhaseName.length; k++) {
          color = smallAllPhaseName[k] === coordinate[i] ? "white" : "red"; // 获取颜色
          graphAttr.push({
            x1: (distance[i] + distance.getNumArrayTotal(i)) / 2 + 100,
            x2: (distance[i] + distance.getNumArrayTotal(i)) / 2 + 20 + 100,
            y1:
              canvas.height -
              (k === 0 ? 0 : smallAllPhase.getNumArrayTotal(k)) -
              bottom,
            y2:
              canvas.height -
              smallAllPhase.getNumArrayTotal(k + 1) -
              bottom +
              1,
            color: color,
            canvasobj: canvas
          });
        }
        for (var j = 0; j < smallAllPhaseName.length; j++) {
          if (smallAllPhaseName[j] === "A") {
            // 所有绿灯的起点
            // console.log('smallAllPhaseName[j]', smallAllPhase.getNumArrayTotal(j))
          }
        }
      }
    }

    dragGraph.prototype = {
      paint: function() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;
        this.shapeDraw();
        this.context.fill();
        this.context.closePath();
      },
      isMouseInGraph: function(mouse) {
        this.context.beginPath();
        this.shapeDraw();
        return this.context.isPointInPath(mouse.x, mouse.y);
      },
      erase: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      shapeDraw: function() {
        this.context.moveTo(this.x1, this.y1);
        this.context.lineTo(this.x2, this.y1);
        this.context.lineTo(this.x2, this.y2);
        this.context.lineTo(this.x1, this.y2);
      },
      drawBorder: function() {
        this.context.strokeStyle = "#7a7b7f";
        this.context.beginPath();
        this.context.moveTo(100, 50);
        this.context.lineTo(100, 550);
        this.context.moveTo(100, 550);
        this.context.lineTo(1700, 550);
        this.context.closePath();
        this.context.stroke();
        this.context.fillStyle = "grey ";
        this.context.lineWidth = 1;
        for (var i = 0; i < 10; i++) {
          // 纵坐标
          var colText = this.context.measureText((12 - i) * 500); // 检查字体的宽度
          this.context.fillText(
            i * 100,
            100 - colText.width,
            (distance.length - 1 - i) * 100 + 50
          );
          // 横坐标
          var rowText = this.context.measureText(distance[i]);
          this.context.fillText(i * 200, (i + 1) * 100, 570);
        }
      },
      drawGreenWave: function() {
        //  绘制绿波带
        var lastT1 = [];
        var lastT2 = [];
        var lastT21 = [];
        var nextT1 = [];
        var nextT2 = [];
        var subscript = []; // 下标  四个数组中的下标是相同的
        var lastT2Subscript = [];
        var newlastT2Subscript = [];
        var lastT1Data = []; // 所有绿灯段之前柱子的高度之和
        var lastT2Data1 = []; // 通过上顶边上顶点减去时间得到上顶边下顶点
        var lastT2Data = [];
        var nextT1Data = [];
        var nextT2Data = [];
        var greenWaveData = [];
        var newlast2 = [];
        // phaseData：每个路口的每个相位值   phaseNameData：每个路口的每个相位名称

        // 绿波底边下顶点
        for (var i = 0; i < phaseData.length; i++) {
          for (var j = 0; j < phaseData[i].length; j++) {
            if (phaseNameData[i][j] === "A") {
              lastT1.push(j === 0 ? 0 : phaseData[i].getNumArrayTotal(j));
            }
          }
        }

        for (var i = 0; i < lastT1.length; i++) {
          // 找到两个路口之间的间隔段
          if (lastT1[i] > lastT1[i + 1]) {
            subscript.push(i + 1);
          }
        }

        for (var i = 0; i < subscript.length; i++) {
          if (i === 0) {
            lastT1Data.push(lastT1.slice(0, subscript[0]));
          } else {
            lastT1Data.push(lastT1.slice(subscript[i - 1], subscript[i]));
          }
        }
        lastT1Data.push(
          lastT1.slice(subscript[subscript.length - 1], lastT1.length)
        );
        // 上顶边下顶点 第一种情况
        // 绿灯段上顶点距离坐标轴的距离
        for (var i = 0; i < phaseData.length; i++) {
          for (var j = 0; j < phaseData[i].length; j++) {
            if (phaseNameData[i][j] === "A") {
              lastT2.push(
                (j === 0 ? 0 : phaseData[i].getNumArrayTotal(j)) +
                  phaseData[i][j]
              );
            }
          }
        }
        for (var i = 0; i < subscript.length; i++) {
          if (i === 0) {
            lastT2Data.push(lastT2.slice(0, subscript[0]));
          } else {
            lastT2Data.push(lastT2.slice(subscript[i - 1], subscript[i]));
          }
        }
        lastT2Data.push(
          lastT2.slice(subscript[subscript.length - 1], lastT2.length)
        );
        newlast2 = lastT2Data.slice(1, lastT2Data.length);
        // 绿波底边上顶点
        for (var i = 0; i < lastT1Data.length; i++) {
          for (var j = 0; j < lastT1Data[i].length; j++) {
            nextT1.push(lastT1Data[i][j] + time[i + 1]);
          }
        }
        for (var i = 0; i < subscript.length; i++) {
          if (i === 0) {
            nextT1Data.push(nextT1.slice(0, subscript[0]));
          } else {
            nextT1Data.push(nextT1.slice(subscript[i - 1], subscript[i]));
          }
        }
        nextT1Data.push(
          nextT1.slice(subscript[subscript.length - 1], nextT1.length)
        );

        // 绿波带顶边上顶点
        for (var i = 0; i < phaseData.length; i++) {
          for (var j = 0; j < phaseData[i].length; j++) {
            if (phaseNameData[i][j] === "A") {
              nextT2.push(
                (j === 0 ? 0 : phaseData[i].getNumArrayTotal(j)) +
                  phaseData[i][j]
              );
            }
          }
        }
        for (var i = 0; i < nextT2.length; i++) {
          if (nextT2[i] > nextT2[i + 1]) {
            lastT2Subscript.push(i + 1);
          }
        }

        for (var i = 0; i < lastT2Subscript.length; i++) {
          if (i === 0) {
            nextT2Data.push(nextT2.slice(0, subscript[0]));
          } else {
            nextT2Data.push(
              nextT2.slice(lastT2Subscript[i - 1], lastT2Subscript[i])
            );
          }
        }
        nextT2Data.push(
          nextT2.slice(
            lastT2Subscript[lastT2Subscript.length - 1],
            nextT2.length
          )
        );

        // 上顶边下顶点 第二种情况
        for (var i = 0; i < newlast2.length; i++) {
          for (var j = 0; j < newlast2[i].length; j++) {
            lastT21.push(newlast2[i][j] - time[i + 1]);
          }
        }
        for (var i = 0; i < lastT21.length; i++) {
          if (lastT21[i] > lastT21[i + 1]) {
            newlastT2Subscript.push(i + 1);
          }
        }
        for (var i = 0; i < subscript.length; i++) {
          if (i === 0) {
            lastT2Data1.push(lastT21.slice(0, newlastT2Subscript[0]));
          } else {
            lastT2Data1.push(
              lastT21.slice(newlastT2Subscript[i - 1], newlastT2Subscript[i])
            );
          }
        }
        lastT2Data1.push(
          lastT21.slice(
            newlastT2Subscript[newlastT2Subscript.length - 1],
            lastT21.length
          )
        );

        // 绘制绿波带
        for (var i = 0; i < lastT1Data.length - 1; i++) {
          for (var j = 0; j < lastT1Data[i].length; j++) {
            // 第一种情况
            if (
              lastT2Data[i][j] + time[i] > lastT1Data[i + 1][j + 1] &&
              lastT2Data[i][j] + time[i] < lastT2Data[i + 1][j + 1] &&
              lastT1Data[i + 1][j + 1] - time[i + 1] < lastT2Data[i][j]
            ) {
              ctx.beginPath();
              // 左下
              ctx.moveTo(
                distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                canvas.height -
                  bottom -
                  (lastT1Data[i + 1][j + 1] - time[i + 1])
              );
              // 左上
              ctx.lineTo(
                distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                canvas.height - bottom - lastT2Data[i][j]
              );
              // 右上
              ctx.lineTo(
                distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                canvas.height - bottom - (lastT2Data[i][j] + time[i + 1])
              );
              // 右下
              ctx.lineTo(
                distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                canvas.height - bottom - lastT1Data[i + 1][j + 1]
              );
              ctx.fillStyle = "#80aa33";
              ctx.globalAlpha = 0.7;
              ctx.closePath();
              ctx.fill();
            }

            // 第二种情况
            if (
              // 以绿灯段底边和lastT1Data为起点，如果lastT1Data+t在lastT1Data 和 绿灯段顶边和lastT2Data中间
              nextT1Data[i][j] >= lastT1Data[i][j] &&
              nextT1Data[i][j] < lastT2Data[i][j]
            ) {
              // 第二种情况的第一种情况
              if (lastT2Data1[i][j] > lastT2Data[i][j]) {
              }
              // 第二种情况的第二种情况
              if (
                lastT2Data1[i][j] > lastT1Data[i][j] &&
                lastT2Data1[i][j] < lastT2Data[i][j] &&
                nextT2Data[i + 1][j] > nextT1Data[i + 1][j]
              ) {
                ctx.beginPath();
                // 左下
                ctx.moveTo(
                  distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                  canvas.height - bottom - lastT1Data[i][j]
                );
                // 左上
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                  canvas.height - bottom - lastT2Data1[i][j]
                );
                // 右上
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                  canvas.height - bottom - nextT2Data[i + 1][j]
                );
                // 右下
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                  canvas.height - bottom - nextT1Data[i][j]
                );
                ctx.fillStyle = "#80aa33";
                ctx.globalAlpha = 0.7;
                ctx.closePath();
                ctx.fill();
              }
              if (
                lastT2Data[i][j] + time[i] > lastT1Data[i + 1][j + 1] &&
                lastT2Data[i][j] + time[i] < lastT2Data[i + 1][j + 1] &&
                lastT1Data[i + 1][j + 1] - time[i + 1] < lastT2Data[i][j] &&
                lastT1Data[i][j] < lastT2Data1[i][j]
              ) {
                ctx.beginPath();
                // 左下
                ctx.moveTo(
                  distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                  canvas.height - bottom - lastT1Data[i][j]
                );
                // 左上
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 1) / 2 + 100 + 10,
                  canvas.height - bottom - lastT2Data1[i][j]
                );
                // 右上
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                  canvas.height - bottom - nextT2Data[i + 1][j]
                );
                // 右下
                ctx.lineTo(
                  distance.getNumArrayTotal(i + 2) / 2 + 100 + 10,
                  canvas.height - bottom - nextT1Data[i][j]
                );
                ctx.fillStyle = "#80aa33";
                ctx.globalAlpha = 0.7;
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }
      }
    };
    ///
    var totalData = [];
    var totalDataSlice = [];
    var totalDataSub = [];
    var graphsSlice = [];
    for (var i = 0; i < phaseData.length; i++) {
      for (var j = 0; j < phaseData[i].length; j++) {
        if (j == 0) {
          totalData.push(0);
        } else {
          totalData.push(phaseData[i].getNumArrayTotal(j));
        }
      }
    }
    for (var i = 0; i < totalData.length; i++) {
      // 找到两个路口之间的间隔段
      if (totalData[i] > totalData[i + 1]) {
        totalDataSub.push(i + 1);
      }
    }
    for (var i = 0; i < totalDataSub.length; i++) {
      if (i === 0) {
        totalDataSlice.push(totalData.slice(0, totalDataSub[0]));
      } else {
        totalDataSlice.push(
          totalData.slice(totalDataSub[i - 1], totalDataSub[i])
        );
      }
    }
    totalDataSlice.push(
      totalData.slice(totalDataSub[totalDataSub.length - 1], totalData.length)
    );
    ////
    canvas.addEventListener(
      "mousedown",
      function(e) {
        // 表示为鼠标在canvas画布上的位置
        var mouse = {
          // x 的值为相对于屏幕的距离减去画布左边界相对于屏幕的距离
          // y 的值为相对于屏幕的距离减去画布上边界相对于屏幕的距离
          x: e.clientX - canvas.getBoundingClientRect().left,
          y: e.clientY - canvas.getBoundingClientRect().top
        };

        // 遍历所有图形并绘制
        graphs.forEach(function(shape) {
          // 记录鼠标与元素的距离
          var offset = {
            x1: mouse.x - shape.x1,
            x2: mouse.x - shape.x2,
            y1: mouse.y - shape.y1,
            y2: mouse.y - shape.y2
          };
          if (shape.isMouseInGraph(mouse)) {
            for (var i = 0; i < totalDataSlice.length; i++) {
              for (var j = 0; j < totalDataSlice[i].length; j++) {
                if (
                  canvas.height - totalDataSlice[i][j] - bottom ===
                  shape.y1
                ) {
                  console.log("shape", shape);
                  console.log("i", i);
                  console.log("j", parseInt(j / 3) + 1);
                }
              }
            }
            // 如果鼠标的点在图形上
            // shape为当前点击的图形
            tempGraphArr.push(shape); // 在用于暂存图形的数组中存入所有图形
            canvas.addEventListener(
              "mousemove",
              function(e) {
                // 用于存放移动过程中所有相对于画布的点

                mouse = {
                  x: e.clientX - canvas.getBoundingClientRect().left,
                  y: e.clientY - canvas.getBoundingClientRect().top
                };
                if (
                  shape === tempGraphArr[tempGraphArr.length - 1] &&
                  shape.y1 >= shape.y2
                ) {
                  // 保证只能上下移动
                  shape.x1 = shape.x1;
                  shape.x2 = shape.x2;
                  shape.y1 = shape.y1;
                  shape.y2 = mouse.y - offset.y2;
                  shape.erase();
                  drawGraph();
                }
              },
              false
            );

            // 鼠标抬起即停止拖动时将暂存数组置为空
            canvas.addEventListener(
              "mouseup",
              function() {
                tempGraphArr = [];
              },
              false
            );
          }
        });
        e.preventDefault();
      },
      false
    );
    for (var i = 0; i < graphAttr.length; i++) {
      var graph = new dragGraph(
        graphAttr[i].x1,
        graphAttr[i].x2,
        graphAttr[i].y1,
        graphAttr[i].y2,
        graphAttr[i].color,
        graphAttr[i].canvasobj
      );
      graphs.push(graph);
    }

    for (var i = 0; i < totalDataSub.length; i++) {
      if (i === 0) {
        graphsSlice.push(graphs.slice(0, totalDataSub[0]));
      } else {
        graphsSlice.push(graphs.slice(totalDataSub[i - 1], totalDataSub[i]));
      }
    }
    graphsSlice.push(
      graphs.slice(totalDataSub[totalDataSub.length - 1], graphs.length)
    );

    function drawGraph() {
      for (var i = 0; i < graphAttr.length; i++) {
        graphs[i].paint();
      }
      graphs[0].drawBorder();
      graphs[0].drawGreenWave();
    }
    drawGraph();
  }

  drawChangeRect();
};
export default greenWave;
