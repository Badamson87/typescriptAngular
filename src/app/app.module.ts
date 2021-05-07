import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './history/history.component';


@NgModule({
    declarations: [
    AppComponent,
    HistoryComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,

        // CommonModule,
    ],
    providers: [FormBuilder, {provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
