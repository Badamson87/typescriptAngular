import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryComponent} from "./history/history.component";
import {TodoComponent} from "./todo/todo.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'about', component: AboutComponent },

  // { path: 'todo/**', component: TodoComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: '**', redirectTo: '/about', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
