"use strict";
import * as model from "./model.js";
import TodoView from "./view.js";
import * as config from "./config.js";

// Get the value of customer_id from DJango
const username = JSON.parse(document.querySelector("#username").textContent);
const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

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

	// Send Data to Django API
	await model.createTask(todoTitle, username, csrftoken);

	// Clear input
	TodoView.clearInput();

	// Refresh the tables
	model.refreshState();
	allTasks();
};

const updateTask = async (taskid, state) => {
	console.log(taskid + " " + state);
	if (!taskid) return;
	// Call function from model based on operation
	if (state === "D") {
		// Delete Task
		await model.deleteTask(taskid, csrftoken);
	} else if (state === "IP" || state === "P" || state === "C") {
		// Update - In-Progress, Pending, Completed
		await model.updateTask(taskid, username, csrftoken, state);
	}
	// Refresh the tables
	model.refreshState();
	allTasks();
};

// Pass functions to view, to run on events
const init = () => {
	TodoView.addHandlerPageLoad(allTasks);
	TodoView.addHandlerClickBtn(addTask, "submit");
	TodoView.addHandlerClickBtn(updateTask, "update");
};
// Run init
init();
