"use strict";

class TodoView {
	// Table parent elements
	#inProgressParentElement = document.querySelector("#ip-rows");
	#completedParentElement = document.querySelector("#c-rows");
	#pendingParentElement = document.querySelector("#p-rows");
	#parentElement;
	// Get input elements
	#getTaskInput = document.querySelector("#get-task");
	#submitTask = document.querySelector("#enter-task-form");

	#data;
	#state;
	// Render Element
	render(data, state) {
		this.#data = data;
		this.#state = state;
		// Assign parent element based on state
		if (this.#state === "IP") {
			this.#parentElement = this.#inProgressParentElement;
		} else if (this.#state === "P") {
			this.#parentElement = this.#pendingParentElement;
		} else {
			this.#parentElement = this.#completedParentElement;
		}
		this.#clear;
		// Add all tasks to the DOM
		for (let task of this.#data) {
			const markup = this.#generateMarkup(task, this.#state);
			this.#parentElement.insertAdjacentHTML("afterbegin", markup);
		}
	}

	// Get Input data of Task
	getTaskTitle() {
		return this.#getTaskInput.value;
	}
	// Clear input
	clearInput() {
		this.#getTaskInput.value = "";
	}
	// Run function passed from controller on event
	addHandlerPageLoad(handler) {
		// Listeners
		//* Page Load
		window.addEventListener("load", handler);
		console.log("Event listener load added");
	}

	addHandlerClickBtn(handler, action) {
		if (action === "submit") {
			//* Submit Task
			this.#submitTask.addEventListener("submit", function (e) {
				e.preventDefault();
				handler();
			});
			console.log("Event Submit btn listener added");
		} else if (action === "update") {
			//* Update Task
			//! this.#submitTaskBtn.addEventListener("click", handler);
			console.log("Event Update btn listener added");
		} else {
			//* Delete Task
			//! #submitTaskBtn.addEventListener("click", handler);
			console.log("Event Delete btn listener added");
		}
	}

	#clear() {
		this.#parentElement.innerHTML = "";
	}
	#generateMarkup(data, state) {
		let markup = "";

		if (state === "IP") {
			// In-Progress Task Element
			markup = `
                <tr id="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update">
                                    Pending
                                </button>
                            </li>
                            <li>
                                <button class="status-update">
                                    Completed
                                </button>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn task-delete">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
		} else if (state === "P") {
			// Pending Task Element
			markup = `
                <tr id="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update">
                                    In Progress
                                </button>
                            </li>
                            <li>
                                <button class="status-update">
                                    Completed
                                </button>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn task-delete">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
		} else {
			// Completed Task Element
			markup = `
                <tr id="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update">
                                    In Progress
                                </button>
                            </li>
                            <li>
                                <button class="status-update">
                                    Pending
                                </button>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn task-delete">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
		}

		return markup;
	}
}

export default new TodoView();
