const getStorage = (name) => {
    let data = [];
   if (localStorage.getItem('tasks') !== null){
      JSON.parse(localStorage['tasks']).forEach( task => {
          if(task.name === name){
              data.push(task);
          }});
   }
    return  data;
};
const setStorage = (item) => {
    let taskList;
      if (localStorage.getItem('tasks') !== null) {
        taskList = JSON.parse(localStorage.getItem('tasks'));
    } else {
        taskList = [];
    }
        taskList.push(item);
    localStorage.tasks = JSON.stringify(taskList);
};

export default {
    getStorage,
    setStorage,
};