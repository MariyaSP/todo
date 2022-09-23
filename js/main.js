import render from "./modules/render.js";
import todoStorage from "./modules/todoStorage.js";
import control from "./modules/control.js";

const {renderToDo, renderTacks} = render;
const { getStorage } = todoStorage;
const { taskControl, delControl, success, reNumber, editTask } = control;
const init = () =>{
    const userName = prompt('Введите ваше имя', 'N' );
    const { list, btnAdd , btnClear, inputSearch, formSearch, taskType } = renderToDo();
    const tasks = getStorage(userName);
    const allTasks = renderTacks(list, tasks);
    taskControl( btnAdd, btnClear, inputSearch, formSearch, userName, list, taskType );

    list.addEventListener('click', e => {
        const target = e.target;
        const idTask = target.closest('.do_task').getAttribute('id');
        if(target.closest('.btn-danger')){
            if( confirm('Не уверен - не удаляй!')){
                delControl(idTask, userName, list);
                target.closest('.do_task').remove();
                reNumber(list.querySelectorAll('.number'));
            }
        } else if(target.closest('.btn-success')){
            success(idTask, userName, target);
            const td = target.closest('.do_task').querySelector('.task');
            td.classList.add('text-decoration-line-through');
            const test = target.closest('.do_task').classList.value.split(' ');
            target.closest('.do_task').classList.add('table-success');
            target.closest('.do_task').classList.remove(test[0]);

        } else if(target.closest('.btn-info')){
            const trTask = target.closest('.do_task').querySelector('.task');
            trTask.setAttribute('contenteditable', 'true');
            trTask.focus();
            trTask.addEventListener('blur', () => {
                const tasks = getStorage(userName);
                tasks.forEach( task => {
                    if( task.id === idTask ){
                        task.task = trTask.textContent;
                    }
                });
                console.log(tasks);
                localStorage.setItem(userName, JSON.stringify(tasks));
            });
             }
    });
};

init();