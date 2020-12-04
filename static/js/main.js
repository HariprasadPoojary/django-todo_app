"use strict";
import * as model from "./model.js";
import TodoView from "./view.js";
import * as config from "./config.js";

// Get the value of customer_id from DJango
const username = JSON.parse(document.querySelector("#username").textContent);

const allTasks = async () => {
	// Get tasks for User
	await model.getTasks(username);

	//! Testing
	console.log(model.state);

	// render view In-Progress
	TodoView.render(model.state.inProgressTasks, "IP");
	// render view Pending
	TodoView.render(model.state.pendingTasks, "P");
	// render view In-Progress
	TodoView.render(model.state.completedTasks, "C");
};

const addTask = async () => {
	// Get Value of Todo title
	const todoTitle = TodoView.getTaskTitle();
	// In case of empty string
	if (!todoTitle) return;
	//! Test
	console.log(todoTitle);
	// Create request data
	const data = {
		title: todoTitle,
		state: "IP",
		tag: "Important",
		user: username,
	};
	// Send data
	await config.sendAJAX("POST", `${config.url}/task_create/`, data);
	// Clear input
	TodoView.clearInput();
};

// Pass functions to view, to run on events
const init = () => {
	TodoView.addHandlerPageLoad(allTasks);
	TodoView.addHandlerClickBtn(addTask, "submit");
};
// Run init
init();
