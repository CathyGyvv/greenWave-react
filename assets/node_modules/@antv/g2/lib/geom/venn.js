function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview Venn Diagram
 * @author leungwensen@gmail.com
 */
var GeomBase = require('./base');

var Util = require('../util');

var _require = require('venn.js'),
    venn = _require.venn,
    scaleSolution = _require.scaleSolution,
    circlePath = _require.circlePath,
    intersectionAreaPath = _require.intersectionAreaPath,
    computeTextCentres = _require.computeTextCentres;

require('./shape/venn');

var Venn =
/*#__PURE__*/
function (_GeomBase) {
  _inheritsLoose(Venn, _GeomBase);

  function Venn() {
    return _GeomBase.apply(this, arguments) || this;
  }

  var _proto = Venn.prototype;

  /**
   * get default configuration
   * @protected
   * @return {Object} configuration
   */
  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _GeomBase.prototype.getDefaultCfg.call(this);

    cfg.type = 'venn';
    cfg.shapeType = 'venn';
    cfg.generatePoints = true; // super.draw(data, container, shapeFactory, index);

    return cfg;
  };

  _proto._initAttrs = function _initAttrs() {
    var self = this;
    var attrOptions = self.get('attrOptions');
    var labelCfg = self.get('labelCfg');
    var data = self.get('data');
    var sizeField = attrOptions.size ? attrOptions.size.field : 'size';
    var labelField = labelCfg ? labelCfg.fields[0] : 'sets';
    self.set('labelCfg', null); // prepare data

    data.forEach(function (row) {
      row.sets = row[labelField];
      row.size = row[sizeField];
    });
    var solution = venn(data); // scaling

    var coord = self.get('coord');
    var xRange = [Math.min(coord.x.end, coord.x.start), Math.max(coord.x.end, coord.x.start)];
    var yRange = [Math.min(coord.y.end, coord.y.start), Math.max(coord.y.end, coord.y.start)];
    var width = xRange[1] - xRange[0];
    var height = yRange[1] - yRange[0];
    var styleOptions = self.get('styleOptions');
    var padding = styleOptions && Util.isObject(styleOptions.style) ? styleOptions.style.padding : 0;

    if (!Util.isFinite(padding)) {
      padding = 0;
    }

    var circles = scaleSolution(solution, width, height, padding);
    var textCenters = computeTextCentres(circles, data);
    data.forEach(function (row) {
      var sets = row.sets;
      var id = sets.join(',');
      row.id = id;

      if (sets.length === 1) {
        var circle = circles[id];
        row.path = circlePath(circle.x, circle.y, circle.radius);
        Util.assign(row, circle);
      } else {
        var setCircles = sets.map(function (set) {
          return circles[set];
        });
        var path = intersectionAreaPath(setCircles);

        if (!/[zZ]$/.test(path)) {
          path += 'Z';
        }

        row.path = path;
        var center = textCenters[id] || {
          x: 0,
          y: 0
        };
        Util.assign(row, center);
      }
    }); // x, y scales

    self.position('x*y');

    _GeomBase.prototype._initAttrs.call(this);
  };

  _proto.paint = function paint() {
    _GeomBase.prototype.paint.call(this);

    var self = this;
    var dataArray = self.get('dataArray');
    var shapeContainer = self.get('shapeContainer'); // add labels

    dataArray.forEach(function (row) {
      var cfg = self.getDrawCfg(row[0]);
      var origin = cfg.origin._origin;
      shapeContainer.addShape('text', {
        attrs: Util.mix({}, {
          x: origin.x,
          y: origin.y,
          text: origin.label || '',
          fontSize: 18,
          fill: cfg.shape === 'hollow' ? cfg.color : '#666',
          textAlign: 'center',
          textBaseline: 'middle'
        }, cfg.style ? cfg.style.textStyle : {})
      });
    });
  };

  return Venn;
}(GeomBase);

GeomBase.Venn = Venn;
module.exports = Venn;