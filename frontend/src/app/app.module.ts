import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MembresComponent } from './components/membres/membres.component';
import { NewProjectComponent } from './components/modal/newproject.component';
import { NewTaskComponent } from './components/modal/newtask.component';
import { TaskModalComponent } from './components/modal/taskmodal.component';
import { TachesComponent } from './components/taches/taches.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { NavComponent } from './layouts/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AppRoots } from './app.root';
import {HttpClientModule} from "@angular/common/http"
import { AuthService } from './services/auth.service';
import { GuestGuard } from './guards/guest.guard';
import { ProjectService } from './services/project.service';
import { ProjectGuard } from './guards/project.guard';
import { TaskService } from './services/task.service';
import { TachesItemComponent } from './components/taches/taches-item.component';
import { ChartPageComponent } from './components/taches/chart-page.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { TrackService } from './services/track.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent , 
    TachesComponent , 
    TaskModalComponent , 
    MembresComponent , 
    ProjectsComponent , 
    NewProjectComponent ,
    TrackingComponent ,
    NewTaskComponent , 
    LoginComponent , 
    SigninComponent ,
    TachesItemComponent ,
    ChartPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule , 
    HttpClientModule,
    NgxApexchartsModule ,
    RouterModule.forRoot(AppRoots)
    ],
  providers: [
    UserService , 
    AuthService , 
    ProjectService ,
    TaskService, 
    TrackService,
    GuestGuard ,  
    AuthGuard ,
    ProjectGuard 
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
