const taskbox = document.querySelector("#taskbox");
const addbtn = document.querySelector("#addbtn");
const container = document.querySelector("#container");

function addToUI(task) {
    const newTask = document.createElement("div");
    newTask.setAttribute("data-id", task.id);

    const titleSpan = document.createElement("span");
    titleSpan.innerText = task.title;
    newTask.appendChild(titleSpan);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.status === "Completed";
    newTask.appendChild(checkbox);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    newTask.appendChild(deleteBtn);

    container.appendChild(newTask);
}

function addTask() {
    const value = taskbox.value.trim();
    if (value === "") {
        return;
    }

    const task = {
        title: value,
        status: "Pending",
        id: Date.now()
    };

    fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addToUI(task);
            taskbox.value = "";
        }
    })
    .catch(error => {
        console.log(error);
    });
}

addbtn.addEventListener("click", addTask);

taskbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
