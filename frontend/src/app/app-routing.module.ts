import { RedirectAfterLoginGuard } from './guards/RedirectAfterLogin.guard';
import { InitialComponent } from './pages/Initial/Initial.component';
import { NotFoundComponent } from './pages/NotFound/NotFound.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsAuthGuard } from './guards/IsAuth.guard';

const routes:Routes = [
    {
        path:'auth',
        loadChildren:()=>import('./pages/Auth/Auth.module').then(m=>m.AuthModule)
    },
    {
        path:'songs',
        loadChildren:()=>import('./pages/Songs/Songs.module').then(m=>m.SongsModule),
        canActivate:[IsAuthGuard]
    },
    {
        path:'',
        component:InitialComponent,
        canActivate:[RedirectAfterLoginGuard]
    },
    {
        path:'home',
        redirectTo:'songs'
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