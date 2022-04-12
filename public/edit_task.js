const idContainer = document.getElementById('id_span');
const taskContainer = document.getElementById('task');
const taskComplete = document.getElementById('completed');
const urlId = new URLSearchParams(window.location.search).get('id');
const editButton = document.querySelector('.edit');
const editALert = document.querySelector('.alert_edit');

getTask();
async function getTask() {
    try {
        const task = await axios.get(`/api/v1/tasks/${urlId}`);
        idContainer.innerHTML = urlId;
        taskContainer.value = task.data.task.name;
        if(task.data.task.completed == true) {
            taskComplete.click();
        }
    } catch(err) {
        document.body.innerHTML = '<p>Can not get the task try later...</p>'
    }
}

editButton.addEventListener('click', editTask)
async function editTask() {
    try {
        const task = await axios.patch(`/api/v1/tasks/${urlId}`, {
            name: taskContainer.value,
            completed: taskComplete.checked
        });
        editALert.innerHTML = '<span id="edit_succ">edit success!</span>';
        setTimeout(function() {
            document.getElementById('edit_succ').style.display = 'none';
        }, 3000)
    } catch(err) {
        editALert.innerHTML = '<span id="edit_fail">edit fail!</span>';
        setTimeout(function() {
            document.getElementById('edit_fail').style.display = 'none';
        }, 3000)
    }
}