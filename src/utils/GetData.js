import fetch from 'node-fetch';

export const GetData = async(page) => {
	let newPage = page + 1;

	const response = await fetch(`https://jmod-s.herokuapp.com//mgf/${newPage}`)
	const data = await response.json();
    console.log(data);
    return data;
};
