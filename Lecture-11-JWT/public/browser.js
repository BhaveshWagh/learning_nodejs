let skip = 0;
window.onload = generateTodos();

function generateTodos() {
  axios
    .get(`/read-item?skip=${skip}`)
    .then((res) => {
      console.log(res);

      if (res.data.status !== 200) {
        alert(res.data.message);
        return;
      }

      const todos = res.data.data;
      skip += todos.length;

      document.getElementById("item_list").insertAdjacentHTML(
        "beforeend",
        todos
          .map((item) => {
            return `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text"> ${item.todo}</span>
        <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`;
          })
          .join("")
      );
    })
    .catch((err) => console.log(err));
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-me")) {
    const todoId = event.target.getAttribute("data-id");
    const newData = prompt("Enter new Todo Text");

    axios
      .post("/edit-item", { newData, todoId })
      .then((res) => {
        if (res.data.status !== 200) {
          alert(res.data.message);
          return;
        }

        event.target.parentElement.parentElement.querySelector(
          ".item-text"
        ).innerHTML = newData;
      })
      .catch((err) => console.log(err));
  } else if (event.target.classList.contains("delete-me")) {
    const todoId = event.target.getAttribute("data-id");

    axios
      .post("/delete-item", { todoId })
      .then((res) => {
        if (res.data.status !== 200) {
          alert(res.data.message);
          return;
        }
        event.target.parentElement.parentElement.remove();
      })
      .catch((err) => console.log(err));
  } else if (event.target.classList.contains("add_item")) {
    console.log(document.getElementById("create_field").value);

    const todo = document.getElementById("create_field").value;

    axios
      .post("/create-item", { todo })
      .then((res) => {
        console.log(res);
        if (res.data.status !== 201) {
          alert(res.data.message);
          return;
        }
        document.getElementById("create_field").value = "";

        document.getElementById("item_list").insertAdjacentHTML(
          "beforeend",
          `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text"> ${res.data.data.todo}</span>
            <div>
                <button data-id="${res.data.data._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${res.data.data._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
        );
      })
      .catch((err) => console.log(err));
  } else if (event.target.classList.contains("logout-me")) {
    axios
      .post("/logout")
      .then((res) => {
        if (res.status !== 200) {
          alert(res.data);
          return;
        }

        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  } else if (event.target.classList.contains("show_more")) {
    generateTodos();
  }
});

{
  /* <ul>
  <li>
    <span>Todo text</span>
    <div>
      <button id='todo_id'>Edit</button>
      <button id='todo_id'>Delete</button>
    </div>
  </li>

  <li>
    <span>Todo text</span>
    <div>
      <button id='todo_id'>Edit</button>
      <button id='todo_id'>Delete</button>
    </div>
  </li>
</ul>; */
}
