import createElement from "./createElement.js";
const { createContainer, createHeader, createSearchForm, createTable, createRow} = createElement;

const renderToDo = () => {
    const container = createContainer();
    const header = createHeader();
    const {formSearch, btnAdd, btnClear, inputSearch } = createSearchForm();
    const table = createTable();
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    tableWrapper.append(table);
    container.append(header, formSearch, tableWrapper);
    document.body.append(container);
    return {
        list: table.tbody,
        btnAdd,
        btnClear,
        inputSearch,
        formSearch,
    }
};
const renderTacks = (elem, data) => {
     const allRow = data.map(createRow);
        elem.innerHTML = '';
        elem.append(...allRow);
        return allRow;
};
export default {
    renderToDo,
    renderTacks,
};