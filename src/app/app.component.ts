import {Component, OnInit} from '@angular/core';
import {Todo} from "../interfaces/todo";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../../server/services/todo.service";
import {defer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  public todoForm: any
  public updateForm: any

  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRouter: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.todoForm = this.formBuilder.group({
      'id': [''],
      'title': ['', [Validators.required,]]
    })
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe((result: any) => {
      this.todos = result;
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
      this.todos.push(todo);
      this.todoForm.reset();
    }, (err: Error) => {
      console.log(err);
    });
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

  clearCompleted() {
    let temp: string = "";
    this.todos.forEach((todo, index) => {
      if (todo.checked) {
        temp += temp.length > 0 ? ',' + todo.id : todo.id;
        this.todoService.delete(temp)
            .subscribe((result: any) => {
              this.todos.forEach((todo, i) => {
                if(todo.checked) this.todos.splice(i, 1);
              })
        }, (err: Error) => {
          console.log(err);
        })
      }
    })
  }

}
