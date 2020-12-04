"use strict";

export const url = "http://127.0.0.1:8000/api";

//? Send AJAX request with fetch
export const sendAJAX = async function (method, url, data, csrf) {
	try {
		const res = await fetch(url, {
			method: method,
			body: JSON.stringify(data),
			headers: data
				? {
						"Content-Type": "application/json",
						"X-CSRFToken": csrf,
				  }
				: {},
		});
		if (res.status >= 400) {
			// Convert response to JavaScript object
			const errResponse = await res.json();
			const err = new Error("Something went wrong!!");
			err.data = errResponse;
			throw err;
		}
		const dataResponse = await res.json();
		console.log(dataResponse);
		return dataResponse;
	} catch (error) {
		throw error;
	}
};

//? Send AJAX request with XMLHttpRequest
/* 
export const sendJSON = (method, url, data) => {
	// Create a Promise object
	const promise = new Promise((resolve, reject) => {
		// Create XMLHttpRequest object
		const xhr = new XMLHttpRequest();
		// Open connection
		xhr.open(method, url);
		// Set response type //* To convert JSON into JavaScript object
		xhr.responseType = "json";
		// Set Header if data is present
		if (data) {
			xhr.setRequestHeader("Content-Type", "application/json");
		}
		// Set resolve
		xhr.onload = () => {
			// check http status code
			if (xhr.status <= 400) {
				resolve(xhr.response);
			} else {
				reject(xhr.response);
			}
		};
		// Set reject for technical error
		xhr.onerror = () => {
			reject(`Something went wrong with the ${method} operation`);
		};
		// Convert JavsScript object to JSON
		xhr.send(JSON.stringify(data));
	});
	return promise;
};
*/

/*
// Separate GET method
export const getJSON = async function (url) {
	try {
		const res = await fetch(url);
		// Convert response to JavaScript object
		const data = await res.json();
		return data;
	} catch (error) {
		throw error;
	}
};
*/
