class Task {
    constructor(value, status) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.task = value;
        this.complited = status;
    }
}

class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        el.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-task')) {
                this.removeTodo(event.target.parentElement.dataset.id);
            } else if (event.target.classList.contains('set-status')) {
                this.changeStatus(event.target.parentElement.dataset.id);
            }
        })
        el.parentElement.addEventListener('click', (event)=> {
            if (event.target.classList.contains('create-task')) {
                this.createNewToDo();
            } else if (event.target.classList.contains('find-task')) {
                console.log(event.target);
                this.findTask();
            }
        })
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(elemId) {
        this.todos = this.todos.filter((el) => {
            return el.id !== elemId;
        });
        document.querySelector(`[data-id='${elemId}']`).remove();
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === +id);
        this.todos[index].complited = !this.todos[index].complited;
        const task = this.todos[index].task
        const status = this.todos[index].complited;
        console.log(this.todos);
        console.log(status);
        console.log(task);
        //updateDate('http://localhost:3000/todos/' + `${index + 1}`,  JSON.stringify({"task": task, "complited": status } ))

        if (this.todos[index].complited === true) {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'green';
        } else {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'yellow';
        }
    }

    createNewToDo() {
        let myTask = document.getElementById('myTask').value;
        postNewToDo('http://localhost:3000/todos', JSON.stringify({
            'task': myTask,
            'complited': false
        }))
            .then( getAllToDos('http://localhost:3000/todos'))
            .then(console.log(data))
           /* .then( data=> {
                const newTODO = JSON.parse(data)
                this.addTodo(newTODO);
                this.render()
            }*/
}


    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}">${el.task}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }

    findTask() {
        let myTask = document.getElementById('myTask').value;
        let result = this.todos.filter( (el)=> {
            return el.task.includes(myTask);
        })
        let lis = '';
        for (let el of result) {
            if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}">${el.task}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }}


let list = document.getElementById('list');
let todo1 = new TodoList(list);

console.log(todo1.todos)

function getAllToDos(url) {
    return new Promise( (resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType='json';
            xhr.onload = function() {
                if (xhr.status === 200){
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        xhr.send();
        }
    )

}
window.onload = getAllToDos('http://localhost:3000/todos')
    .then(data=> {
        const array1 = todo1.todos;
        todo1.todos = [ ...array1, ...(data)];
        todo1.render();
    })


function postNewToDo(url, data) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 201){
                resolve(data);
            } else {
                reject(xhr.status);
            }
            }
        xhr.send(data);
        }
    )
        /* .then(getAllToDos('http://localhost:3000/todos'))
       .then(data=> console.log(data))
     .then(data=> {
           const array1 = todo1.todos;
           todo1.todos = [ ...array1, ...(data)];
           todo1.render();
       })*/
        .catch ( data=> console.log('ERROR. Error status ' + data))
}

/*
function updateDate(url, data) {
    return new Promise ( (resolve, reject)=> {
        let xhr = new XMLHttpRequest();
        xhr.open('PATCH', url, true);
        xhr.onload = function() {
            if (xhr.response === 200 || xhr.response === 201) {
                resolve(data);
            } else {
                reject(xhr.response);
            }
        }
        xhr.send(data);
    })
}

*/