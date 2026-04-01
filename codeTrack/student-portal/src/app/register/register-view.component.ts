import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="glass-panel" style="max-width: 500px; margin: 2rem auto;">
      <h2 class="text-center mb-2" style="text-align: center; margin-bottom: 2rem;">CSE Department Registration</h2>
      <div *ngIf="error" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
        {{ error }}
      </div>
      
      <form (ngSubmit)="register()">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="form.name" name="name" class="form-control" required placeholder="John Doe">
        </div>
        <div class="form-group">
          <label>Register Number</label>
          <input type="text" [(ngModel)]="form.registerNumber" name="registerNumber" class="form-control" required placeholder="Ex: URK20CS1001">
        </div>
        <div class="form-group">
          <label>Department</label>
          <input type="text" [(ngModel)]="form.department" name="department" class="form-control" readonly>
        </div>
        <div class="form-group">
          <label>University Email</label>
          <input type="email" [(ngModel)]="form.email" name="email" class="form-control" required placeholder="student@university.edu">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="form.password" name="password" class="form-control" required placeholder="••••••••">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
      </form>
      <div style="text-align: center; margin-top: 2rem; font-size: 0.9rem;">
        <span style="color: var(--text-muted);">Already registered?</span> <a routerLink="/login" style="color: var(--accent); text-decoration: none;">Log in</a>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form = { name: '', registerNumber: '', department: 'CSE', email: '', password: '' };
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post<any>('/api/auth/register', this.form).subscribe({
      next: (res) => {
        if (res.success) this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}
