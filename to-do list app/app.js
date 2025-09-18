const inputBtn = document.getElementById("input-btn");
let inputBox = document.getElementById("input-box")
const ulEl = document.getElementById("lists-container")

const save = () => {
    localStorage.setItem("data", ulEl.innerHTML)
}

const showData = () => {
    ulEl.innerHTML = localStorage.getItem("data")
}
showData()


inputBtn.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("Please, write something")
    }

    else {
        let text = 
        `
        <div class="task-container">
            <li>${inputBox.value}</li>
            <button>❌</button>
        </div>
        `
        ulEl.innerHTML += text;
    }
    inputBox.value = ""
    save()
})

ulEl.addEventListener("click", () => {
    const target = event.target;

    if (target.tagName === "LI") {
        target.classList.toggle("completed")
        save()

    } else if (target.tagName === "BUTTON") {
        const parentDiv = target.parentElement
        parentDiv.remove()
        save()
    }
})
