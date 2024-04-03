import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Poc1Component } from './pages/poc1/poc1.component';
import { Poc2Component } from './pages/poc2/poc2.component';
import { SeuElectronicaComponent } from './pages/seu-electronica/seu-electronica.component';

const routes: Routes = [
  { path: '', redirectTo: 'poc1-buscador-universal', pathMatch: 'full'},
  { path:'poc1-buscador-universal', component: Poc1Component },
  { path:'poc2-analisis-documentos', component: Poc2Component },
  { path:'poc1-seu-electronica', component: SeuElectronicaComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
