"use strict";

class TodoView {
	#inProgressParentElement = document.querySelector("#ip-rows");
	#completedParentElement = document.querySelector("#c-rows");
	#pendingParentElement = document.querySelector("#p-rows");
	#data;
	render(data) {
		this.#data = data;
		this.#clear;
		for (let task of this.#data) {
			const markup = this.#generateMarkup(task);
			this.#inProgressParentElement.insertAdjacentHTML(
				"afterbegin",
				markup
			);
		}
	}

	// Run function passed from controller on event
	addEventHandlerRender(handler) {
		// Listeners
		window.addEventListener("load", handler);
	}

	#clear() {
		this.#inProgressParentElement.innerHTML = "";
	}
	#generateMarkup(data) {
		return `
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
	}
}

export default new TodoView();
