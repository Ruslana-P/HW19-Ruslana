class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        el.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-task')) {
                this.removeTodo(event.target.parentElement.dataset.id);
            } else if (event.target.classList.contains('set-status')) {
                let id = event.target.parentElement.dataset.id;
                let url = 'http://localhost:3000/todos/' + id;
               this.changeStatus(id, `${url}`);
            }
        })
        el.parentElement.addEventListener('click', (event)=> {
            if (event.target.classList.contains('create-task')) {
                let newToDo = document.getElementById('myTask').value;
                this.createNewToDo('http://localhost:3000/todos', JSON.stringify({
                    'task': newToDo,
                    'complited': false
                }));
            } else if (event.target.classList.contains('find-task')) {
                console.log(event.target);
                this.findTask();
            }
        })
    }

    removeTodo(elemId) {
        this.todos = this.todos.filter((el) => {
            return el.id !== elemId;
        });
        document.querySelector(`[data-id='${elemId}']`).remove();
    }

    getAllTodos(url) {
        return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    if (xhr.status === 200) {
                          resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }
                }
                    xhr.send();
                }
        ).then( (data) => {
            this.todos = data;
            return this.todos;
        })
    }

    createNewToDo(url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
            xhr.send(data);
        }
    )
        .then ((data) => {
            data= JSON.parse(data);
            this.todos.push(data);
            this.render();
        })
        .catch ( () => {console.log('Error' + xhr.status);})
    }

    changeStatus(id, url) {
        let index = this.todos.findIndex((el) => el.id === +id);
        this.todos[index].complited = !this.todos[index].complited;
        if (this.todos[index].complited === true) {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'green';
        } else {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'yellow';
        }

        let data = JSON.stringify(this.todos[index]);

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('PATCH', url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            xhr.onload = function () {
                if (xhr.response === 200 || xhr.response === 201) {
                    resolve(xhr.response);
                } else {
                    reject (xhr.status);
                }
            }

            xhr.send(data);
        })
          .then(data => console.log('good'))
          .catch((e) => console.log('SOMETHING WENT WRONG '+ e))
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
todo1.getAllTodos(' http://localhost:3000/todos')
setTimeout(()=> todo1.render(), 100);