import { RedirectAfterLoginGuard } from './guards/RedirectAfterLogin.guard';
import { InitialComponent } from './pages/Initial/Initial.component';
import { NotFoundComponent } from './pages/NotFound/NotFound.component';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsAuthGuard } from './guards/IsAuth.guard';
import { HomeComponent } from './pages/Home/Home.component';

const routes:Routes = [
    {
        path:'auth',
        loadChildren:()=>import('./pages/Auth/Auth.module').then(m=>m.AuthModule)
    },
    {
        path:'',
        component:InitialComponent,
        canActivate:[RedirectAfterLoginGuard]
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate:[IsAuthGuard]
    },
    {
        path:'not-found',
        component:NotFoundComponent
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{}