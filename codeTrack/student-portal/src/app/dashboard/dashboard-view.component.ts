import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
      <div>
        <h2>Welcome back, <span style="color: var(--accent);">{{ user?.name }}</span></h2>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">{{ user?.registerNumber }} • {{ user?.department }} Department</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
      <div class="glass-panel" style="text-align: center;">
        <div style="font-size: 3rem; font-weight: 700; color: var(--accent); margin-bottom: 0.5rem;">{{ stats.total }}</div>
        <div style="color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem;">Total Problems</div>
      </div>
      <div class="glass-panel" style="text-align: center;">
        <div style="font-size: 3rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">{{ stats.attempted }}</div>
        <div style="color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem;">Attempted</div>
      </div>
      <div class="glass-panel" style="text-align: center;">
        <div style="font-size: 3rem; font-weight: 700; color: var(--success); margin-bottom: 0.5rem;">{{ stats.solved }}</div>
        <div style="color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem;">Solved</div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  user: any = null;
  stats = { total: 0, attempted: 0, solved: 0 };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any>('/api/auth/session').subscribe({
      next: (res) => { if (res.success) this.user = res.user; },
      error: () => this.router.navigate(['/login'])
    });

    this.http.get<any>('/api/submissions/stats').subscribe(res => {
      if (res.success) {
        this.stats.total = res.stats.totalProblems;
        this.stats.attempted = res.stats.attempted;
        this.stats.solved = res.stats.solved;
      }
    });
  }
}
