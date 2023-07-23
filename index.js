document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    // load data from the indexedDB here

    const btn = document.getElementById("new-job-button");
    // set focus on the input field when the page loads
    const input = document.getElementById("new-job-text");
    input.focus();
    // add a keyup event handler to the input field
    input.addEventListener("keyup", function (event) {
        // if the user presses the enter key
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            // stop the default action of the form
            event.preventDefault();
            // call the function that adds the job to the list
            addJobItem();
        }
    });

    let count = 0;

    const createJobItem = (text) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `completed${count}`;
        checkbox.id = `completed${count}`;
        checkbox.onchange = refreshStats;

        const label = document.createElement('label');
        label.htmlFor = `completed${count}`;
        label.classList.add('job-text');
        label.textContent = text;

        const button = document.createElement('button');
        button.classList.add('delete-button');
        button.textContent = 'Del';
        button.addEventListener("click", function () {
            document.getElementById('delete-modal').style.display = 'block';
            let parent = this.parentElement;
            document.getElementById('btn-delete-modal').addEventListener('click', function () {
                parent.remove();
                refreshStats();
                document.getElementById('delete-modal').style.display = 'none';
            });
        });

        const div = document.createElement('div');
        div.classList.add('job-item');
        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(button);
        div.id = `job${count}`;
        count++;

        return div;
    };

    btn.addEventListener("click", function () {
        addJobItem();
    });

    const addJobItem = () => {
        const inputBox = document.getElementById("new-job-text");
        const text = inputBox.value;
        inputBox.focus();
        if (text === "") {
            return;
        }
        const item = createJobItem(text);
        const list = document.getElementById("upper-body");
        list.insertBefore(item, list.firstChild);
        inputBox.value = "";
        refreshStats();
    }

    const refreshStats = () => {
        const dashBoard = document.getElementById("dashboard");
        let completed = 0;
        let total = 0;
        const items = Object.entries(document.getElementById("upper-body").children);
        for (const item of items) {
            if (item[1].childNodes[0].checked) {
                completed++;
            }
            total++;
        }
        dashBoard.innerHTML = `Stats: Total <b>${total}</b> jobs <b>${completed}</b> completed`;
    }
});