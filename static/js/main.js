"use strict";
import * as model from "./model.js";
import TodoView from "./view.js";

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

// Pass functions to view, to run on events
const init = () => {
	TodoView.addPageLoadEventHandler(allTasks);
};
// Run init
init();
