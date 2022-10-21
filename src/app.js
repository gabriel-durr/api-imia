import express from "express";
import data2 from "./data/data2.json" assert {type: "json"};
import datax from "./data/datax.json" assert {type: "json"};
import {Unpack, getLabels, generateGraph} from "./utils/RadarChartUtils";
import {GetData} from "./utils/GetData";
import cors from "cors";
import fetch from "node-fetch";

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

app.get("/", async(req, res) => {
	var labels = getLabels(datax);
	await fetch(`https://jmod-s.herokuapp.com/mgf/1`)
	.then(res => res.json())
	.then(data => {
		const title = Object.keys(data[0])[0];
		const graphData = Unpack(data[0][title], getLabels(data[0][title]));
		
		res.json({
			title: title,
			page: 1,
			graphStruct: graphData,
		})
	})
});

app.post("/next", async(req, res) => {
	if(req.method === "POST"){
		var page = req.body.page + 1;
		if(page > 7){
			page = 1;
		}
		await fetch(`https://jmod-s.herokuapp.com/mgf/${page}`)
		.then(res => res.json())
		.then(data => {
			const title = Object.keys(data[0])[0];
			const graphData = Unpack(data[0][title], getLabels(data[0][title]));
			
			res.json({
				title: title,
				page: page,
				graphStruct: graphData,
			})
		})
	}
});

app.post("/prev", async(req, res) => {
	if(req.method === "POST"){
		var page = req.body.page - 1;
		if(page < 1){
			page = 7;
		}
		await fetch(`https://jmod-s.herokuapp.com/mgf/${page}`)
		.then(res => res.json())
		.then(data => {
			const title = Object.keys(data[0])[0];
			const graphData = Unpack(data[0][title], getLabels(data[0][title]));
			
			res.json({
				title: title,
				page: page,
				graphStruct: graphData,
			})
		})
	}
});
