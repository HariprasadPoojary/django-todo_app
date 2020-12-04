"use strict";
import * as config from "./config.js";

export const state = {
	tasks: [],
	completedTasks: [],
	inProgressTasks: [],
	pendingTasks: [],
};

export const getTasks = async function (userId) {
	try {
		const data = await config.sendAJAX(
			"GET",
			`${config.url}/task_list/${userId}`
		);

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
			`${config.url}/task_create/`,
			todoItem,
			csrf
		);
	} catch (error) {
		console.log(`createTask ${error} 💢💢`);
		throw error;
	}
};
