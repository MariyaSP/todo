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
                delControl(idTask, userName);
                target.closest('.do_task').remove();
                reNumber(list.querySelectorAll('.number'));
            }
        } else if(target.closest('.btn-success')){
            let flag;
            let typeTask;
            const tasks = getStorage(userName);
                 tasks.forEach((elem) =>{
                if(elem.id === idTask){
                    typeTask = elem.taskType;
                }
            });

            const td = target.closest('.do_task').querySelector('.task');
            if(target.closest('.do_task').classList.contains('table-success')){
                    flag = 'В процессе';
                    target.closest('.btn-success').textContent = "Завершить";

                    }
            else {
                flag = 'Выполнена';
                target.closest('.btn-success').textContent = "Возобновить";
            }
                td.classList.toggle('text-decoration-line-through');
                target.closest('.do_task').classList.toggle(typeTask);
                target.closest('.do_task').classList.toggle('table-success');
                //const activeStatus = td.querySelector('.status');
                const tdStatus = target.closest('.do_task').querySelector('.status');

            success(idTask, userName, flag, tdStatus );

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
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });
             }
    });
};

init();