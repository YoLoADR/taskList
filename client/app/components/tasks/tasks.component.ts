import { Component } from '@angular/core';
import { TaskService } from '../../services/task.services';
import {Task} from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: `tasks.component.html`
})
export class TasksComponent  {
  tasks: Task[];
  title: string;
  // La méthode “subscribe” attend une fonction (en premièr argument) qui prend en argument les données retournées par l’appel =~ .then(function(data){this.tasks = data;})
  // source : https://www.metal3d.org/ticket/introduction-a-angular2
  constructor(private taskService:TaskService){
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  addTask(event){
    event.preventDefault();
    console.log(this.title);
    var newTask = {
      title: this.title,
      idDone: false
    };

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id){
    var tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(data => {
      if(data.n === 1){
        for(var i = 0; i < tasks.length; i++){
          if(tasks[i]._id == id){
            tasks.splice(i,1);
          }
        }
      }
    });
  }

  updateStatus(task){

   var _task = {
     _id: task._id,
     title: task.title,
     isDone: !task.isDone
   };

   this.taskService.updateStatus(_task).subscribe(data => {
     console.log("holla taks", task);
     task.isDone = !task.isDone;
   });
  }
}
