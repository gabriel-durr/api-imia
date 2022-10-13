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

export const generateFrames = data => {
	var lenValues = data[0].hoverValues.length;

	for (var i = 0; i < lenValues - 1; i++) {
		var values = [];
		data.forEach(element => {
			values.push(element.hoverValues[i]);
		});
	}
	return data;
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

	const template = selectTemplate(labels);

	labels.forEach(label => {
		keys = Object.keys(row[0][label].Dados);
	});

	keys.forEach(element => {
		var arrX = [];
		var arrY = [];
		var arrZ = [];
		var lX = [];
		var lY = [];
		var lZ = [];
		var values = {};
		var limiar = [];
		var color = [];

		labels.forEach((label, i) => {
			arrX.push(element);
			lX.push(element);
			arrY.push(row[0][label].Dados[element] * (template.y[i] / 1000));
			arrZ.push(row[0][label].Dados[element] * (template.z[i] / 1000));
			lY.push(row[0][label].Limiar * (template.y[i] / 1000));
			lZ.push(row[0][label].Limiar * (template.z[i] / 1000));
			values[label] = row[0][label].Dados[element];
			limiar.push(row[0][label].Limiar);
			color.push(
				setColor(row[0][label].Dados[element], row[0][label].Limiar)
			);
		});

		color.push("transparent");

		arrX.push(arrX[0]);
		arrY.push(arrY[0]);
		arrZ.push(arrZ[0]);

		lX.push(lX[0]);
		lY.push(lY[0]);
		lZ.push(lZ[0]);

		result.push({
			hoverLabels: labels,
			hoverValues: values,
			x: arrX,
			y: arrY,
			z: arrZ,
			limiarX: lX,
			limiarY: lY,
			limiarZ: lZ,
			limiarData: limiar,
			lineColor: "transparent",
			limiarColor: "transparent",
			color: color,
		});
	});

	return result;
};

//create hover data template
const createHoverLabels = (hoverLabels, hoverValues, limiar) => {
	var text = "<br>";
	hoverLabels.forEach((label, i) => {
		text =
			text + `${label}: ${hoverValues[label]} Limiar: ${limiar[i]}<br>`;
	});
	return text;
};

export const generateGraph = data => {
	const points = [];
	const limiar = [];
	const labels = data[data.length - 1];
	const graphLabels = [];

	data.forEach(element => {
		points.push({
			id: "points",
			frame: element,
			x: element.x,
			y: element.y,
			z: element.z,
			type: "scatter3d",
			mode: "markers+lines",
			text: element.hoverLabels,
			marker: {
				color: element.color,
				opacity: 0.6,
			},
			line: {
				color: element.lineColor,
				width: 7,
			},
			showlegend: false,
			hovertemplate: `<b>Data da coleta: %{x}</b>
			${createHoverLabels(
				element.hoverLabels,
				element.hoverValues,
				element.limiarData
			)}`,
			hoverlabel: {
				bgcolor: "#FFF",
			},
		});

		limiar.push({
			id: "limiar",
			frame: element,

			x: element.limiarX,
			y: element.limiarY,
			z: element.limiarZ,
			type: "scatter3d",
			mode: "markers+lines",
			marker: {
				color: "salmon",
				opacity: 0.6,
			},
			line: {
				color: element.limiarColor,
				width: 7,
			},
			hovertemplate: `<b>Data da coleta: %{x}</b>
			${createHoverLabels(
				element.hoverLabels,
				element.hoverValues,
				element.limiarData
			)}`,
			hoverlabel: {
				bgcolor: "#FFF",
			},
			showlegend: false,
		});
	});

	graphLabels.push({
		id: "Label",
		frame: labels,
		x: labels.limiarX,
		y: labels.limiarY,
		z: labels.limiarZ,
		type: "scatter3d",
		mode: "text",
		text: {
			font_size: 50,
			font_family: "Rockwell",
		},
		text: [...labels.hoverLabels],
		showlegend: false,
		hovertemplate: `<b>Data da coleta: %{x}</b>
        ${createHoverLabels(
			labels.hoverLabels,
			labels.hoverValues,
			labels.limiarData
		)}`,
		hoverlabel: {
			bgcolor: "#FFF",
		},
	});

	return {
		dataGraph: points,
		limiarGraph: limiar,
		labels: graphLabels,
		initFrameNumber: data.length - 1,
	};
};
