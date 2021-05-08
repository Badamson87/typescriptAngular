
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
        return this.http.put('api/todo', todo);
    }

}
