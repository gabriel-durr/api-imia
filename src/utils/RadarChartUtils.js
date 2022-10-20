const ty3 = [-1.0, 0, 1.0];
const tz3 = [-0.5, 1.0, -0.5];

export const getLabels = data => {
	var labels = Object.keys(data[0]);
	labels.shift();
	return labels;
};

export const selectTemplate = labels_list => {
	switch (labels_list.length) {
		case 3:
			return {y: ty3, z: tz3};
		default:
			return {y: ty3, z: tz3};
	}
};

const setColor = (value, limiar) => {
	let scale = (value * 25) / limiar;
	if (scale < 30) {
		return "red";
	} else if (scale >= 30 && scale < 70) {
		return "darkorange";
	} else {
		return "teal";
	}
};

export const Unpack = (row, labels) => {
	var result = [];
	var keys = [];
	const NUMBER_LABELS = 40;

	const template = selectTemplate(labels);

	keys = Object.keys(row[0][labels[0]].Dados);
	
	keys.slice(0,NUMBER_LABELS,0).forEach((element, i) => {
		
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
			arrY.push(row[0][label].Dados[element] * (template.y[i] / 1000));
			arrZ.push(row[0][label].Dados[element] * (template.z[i] / 1000));
			lY.push(row[0][label].Limiar * (template.y[i] / 1000));
			lZ.push(row[0][label].Limiar * (template.z[i] / 1000));
			color.splice(Math.ceil(color.length/2), 0,
				setColor(row[0][label].Dados[element], row[0][label].Limiar)
			);
			color.push("salmon")
			labelsList.push(
				`${label}: ${row[0][label].Dados[element]} - ${row[0][label].Limiar}`
			);
			
		});

		color.splice(color.length/2,0,"transparent");
		color.push("transparent");
		

		arrX.push(arrX[0]);
		arrY.push(arrY[0]);
		arrZ.push(arrZ[0]);

		lX.push(lX[0]);
		lY.push(lY[0]);
		lZ.push(lZ[0]);

		result.push({
			title: Object.keys(row[0])[0],
			hoverLabels: labelsList,
			x: arrX,
			y: arrY,
			z: arrZ,
			limiarX: lX,
			limiarY: lY,
			limiarZ: lZ,
			color: color,
		});
	});

	return result;
};



export const generateGraph = data => {
	const points = [];
	const pointLine = [];
	const limiarLine = [];
	const title = data[0].title;

	data.forEach(element => {
		points.push({
			id: "points",
			x: [...element.x, ...element.limiarX],
			y: [...element.y, ...element.limiarY],
			z: [...element.z, ...element.limiarZ],
			type: "scatter3d",
			mode: "markers",
			text: [...element.hoverLabels],
			marker: {
				color: element.color,
				opacity: 1,
			},
			hoverinfo: "none",
			showlegend: false,
		});

	});
	pointLine.push({
		id: "points_line",
		x: data[data.length -1].x,
		y: data[data.length -1].y,
		z: data[data.length -1].z,
		type: "scatter3d",
		mode: "lines+text",
		text: [...data[data.length -1].hoverLabels],
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
		x: data[data.length -1].limiarX,
		y: data[data.length -1].limiarY,
		z: data[data.length -1].limiarZ,
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
		title: title,
		dataGraph: points,
		pointLine: pointLine,
		limiarLine: limiarLine,
	};
};
