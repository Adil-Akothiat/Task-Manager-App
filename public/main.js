const formTask = document.querySelector('.form_task');
const taskInput = document.getElementById('task_title');
const taskAlert = document.querySelector('.task_alert');
const taskContainer = document.querySelector('.task_container');
const alertTask = document.querySelector('.alert_task');

formTask.addEventListener('submit', addTask);

async function showTasks(props = axios.get('/api/v1/tasks')) {
    try {
        const Tasks= await props;
        let arr = [];
        let allTasks;
        if(typeof Tasks.data.tasks === 'object') {
            allTasks = Tasks.data.tasks;
        }else {
            arr.push(Tasks.data.task);
            allTasks =  arr;
        }
        allTasks.forEach(task=> {
            const mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', 'task');
            mainDiv.innerHTML = 
            `
            <div>
                <img class='check_${task.completed}' src='./icons/check_mark.svg' alt='check mark'>
                <p>${task.name}</p>
            </div>
            <div class='task_ed'>
                <a href='edit.html?id=${task._id}'>
                    <img src='./icons/edit-box.svg' alt='edit icon'>
                </a>
                <img class='delet' id='${task._id}' src='./icons/delete.svg' alt='delete icon'>
            </div>
            `;
            taskContainer.appendChild(mainDiv);

            if(task.completed == false) {
                const checkMark = document.querySelectorAll(`.check_false`);
                for(i=0;i<checkMark.length;i++) {
                    checkMark[i].style.display = 'none';
                    checkMark[i].nextElementSibling.style.textDecoration = 'none';
                }
            }else {
                const checkMark = document.querySelectorAll(`.check_true`);
                for(i=0;i<checkMark.length;i++) {
                    checkMark[i].style.display = 'block';
                    checkMark[i].nextElementSibling.style.textDecoration = 'line-through';
                }
            }

            const deleteButton = document.querySelectorAll('.delet');
            for(i=0;i<deleteButton.length;i++) {
                deleteButton[i].onclick =async function() {
                    try {
                        const taskDel = await axios.delete(`/api/v1/tasks/${this.id}`);
                        let element = document.getElementById(this.id).parentElement.parentElement;
                        element.style.transition = 'all 600ms ease';
                        element.style.transform = 'translateY(-3rem)';
                        element.style.opacity = '0.2';

                        element.addEventListener('transitionend', function() {
                            element.style.display = 'none';
                        })
                        
                    }catch(err) {
                        return err;
                    }
                }
            }
        }) 
    } catch (err) {
        alertTask.innerHTML = '<span id="alert_tfa">No task to add try again...</span>';
        setTimeout(function() {
            document.getElementById('alert_tfa').style.display='none';
        }, 2000)   
    }

}
showTasks();

async function addTask(e) {
    e.preventDefault();
    try {
        showTasks(axios.post('/api/v1/tasks', {
            name: taskInput.value
        }));
        alertTask.innerHTML = '<span id="alert_tsu">success!</span>';
        setTimeout(function() {
            document.getElementById('alert_tsu').style.display='none';
        }, 2000)  
    } catch(err) {
        alertTask.innerHTML = '<span id="alert_tfa">No task to add try again...</span>';
        setTimeout(function() {
            document.getElementById('alert_tfa').style.display='none';
        }, 2000)  
    }
    taskInput.value = '';
}


window.onload = ()=> taskInput.focus();