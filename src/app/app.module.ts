import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        // CommonModule,
    ],
    providers: [FormBuilder],
    bootstrap: [AppComponent]
})
export class AppModule { }
