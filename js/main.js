import render from "./modules/render.js";
import todoStorage from "./modules/todoStorage.js";
import control from "./modules/control.js";

const {renderToDo, renderTacks} = render;
const { getStorage, setStorage } = todoStorage;
const { taskControl, delControl, success } = control;
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
             delControl(idTask, userName);
             target.closest('.do_task').remove();
        } else if(target.closest('.btn-success')){

            success(idTask, userName, target);
            const td = target.closest('.do_task').querySelector('.task');
            td.classList.add('text-decoration-line-through');
            console.log(td);
            target.closest('.do_task').classList.add('table-success');
            target.closest('.do_task').classList.remove('table-light');

            console.log();
        }
    });
};

init();