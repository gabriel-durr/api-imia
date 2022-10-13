import express from "express";
import data from "./data/data.json" assert {type: "json"};
import datax from "./data/datax.json" assert {type: "json"};
import {Unpack, getLabels, generateGraph} from "./utils/RadarChartUtils";

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Server Runing 🛅" + PORT);
});

app.get("/", (req, res) => {
	var labels = getLabels(datax);

	const graphData = Unpack(datax, labels);
	const graphStructure = generateGraph(graphData);

	res.json({
		data: data,
		dataObject: Object.keys(data[0]),
		graph: graphData,
		graphStruct: graphStructure,
	});
});
