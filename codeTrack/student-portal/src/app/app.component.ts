import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
    <nav class="navbar">
      <a routerLink="/dashboard" class="nav-brand">CodeTrack Student</a>
      <div class="nav-links">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/problems">Problems</a>
        <a routerLink="/submissions">Submissions</a>
        <a (click)="goToAdmin()" class="btn btn-primary" style="margin-left:2rem; padding: 0.3rem 0.8rem; font-size: 0.85rem">Admin Login</a>
        <a (click)="logout()" class="btn btn-outline" style="margin-left:1rem; padding: 0.3rem 0.8rem; font-size: 0.85rem">Logout</a>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('/api/auth/logout', {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  goToAdmin() {
    // Hard redirect to load React Admin Portal
    window.location.href = '/admin';
  }
}
