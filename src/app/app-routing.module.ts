import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Page1Component} from './page1/page1.component';
import {Page2Component} from './page2/page2.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {ColorsComponent} from "./utilities/colors/colors.component";
import {LayoutComponent} from "./layout/layout.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
      {path: 'dashboard', component: DashboardComponent, title: 'SB Admin 2 - Dashboard'},
      {path: 'page1', component: Page1Component, title: 'SB Admin 2 - Page1'},
      {path: 'page2', component: Page2Component, title: 'SB Admin 2 - Page2'},
      {
        path: 'utilities',
        children: [
          {path: 'colors/:type', component: ColorsComponent}
        ]
      },
    ]
  },
  // {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
