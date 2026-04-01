import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
      <div>
        <h2>Coding Problems</h2>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Practice and improve your skills.</p>
      </div>
    </div>

    <div class="glass-panel">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of problems">
            <td style="font-weight: 500;">{{ p.title }}</td>
            <td>
              <span class="badge" [ngClass]="{'badge-easy': p.difficulty==='Easy', 'badge-medium': p.difficulty==='Medium', 'badge-hard': p.difficulty==='Hard'}">
                {{ p.difficulty }}
              </span>
            </td>
            <td>
              <a [routerLink]="['/problems', p._id]" class="btn btn-primary" style="text-decoration: none; padding: 0.4rem 1rem; font-size: 0.9rem;">Solve</a>
            </td>
          </tr>
          <tr *ngIf="problems.length === 0">
            <td colspan="3" style="text-align: center;">No problems loaded.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .badge-easy { background: rgba(16, 185, 129, 0.1); color: var(--success); }
    .badge-medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    .badge-hard { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
  `]
})
export class ProblemsComponent implements OnInit {
  problems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/problems').subscribe(res => {
      if (res.success) this.problems = res.problems;
    });
  }
}
