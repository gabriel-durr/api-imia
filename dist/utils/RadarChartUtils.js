"use strict";Object.defineProperty(exports, "__esModule", {value: true});const ty3 = [-1.0, 0, 1.0];
const tz3 = [-0.5, 1.0, -0.5];

const ty4 = [1.0, -1.0, -1.0, 1.0];
const tz4 = [-1.0, -1.0, 1.0, 1.0];

const ty5 = [0.75, -0.75, -1.0, 0, 1.0];
const tz5 = [-0.5, -0.5, 0.5, 1.0, 0.5];

const ty6 = [1.0, 0, -1.0, -1.0, 0, 1.0];
const tz6 = [-0.5, -1.0, -0.5, 0.5, 1.0, 0.5];

 const getLabels = data => {
	var labels = Object.keys(data);
	return labels;
}; exports.getLabels = getLabels;

 const selectTemplate = labels_list => {
	switch (labels_list.length) {
		case 3:
			return {y: ty3, z: tz3};
		case 4:
			return {y: ty4, z: tz4};
		case 5:
			return {y: ty5, z: tz5};
		case 6:
			return {y: ty6, z: tz6};
		default:
			return {y: ty3, z: tz3};
	}
}; exports.selectTemplate = selectTemplate;

const setColor = (value, limiar) => {
	let scale = value;
	if (scale < 4) {
		return "red";
	} else if (scale >= 4 && scale < 7) {
		return "darkorange";
	} else {
		return "teal";
	}
};

 const Unpack = (row, labels) => {
	var result = [];
	var keys = [];
	var points = [];
	var pointLine = [];
	var limiarLine = [];
	const NUMBER_LABELS = 100;

	console.log(row)
	console.log(labels)
	const template = exports.selectTemplate.call(void 0, labels);

	keys = Object.keys(row[labels[0]].Dados);
	console.log(keys)

	keys.forEach(
		(element, i) => {
			var arrX = [];
			var arrY = [];
			var arrZ = [];
			var lX = [];
			var lY = [];
			var lZ = [];
			var color = [];
			var labelsList = [];

			labels.forEach((label, i) => {
				arrX.push(element);
				lX.push(element);
				arrY.push(
					row[label].Dados[element] * (template.y[i] / 1000)
				);
				arrZ.push(
					row[label].Dados[element] * (template.z[i] / 1000)
				);
				lY.push(row[label].Limiar * (template.y[i] / 1000));
				lZ.push(row[label].Limiar * (template.z[i] / 1000));
				color.splice(
					Math.ceil(color.length / 2),
					0,
					setColor(row[label].Dados[element], row[label].Limiar)
				);
				color.push("salmon");
				labelsList.push(
					`${label}: ${row[label].Dados[element]} - ${row[label].Limiar}`
				);
			});

			color.splice(color.length / 2, 0, "transparent");
			color.push("transparent");

			arrX.push(arrX[0]);
			arrY.push(arrY[0]);
			arrZ.push(arrZ[0]);

			lX.push(lX[0]);
			lY.push(lY[0]);
			lZ.push(lZ[0]);

			points.push({
				id: "points",
				x: [...arrX, ...lX],
				y: [...arrY, ...lY],
				z: [...arrZ, ...lZ],
				type: "scatter3d",
				mode: "markers",
				text: [...labelsList],
				marker: {
					color: color,
					opacity: 1,
				},
				hoverinfo: "none",
				showlegend: false,
			});

			// result.push({
			// 	title: Object.keys(row[0])[0],
			// 	hoverLabels: labelsList,
			// 	x: arrX,
			// 	y: arrY,
			// 	z: arrZ,
			// 	limiarX: lX,
			// 	limiarY: lY,
			// 	limiarZ: lZ,
			// 	color: color,
			// });
		}
	);

	pointLine.push({
		id: "points_line",
		x: points[points.length - 1].x.slice(
			0,
			points[points.length - 1].x.length / 2,
			0
		),
		y: points[points.length - 1].y.slice(
			0,
			points[points.length - 1].y.length / 2,
			0
		),
		z: points[points.length - 1].z.slice(
			0,
			points[points.length - 1].z.length / 2,
			0
		),
		type: "scatter3d",
		mode: "lines+text",
		text: [...points[points.length - 1].text],
		line: {
			color: "red",
			width: 7,
		},
		textfont: {
			family: "sans serif",
			size: 18,
			color: "black",
			opacity: 1,
		},
		hoverinfo: "none",
		showlegend: false,
	});
	limiarLine.push({
		id: "points_limiar",
		x: points[points.length - 1].x.slice(
			points[points.length - 1].x.length / 2,
			points[points.length - 1].x.length,
			0
		),
		y: points[points.length - 1].y.slice(
			points[points.length - 1].y.length / 2,
			points[points.length - 1].y.length,
			0
		),
		z: points[points.length - 1].z.slice(
			points[points.length - 1].z.length / 2,
			points[points.length - 1].z.length,
			0
		),
		type: "scatter3d",
		mode: "lines",
		line: {
			color: "salmon",
			width: 7,
		},
		showlegend: false,
		hoverinfo: "none",
	});

	return {
		dataGraph: points,
		pointLine: pointLine,
		limiarLine: limiarLine,
	};
}; exports.Unpack = Unpack;