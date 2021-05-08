
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Todo} from "../../src/interfaces/todo";

@Injectable()
export class TodoService {
    constructor(private http: HttpClient) {
    }

    public getAll() {
        return this.http.get('api/todo');
    }

    public create(todo: Todo) {
        return this.http.post('api/todo', todo);
    }

    public update(todo: Todo) {
        return this.http.put('api/todo', todo);
    }

    public delete(todos: string){
        return this.http.delete('api/todo/:todos', )
    }

}
