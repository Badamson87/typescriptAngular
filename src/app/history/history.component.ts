import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../../server/services/todo.service";
import {Todo} from "../../interfaces/todo";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodoHistory();
  }

  getTodoHistory(){
    this.todoService.getAllHistory().subscribe((result: Todo[]) => {
      this.todos = result;
    }, (err: Error) => {
      console.log(err);
    })
  }

  hardDelete(){
    let temp: string = ''
    this.todos.forEach((todo, index) => {
      if (todo.hardDelete) {
        temp += temp.length > 0 ? ',' + todo.id : todo.id;
        this.todoService.delete(temp)
            .subscribe((result: any) => {
              this.todos.forEach((todo, i) => {
                if(todo.hardDelete) this.todos.splice(i, 1);
              })
            }, (err: Error) => {
              console.log(err);
            })
      }
    })
  }
}
