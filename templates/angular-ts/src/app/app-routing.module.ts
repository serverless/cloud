import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetComponent } from './greet/greet.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'greet', component: GreetComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
