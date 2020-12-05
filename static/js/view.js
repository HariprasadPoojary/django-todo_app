"use strict";

class TodoView {
	// Table parent elements
	#inProgressParentElement = document.querySelector("#ip-rows");
	#completedParentElement = document.querySelector("#c-rows");
	#pendingParentElement = document.querySelector("#p-rows");
	#currentElement;
	// Get input elements
	#getTaskInput = document.querySelector("#get-task");
	#submitTask = document.querySelector("#enter-task-form");
	// List of Table sections
	#tableSections = [
		document.querySelector("#in-progress"),
		document.querySelector("#pending"),
		document.querySelector("#completed"),
	];
	#data;
	#state;
	// Render Element
	render(data, state) {
		this.#data = data;
		this.#state = state;
		// Assign parent element based on state
		if (this.#state === "IP") {
			this.#currentElement = this.#inProgressParentElement;
		} else if (this.#state === "P") {
			this.#currentElement = this.#pendingParentElement;
		} else {
			this.#currentElement = this.#completedParentElement;
		}
		this.#clear();
		// Add all tasks to the DOM
		for (let task of this.#data) {
			const markup = this.#generateMarkup(task, this.#state);
			this.#currentElement.insertAdjacentHTML("afterbegin", markup);
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
	}

	addHandlerClickBtn(handler, action) {
		if (action === "submit") {
			//* Submit Task
			this.#submitTask.addEventListener("submit", function (e) {
				e.preventDefault();
				handler();
			});
		} else if (action === "update") {
			//* Update Task
			for (let section of this.#tableSections) {
				section.addEventListener("click", (e) => {
					// Get Task id
					const taskId = e.target.closest(".task-row").dataset.todoid;
					let state;

					// Determine button operation e.g update or delete
					if (e.target.matches(".p, .p *")) {
						state = "P"; // Pending
					} else if (e.target.matches(".ip, .ip *")) {
						state = "IP"; // In Progress
					} else if (e.target.matches(".c, .c *")) {
						state = "C"; // Complete
					} else if (
						e.target.matches(".task-delete, .task-delete *")
					) {
						state = "D"; // Delete
					}

					handler(taskId, state);
				});
			}
		}
	}

	#clear() {
		this.#currentElement.innerHTML = "";
		console.log("Table cleared " + this.#currentElement);
	}
	#generateMarkup(data, state) {
		let markup = "";

		if (state === "IP") {
			// In-Progress Task Element
			markup = `
                <tr class="task-row" data-todoid="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update p">
                                    Pending
                                </button>
                            </li>
                            <li>
                                <button class="status-update c">
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
                <tr class="task-row" data-todoid="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update ip">
                                    In Progress
                                </button>
                            </li>
                            <li>
                                <button class="status-update c">
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
                <tr class="task-row" data-todoid="${data.id}">
                    <td class="task-name">${data.title}</td>
                    <td class="drop-option">
                        Update 🔽
                        <ul>
                            <li>
                                <button class="status-update ip">
                                    In Progress
                                </button>
                            </li>
                            <li>
                                <button class="status-update p">
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
