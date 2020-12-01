"use strict";

class TodoView {
	// Table parent elements
	#inProgressParentElement = document.querySelector("#ip-rows");
	#completedParentElement = document.querySelector("#c-rows");
	#pendingParentElement = document.querySelector("#p-rows");
	#parentElement;
	// Get input elements
	#getTaskInput = document.querySelector("#get-task");
	#submitTaskBtn = document.querySelector("#get-task-btn");

	#data;
	#state;
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

	// Run function passed from controller on event
	addPageLoadEventHandler(handler) {
		// Listeners
		//* Page Load
		window.addEventListener("load", handler);
		//* Submit Task

		//* Update Task
		// Delete
		// Update
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
