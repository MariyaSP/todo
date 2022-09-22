const getStorage = (key) => {
    let data;
    data = localStorage.getItem(key) !== null ?  JSON.parse(localStorage[key]) : [];
    return  data;
};
const setStorage = (key, item) => {
    let taskList = getStorage(key);
    taskList.push(item);
    localStorage[key] = JSON.stringify(taskList);
};

export default {
    getStorage,
    setStorage,
};