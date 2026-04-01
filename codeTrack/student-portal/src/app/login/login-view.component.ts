import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel" style="max-width: 400px; margin: 4rem auto;">
      <h2 class="text-center mb-2" style="text-align: center; margin-bottom: 2rem;">Student Login</h2>
      <div *ngIf="error" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
        {{ error }}
      </div>
      
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label>Email Account</label>
          <input type="email" [(ngModel)]="email" name="email" class="form-control" required placeholder="student@example.com">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" class="form-control" required placeholder="••••••••">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed';
        }
      });
  }
}
