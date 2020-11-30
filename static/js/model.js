"use strict";
import { getJSON } from "./config.js";

const api_url = "http://127.0.0.1:8000/api";

export const state = {
	tasks: [],
	completedTasks: [],
	inProgressTasks: [],
	pendingTasks: [],
};

export const getTasks = async function (userId) {
	try {
		const data = await getJSON(`${api_url}/task_list/${userId}`);

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
		console.log(`${error} 💢💢`);
		throw error;
	}
};
