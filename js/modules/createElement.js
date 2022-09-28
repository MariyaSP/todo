const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('app-container', 'vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');
    return container;
};
const createHeader = () => {
    const header = document.createElement('h3');
    header.textContent = 'Todo App';
    return header;
};
const createSearchForm = () =>{
    const formSearch = document.createElement('form');
    formSearch.classList.add('d-flex', 'align-items-center', 'mb-3');
    const labelSearch = document.createElement('label');
    labelSearch.classList.add('form-group', 'me-3', 'mb-0');
    const inputSearch = document.createElement('input');
    inputSearch.placeholder = 'введите задачу';
    inputSearch.type = 'text';
    inputSearch.classList.add('form-control');
    labelSearch.append(inputSearch);
    const taskType = document.createElement('select');
    taskType.classList.add('form-select');
    taskType.innerHTML = ` <option value = 'table-light'> Обычная </option>
                            <option value = 'table-warning'> Важная </option>
                            <option value = 'table-danger'> Срочная </option>
                    `;
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary me-3 btn_add',
            type: 'submit',
            text: 'Сохранить',
        },
        {
            className: 'btn btn-warning',
            type: 'button',
            text: 'Очистить',
        },
    ]);
    formSearch.append(labelSearch, taskType);
    formSearch.append(...buttonGroup.btns);
     return {
        formSearch,
        btnAdd: buttonGroup.btns[0],
        btnClear: buttonGroup.btns[1],
        inputSearch,
        taskType,
    };
};
const createButtonsGroup = params => {
    const btns = params.map(({className, type, text}) => {
        const button = document.createElement('button');
        button.type = type;
        button.className = className;
        button.textContent = text;
        button.disabled = true;
        return button;
    });
    return {
        btns,
    };
};
const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th>№</th>
                <th>Задача</th>
                <th>Статус</th>
                <th>Действия</th>
            </tr>   
            
        `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};
const createRow = ({id, task, taskType, status, }, i ) => {
const tr = document.createElement('tr');
        if(status === 'Выполнена'){

            tr.classList.add('table-success');
        } else {
            tr.classList.add(taskType);
        }
      tr.classList.add('do_task');
      tr.setAttribute('id', id)
      const tdNumber = document.createElement('td');
      tdNumber.classList.add('number');
      tdNumber.textContent = i + 1;
      const tdTask = document.createElement('td');
      tdTask.classList.add('task');
    if(status !== 'В процессе'){
        tdTask.classList.add('text-decoration-line-through');
    }
      tdTask.textContent = task;
      const tdStatus = document.createElement('td');
      tdStatus.textContent = status;
      const tdAction = document.createElement('td');
      tdAction.classList.add('tdAction');
      const btnDel = document.createElement('button');
      btnDel.classList.add('btn', 'btn-danger');
      btnDel.textContent = "Удалить";
      const btnDone = document.createElement('button');
      btnDone.classList.add('btn', 'btn-success');
      if(status === "В процессе"){
          btnDone.textContent = "Завершить";
      } else{
          btnDone.textContent = "Возобновить";
      }

      const btnEdit = document.createElement('button');
      btnEdit.classList.add('btn', 'btn-info');
      btnEdit.textContent = "Редактировать";
      tdAction.append(btnDel, btnDone, btnEdit);

        tr.append(tdNumber, tdTask, tdStatus, tdAction);
return tr;
};

const addNewTask = (task, i, list) => {

  list.append(createRow(task, i));
};
export default {
    createContainer,
    createHeader,
    createSearchForm,
    createButtonsGroup,
    createTable,
    createRow,
    addNewTask,
};