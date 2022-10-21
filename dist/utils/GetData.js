"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodefetch = require('node-fetch'); var _nodefetch2 = _interopRequireDefault(_nodefetch);

 const GetData = async(page) => {
	let newPage = page + 1;

	const response = await _nodefetch2.default.call(void 0, `https://jmod-s.herokuapp.com//mgf/${newPage}`)
	const data = await response.json();
    console.log(data);
    return data;
}; exports.GetData = GetData;
