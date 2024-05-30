import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";
import { ProjectGuard } from "./guards/project.guard";
import { LoginComponent } from "./pages/login/login.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { TrackingComponent } from "./pages/tracking/tracking.component";

export const AppRoots : any = [
    {path : "projects" , component : ProjectsComponent , canActivate:[AuthGuard] } , 
    {path : "app/:id" , component : TrackingComponent , canActivate:[AuthGuard , ProjectGuard]},
    {path : "" , component : LoginComponent , canActivate:[GuestGuard]},
    {path : "signin" , component : SigninComponent , canActivate:[GuestGuard]}
  ]