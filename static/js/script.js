// =========================================
// API
// =========================================

const API = "/todos";

// =========================================
// State
// =========================================

let currentPage = 1;
let limit = 5;

let currentKeyword = "";
let currentStatus = "all";
let currentSort = "newest";

let editingId = null;
let deletingId = null;

// =========================================
// Element
// =========================================

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");

const saveBtn = document.getElementById("saveBtn");

const searchInput = document.getElementById("search");

const filterSelect = document.getElementById("filter");

const sortSelect = document.getElementById("sort");

const todoList = document.getElementById("todo-list");

const pagination = document.getElementById("pagination");

const toast = document.getElementById("toast");

const deleteModal = document.getElementById("deleteModal");

const confirmDeleteBtn =
document.getElementById("confirmDelete");

const cancelDeleteBtn =
document.getElementById("cancelDelete");

// =========================================
// Init
// =========================================

window.onload = () => {

    loadTodos();

}

// =========================================
// Toast
// =========================================

function showToast(message){

    toast.innerText = message;

    toast.classList.remove("hidden");

    setTimeout(()=>{

        toast.classList.add("hidden");

    },2000);

}

// =========================================
// Loading
// =========================================

function showLoading(){

    todoList.innerHTML=`

        <div class="text-center py-10">

            Loading...

        </div>

    `;

}

// =========================================
// Load Todos
// =========================================

async function loadTodos(){

    showLoading();

    const url =

        `${API}?page=${currentPage}`+

        `&limit=${limit}`+

        `&keyword=${encodeURIComponent(currentKeyword)}`+

        `&status=${currentStatus}`+

        `&sort=${currentSort}`;

    const response = await fetch(url);

    const data = await response.json();

    renderTodos(data.items);

    renderPagination(data.pagination);

}

// =========================================
// Render Todos
// =========================================

function renderTodos(todos){

    todoList.innerHTML="";

    if(todos.length===0){

        todoList.innerHTML=`

        <div class="bg-white rounded-xl shadow p-10 text-center">

            <h2 class="text-2xl font-bold">

                No Todo Found

            </h2>

            <p class="text-gray-500 mt-3">

                Create your first task.

            </p>

        </div>

        `;

        return;

    }

    todos.forEach(todo=>{

        todoList.innerHTML+=createTodoCard(todo);

    });

}

// =========================================
// Card
// =========================================

function createTodoCard(todo){

    return `

<div class="bg-white rounded-xl shadow p-5 mb-4">

<div class="flex justify-between items-start">

<div>

<h2 class="text-2xl font-bold

${todo.completed?"line-through text-gray-400":""}

">

${todo.title}

</h2>

<p class="mt-2 text-gray-600">

${todo.description||""}

</p>

<p class="text-sm text-gray-400 mt-3">

Created :

${new Date(todo.created_at).toLocaleString()}

</p>

</div>

<div>

${
todo.completed

?

`<span class="bg-green-600 text-white px-3 py-1 rounded">

Completed

</span>`

:

`<span class="bg-red-500 text-white px-3 py-1 rounded">

Pending

</span>`

}

</div>

</div>

<div class="flex gap-2 mt-5">

<button

onclick="toggleTodo(${todo.id})"

class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"

>

Toggle

</button>

<button

onclick="startEdit(${todo.id},

'${escapeHtml(todo.title)}',

'${escapeHtml(todo.description||"")}',

${todo.completed}

)"

class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"

>

Edit

</button>

<button

onclick="openDelete(${todo.id})"

class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

>

Delete

</button>

</div>

</div>

`;

}

// =========================================
// Escape HTML
// =========================================

function escapeHtml(text){

    if(!text)

        return "";

    return text

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#039;");

}
// =========================================
// Add / Update
// =========================================

saveBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();

    const description = descriptionInput.value.trim();

    if (title === "") {

        showToast("Title is required");

        return;

    }

    if (title.length > 100) {

        showToast("Title must be <= 100 characters");

        return;

    }

    if (description.length > 500) {

        showToast("Description must be <= 500 characters");

        return;

    }

    // ==========================
    // ADD
    // ==========================

    if (editingId === null) {

        const response = await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title,

                description

            })

        });

        if (response.ok) {

            showToast("Todo added");

        }

    }

    // ==========================
    // UPDATE
    // ==========================

    else {

        const old = await fetch(`${API}/${editingId}`);

        const todo = await old.json();

        const response = await fetch(

            `${API}/${editingId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    title,

                    description,

                    completed: todo.completed

                })

            }

        );

        if (response.ok) {

            showToast("Todo updated");

        }

        editingId = null;

        saveBtn.innerText = "Add Todo";

    }

    titleInput.value = "";

    descriptionInput.value = "";

    loadTodos();

});

// =========================================
// Edit
// =========================================

function startEdit(

    id,

    title,

    description,

    completed

) {

    editingId = id;

    titleInput.value = title;

    descriptionInput.value = description;

    saveBtn.innerText = "Update Todo";

    titleInput.focus();

}

// =========================================
// Toggle
// =========================================

async function toggleTodo(id) {

    const response = await fetch(

        `${API}/${id}/toggle`,

        {

            method: "PATCH"

        }

    );

    if (response.ok) {

        showToast("Status updated");

        loadTodos();

    }

}

// =========================================
// Delete Modal
// =========================================

function openDelete(id) {

    deletingId = id;

    deleteModal.classList.remove("hidden");

}

cancelDeleteBtn.onclick = () => {

    deletingId = null;

    deleteModal.classList.add("hidden");

}

confirmDeleteBtn.onclick = async () => {

    if (deletingId == null)

        return;

    const response = await fetch(

        `${API}/${deletingId}`,

        {

            method: "DELETE"

        }

    );

    if (response.ok) {

        showToast("Todo deleted");

    }

    deleteModal.classList.add("hidden");

    deletingId = null;

    loadTodos();

}

// =========================================
// Search
// =========================================

let searchTimer = null;

searchInput.addEventListener(

    "keyup",

    () => {

        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {

            currentKeyword = searchInput.value;

            currentPage = 1;

            loadTodos();

        }, 300);

    }

);

// =========================================
// Filter
// =========================================

filterSelect.addEventListener(

    "change",

    () => {

        currentStatus = filterSelect.value;

        currentPage = 1;

        loadTodos();

    }

);

// =========================================
// Sort
// =========================================

sortSelect.addEventListener(

    "change",

    () => {

        currentSort = sortSelect.value;

        currentPage = 1;

        loadTodos();

    }

);

// =========================================
// Pagination
// =========================================

function renderPagination(info) {

    pagination.innerHTML = "";

    const previous = document.createElement("button");

    previous.innerText = "Previous";

    previous.className =
        "border px-3 py-2 rounded";

    previous.disabled = info.page === 1;

    previous.onclick = () => {

        currentPage--;

        loadTodos();

    };

    pagination.appendChild(previous);

    for (

        let i = 1;

        i <= info.total_pages;

        i++

    ) {

        const button = document.createElement(

            "button"

        );

        button.innerText = i;

        button.className =

            i === info.page

                ?

                "bg-blue-600 text-white px-3 py-2 rounded"

                :

                "border px-3 py-2 rounded";

        button.onclick = () => {

            currentPage = i;

            loadTodos();

        };

        pagination.appendChild(button);

    }

    const next = document.createElement("button");

    next.innerText = "Next";

    next.className =
        "border px-3 py-2 rounded";

    next.disabled =

        info.page === info.total_pages;

    next.onclick = () => {

        currentPage++;

        loadTodos();

    };

    pagination.appendChild(next);

}