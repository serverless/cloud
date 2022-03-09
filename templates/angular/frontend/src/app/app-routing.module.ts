import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetComponent } from './greet/greet.component';

const routes: Routes = [
  { path: 'greet', component: GreetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
