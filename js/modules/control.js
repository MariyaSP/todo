import todoStorage from "./todoStorage.js";
import createElement from "./createElement.js";
const { getStorage, setStorage } = todoStorage;
const { addNewTask } = createElement;
const taskControl = ( btnAdd, btnClear, inputSearch, formSearch, userName, list ) => {
    const inputCheck = () =>{
    btnAdd.disabled = inputSearch.value === '';
    btnClear.disabled = inputSearch.value === '';
    };
    const inputClear = () => {
        inputSearch.value = '';
        inputCheck();
    };
    inputSearch.addEventListener('input', inputCheck);

    btnAdd.addEventListener('click', (e) =>{
    e.preventDefault();
    const newTask = {
        id: Math.random().toString().substring(2, 10),
        task: inputSearch.value,
        status: 'danger',
    };
     const newNumber = getStorage(userName).length;
    addNewTask( newTask, newNumber, list);
    setStorage( userName, newTask);
    formSearch.reset();
    inputCheck();
    });

    btnClear.addEventListener('click', inputClear);
};

const delControl = (id, user, list) =>{
    const tasks = getStorage(user);
    tasks.forEach((task, i) => {
        if( task.id === id ){
            tasks.splice(i, 1);
        }
    });

    localStorage.setItem(user, JSON.stringify(tasks));

};
const success = ( id, user) => {
    const tasks = getStorage(user);
    tasks.forEach((task, i) => {
        if( task.id === id ){
            task.status = 'success';
        }
    });
    localStorage.setItem(user, JSON.stringify(tasks));

};
const reNumber = (taskList) => {
    taskList.forEach((elem, i) => {
    elem.textContent = i + 1;
    });
};
export default {
    taskControl,
    delControl,
    success,
    reNumber,
};