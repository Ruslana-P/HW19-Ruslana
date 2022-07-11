# HW19-Ruslana
Создайте на вашем github репозиторий по следующему шаблону HW#-name. Все результаты нужно запушить в ваш репозиторий и прикрепить ссылку на hillel портале.
Создайте index.html в котором подключите js script.
Создайте README.md с описанием задания.
Подготовка
Установить:
https://nodejs.org/uk/  - LTS версию
Затем выполнить в консоле npm install -g json-server
Создайте в папке с заданием:
Создайте папку db
Создайте в папке db json файл с именем db.json. В который поместите содержимое c https://gist.github.com/OlegRovenskyi/e39cd96baa9f3d4555eceaca5e91b33c. Должны получить следующую структуру: db/db.json
Чтобы запустить сервер нужно в консоле или терменале зайти в папку с файлом db.json и запустить команд: json-server --watch db.json
чтобы остановить сервер нажмите вместе комбинацию клавиш в консоли: CTRL C
Задание:
Использовать ajax (XMLHttpRequest) для получения и создания todos.
Нужно расширить реализацию todo list с предыдущих занятий.
При загрузке страницы нужно вывести список всех todos в html.
Реализовать создание новых задач.
При нажатии на кнопку create отправить (post) запрос на создание todo.
При успешном создании todo отобразить todo в списке задач.
При возникновении ошибки показать сообщение. (Можно вывести в консоль или вывести сообщение в удобном месте).
Реализовать изменение статуса todo.
При изменении статуса нужно обновить ui.
Отправить запрос (put or patch) на обновление задачи в базе данных (данные должны обновиться в файле db.json).
Опциональное задание. Реализовать удаление todo
Удаление todo на ui
Отправить запрос на удаление из базы данных
Полезная информация:
API
get - http://localhost:3000/todos // получение всех todos
post - http://localhost:3000/todos // создание todo (не забываем передать данные)!!!! - Данная api при создании возвращает 201 статус код - Success
Более детальная информация о json-server: https://github.com/typicode/json-server
 
