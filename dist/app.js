"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _datajson = require('./data/data.json'); var _datajson2 = _interopRequireDefault(_datajson);
var _dataxjson = require('./data/datax.json'); var _dataxjson2 = _interopRequireDefault(_dataxjson);
var _RadarChartUtils = require('./utils/RadarChartUtils');
var _GetData = require('./utils/GetData');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _nodefetch = require('node-fetch'); var _nodefetch2 = _interopRequireDefault(_nodefetch);

const app = _express2.default.call(void 0, );

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Server Runing 🛅" + PORT);
});

// CORS Headers

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
	res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	app.use(_cors2.default.call(void 0, ));
	next();
});

// Manipulation

app.get("/", async(req, res) => {
	var labels = _RadarChartUtils.getLabels.call(void 0, _dataxjson2.default);
	await _nodefetch2.default.call(void 0, `https://jmod-s.herokuapp.com/mgf/1`)
	.then(res => res.json())
	.then(data => {
		const title = Object.keys(data[0])[0];
		const graphData = _RadarChartUtils.Unpack.call(void 0, data[0][title], _RadarChartUtils.getLabels.call(void 0, data[0][title]));
		
		res.json({
			title: title,
			data: data,
			graphStruct: graphData,
		})
	})
	// const graphData = Unpack(datax, labels);

	// res.json({
	// 	data: data,
	// 	dataObject: Object.keys(data[0]),
	// 	graphStruct: graphData,
	// });
});

app.post("/next", (req, res) => {
	return res.json({})
});
