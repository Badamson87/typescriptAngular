import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './history/history.component';
import { TodoService } from "../../server/services/todo.service";


@NgModule({
    declarations: [
    AppComponent,
    HistoryComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers: [FormBuilder, {provide: APP_BASE_HREF, useValue: '/'},
        TodoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
