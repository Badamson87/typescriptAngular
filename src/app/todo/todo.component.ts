import { Component, OnInit } from '@angular/core';
import {Todo} from "../../interfaces/todo";
import {FormBuilder, Validators} from "@angular/forms";
import {TodoService} from "../../../server/services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  public todoForm: any
  state: string = '';

  constructor(public formBuilder: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.formBuilder.group({
      'id': [''],
      'title': ['', [Validators.required,]]
    })
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe((result: any) => {
      this.todos = result;
      this.filteredTodos = result;
    }, (err: Error) => {
      console.log(err);
    });
  }

  updateTodo(todo: Todo){
    this.todoService.update(todo)
        .subscribe((result: any) => {
          console.log('success on update')
        },(err: Error) => {
          console.log(err)
        })
  }

  addTodo() {
    let todo: Todo = {checked: false, title: this.todoForm.controls["title"].value}
    this.todoService.create(todo)
        .subscribe((result: number) => {
          todo.id = result
          this.todos ? this.todos.push(todo) : this.todos = [todo];
          this.todoForm.reset();
          this.todoFilter(this.state);
        }, (err: Error) => {
          console.log(err);
        });
  }

  todoFilter(state: string | null){
    const temp: Todo[] = [];
    this.state = state;
      switch (state) {
        case 'Active': {
          this.todos.forEach((todo) => {
            if (!todo.checked) temp.push(todo);
          })
          break;
        }
        case 'Complete': {
          this.todos.forEach((todo) => {
            if (todo.checked) temp.push(todo);
          })
          break;
        }
        default: {
          this.todos.forEach((todo) => {
            temp.push(todo)
          })
        }
      }
   this.filteredTodos = temp;
  }

  clearCompleted() {
    let temp: string = "";
    this.todos.forEach((todo, index) => {
      if (todo.checked) {
        temp += temp.length > 0 ? ',' + todo.id : todo.id;
        this.todoService.deleteSoft(temp)
            .subscribe((result: any) => {
              this.todos.forEach((todo, i) => {
                if(todo.checked) this.todos.splice(i, 1);
              })
              this.todoFilter(this.state);
            }, (err: Error) => {
              console.log(err);
            })
      }
    })
  }
}
