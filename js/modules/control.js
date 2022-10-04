import todoStorage from "./todoStorage.js";
import createElement from "./createElement.js";
const { getStorage, setStorage } = todoStorage;
const { addNewTask } = createElement;
const taskControl = ( btnAdd, btnClear, inputSearch, formSearch, userName, list, taskType ) => {
    const inputCheck = () =>{
        if(userName !== null){
            btnAdd.disabled = inputSearch.value === '';
            btnClear.disabled = inputSearch.value === '';
        }
    };
    const inputClear = () => {
        inputSearch.value = '';
        inputCheck();
    };
    inputSearch.addEventListener('input', inputCheck);

    btnAdd.addEventListener('click', (e) =>{

    e.preventDefault();
    const newTask = {
        name: userName,
        id: Math.random().toString().substring(2, 10),
        task: inputSearch.value,
        taskType: taskType.value,
        status: 'В процессе',
    };
    const newNumber = getStorage('tasks').length;
    addNewTask( newTask, newNumber, list);

    setStorage(newTask);
    formSearch.reset();
    inputCheck();
        reNumber(list.querySelectorAll('.number'));
    });
    btnClear.addEventListener('click', inputClear);
};

const delControl = (id, user) =>{
    const tasks = getStorage(user);
    console.log(tasks);
    tasks.forEach((task, i) => {
        if( task.id === id ){
            tasks.splice(i, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const success = ( id, user, flag, statusText) => {
    const tasks = getStorage(user);
    tasks.forEach((task, i) => {
        if( task.id === id ){
            task.status = flag;
            statusText.textContent = task.status;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

};

const reNumber = (taskList) => {
    taskList.forEach((elem, i) => {
    elem.textContent = i + 1;
    });
};
const editTask = (newText, id, user) =>{
    const tasks = getStorage(user);
    tasks.forEach((task) => {
        if( task.id === id ){
            task.task = newText;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
export default {
    taskControl,
    delControl,
    success,
    reNumber,
    editTask,
};