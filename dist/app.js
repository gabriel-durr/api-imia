"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _datajson = require('./data/data.json'); var _datajson2 = _interopRequireDefault(_datajson);
var _dataxjson = require('./data/datax.json'); var _dataxjson2 = _interopRequireDefault(_dataxjson);
var _RadarChartUtils = require('./utils/RadarChartUtils');

const app = _express2.default.call(void 0, );

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Server Runing 🛅" + PORT);
});

app.get("/", (req, res) => {
	var labels = _RadarChartUtils.getLabels.call(void 0, _dataxjson2.default);

	const graphData = _RadarChartUtils.Unpack.call(void 0, _dataxjson2.default, labels);
	const graphStructure = _RadarChartUtils.generateGraph.call(void 0, graphData);

	res.json({
		data: _datajson2.default,
		dataObject: Object.keys(_datajson2.default[0]),
		graph: graphData,
		graphStruct: graphStructure,
	});
});
