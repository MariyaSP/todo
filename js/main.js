import render from "./modules/render.js";
import todoStorage from "./modules/todoStorage.js";
import control from "./modules/control.js";

const {renderToDo, renderTacks} = render;
const { getStorage } = todoStorage;
const { taskControl, delControl, success, reNumber } = control;
const init = () =>{
    const userName = prompt('Введите ваше имя');
    const { list, btnAdd , btnClear, inputSearch, formSearch } = renderToDo();
    const tasks = getStorage(userName);
    const allTasks = renderTacks(list, tasks);
    taskControl( btnAdd, btnClear, inputSearch, formSearch, userName, list );

    list.addEventListener('click', e => {
        const target = e.target;
        const idTask = target.closest('.do_task').getAttribute('id');
        if(target.closest('.btn-danger')){
             delControl(idTask, userName, list);
             target.closest('.do_task').remove();
            reNumber(list.querySelectorAll('.number'));

        } else if(target.closest('.btn-success')){
            success(idTask, userName, target);
            const td = target.closest('.do_task').querySelector('.task');
            td.classList.add('text-decoration-line-through');
            target.closest('.do_task').classList.add('table-success');
            target.closest('.do_task').classList.remove('table-light');

        }
    });
};

init();