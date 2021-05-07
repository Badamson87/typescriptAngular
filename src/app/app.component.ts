import {Component, OnInit} from '@angular/core';
import {Todo} from "../interfaces/todo";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  todos: Todo[] = [{id: 0, checked: false, title: 'Test'}];
  public todoForm: any

  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRouter: ActivatedRoute) {
    this.todoForm = this.formBuilder.group({
      'title': ['', [Validators.required,]]
    })
  }

  ngOnInit(): void {
  }

  addTodo() {
    this.todos.push(this.todoForm.value);
    this.todoForm.reset();
  }

  todoFilter(): Todo[]{
    const temp: Todo[] = [];
      this?.activatedRouter?.fragment?.subscribe(params => {
        switch (true) {
          case params.toString().includes('active'): {
            this.todos.forEach((todo) => {
              if (!todo.checked) temp.push(todo);
            })
            break;
          }
          case params.toString().includes('completed'): {
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
      })
        return temp;
  }

  clearCompleted(){
    this.todos.forEach((todo, index) => {
      if(todo.checked) this.todos.splice(index, 1);
    })
  }
}
