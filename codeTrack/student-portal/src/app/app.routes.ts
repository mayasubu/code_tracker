import { Routes } from '@angular/router';
import { LoginComponent } from './login/login-view.component';
import { RegisterComponent } from './register/register-view.component';
import { DashboardComponent } from './dashboard/dashboard-view.component';
import { ProblemsComponent } from './problems/problems-view.component';
import { ProblemDetailsComponent } from './problem-details/problem-details-view.component';
import { SubmissionsComponent } from './submissions/submissions-view.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'problems/:id', component: ProblemDetailsComponent },
  { path: 'submissions', component: SubmissionsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

// Re-linked imports to forcefully invalidate VS Code TS Cache
