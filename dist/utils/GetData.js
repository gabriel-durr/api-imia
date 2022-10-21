"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const GetData = page => {
	let newPage = page + 1;

	var result;

	fetch(`https://jmod-s.herokuapp.com//mgf/${newPage}`)
		.then(res => res.json())
		.then(data => {
			return data;
		})
		.catch(e => console.log(e));
}; exports.GetData = GetData;
