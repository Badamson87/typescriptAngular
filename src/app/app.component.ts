import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Todo} from "../interfaces/todo";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  defaultTodo = {checked: false, title: ""}
  todo: Todo = this.defaultTodo;
  todos: Todo[] = [{id: 0, checked: false, title: 'Test'}];

  public todoForm: any
  constructor(public formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      'title': ['', [Validators.required,]]
    })
  }

  ngOnInit(): void {
  }



  editTodo() {
    console.log(this.todoForm.value);
    this.todos.push(this.todoForm.value);
    this.todoForm.reset();
    this.todo = this.defaultTodo;
  }

}
