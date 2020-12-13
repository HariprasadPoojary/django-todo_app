"use strict";
import * as config from "./config.js";

const url = "https://hari-todo-app.herokuapp.com/api";

export let state = {
	tasks: [],
	completedTasks: [],
	inProgressTasks: [],
	pendingTasks: [],
};
export const refreshState = () => {
	state = {
		tasks: [],
		completedTasks: [],
		inProgressTasks: [],
		pendingTasks: [],
	};
};

export const getTasks = async function (userId) {
	try {
		const data = await config.sendAJAX("GET", `${url}/task_list/${userId}`);

		// Convert the values into new object without the user_id
		for (let task of data) {
			let usr_task = {
				id: task.id,
				title: task.title,
				state: task.state,
				tag: task.tag,
			};
			// push the object into global array
			state.tasks.push(usr_task);
		}
		// Filter tasks by state
		for (let task of state.tasks) {
			if (task.state === "C") {
				// Completed
				state.completedTasks.push(task);
			} else if (task.state === "IP") {
				// In-Progress
				state.inProgressTasks.push(task);
			} else if (task.state === "P") {
				// Pending
				state.pendingTasks.push(task);
			}
		}
	} catch (error) {
		console.log(`getTasks ${error} 💢💢`);
		throw error;
	}
};

export const createTask = async function (title, username, csrf) {
	// Data object
	const todoItem = {
		title: title,
		state: "IP",
		tag: "Important",
		user: username,
	};
	try {
		// Send data
		const data = await config.sendAJAX(
			"POST",
			`${url}/task_create/`,
			csrf,
			todoItem
		);
	} catch (error) {
		console.log(`createTask ${error} 💢💢`);
		throw error;
	}
};

export const deleteTask = async function (id, csrf) {
	try {
		const data = await config.sendAJAX(
			"DELETE",
			`${url}/task_delete/${id}`,
			csrf
		);
		return data;
	} catch (error) {
		console.log(`deleteTask ${error} 💢💢`);
		throw error;
	}
};

export const updateTask = async function (id, username, csrf, state) {
	let task;
	try {
		// Get task details via GET AJAX call
		const data = await config.sendAJAX(
			"GET",
			`${url}/task_list/${username}/${id}`
		);
		// Create task object based on GET call and updated task state
		task = {
			id: data[0].id,
			title: data[0].title,
			state: state,
			tag: data[0].tag,
		};
	} catch (error) {
		console.log(`updateTask_GET ${error} 💢💢`);
		throw error;
	}

	try {
		// Send updated object to Update API
		const data = await config.sendAJAX(
			"POST",
			`${url}/task_update/`,
			csrf,
			task
		);
		return data;
	} catch (error) {
		console.log(`updateTask_POST ${error} 💢💢`);
		throw error;
	}
};
