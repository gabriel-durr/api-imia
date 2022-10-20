import express from "express";
import data from "./data/data.json" assert {type: "json"};
import datax from "./data/datax.json" assert {type: "json"};
import {Unpack, getLabels, generateGraph} from "./utils/RadarChartUtils";
import cors from "cors";

const app = express();

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
	app.use(cors());
	next();
});

// Manipulation

app.get("/", (req, res) => {
	var labels = getLabels(datax);

	const graphData = Unpack(datax, labels);
	const graphStructure = generateGraph(graphData);

	res.json({
		data: data,
		dataObject: Object.keys(data[0]),
		graphStruct: graphStructure,
	});
});
