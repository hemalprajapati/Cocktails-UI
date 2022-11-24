import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { CocktailComponent } from './components/cocktail/cocktail.component';

const routes: Routes = [
  { path:'', redirectTo: '/cocktails', pathMatch: 'full'},
  { path: 'cocktails', component: CocktailsComponent },
  { path: 'cocktails/:id', component: CocktailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
