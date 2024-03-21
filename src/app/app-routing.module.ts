import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Poc1Component } from './pages/poc1/poc1.component';
import { Poc2Component } from './pages/poc2/poc2.component';

const routes: Routes = [
  { path: '', redirectTo: 'poc1', pathMatch: 'full'},
  { path:'poc1', component: Poc1Component },
  { path:'poc2', component: Poc2Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
