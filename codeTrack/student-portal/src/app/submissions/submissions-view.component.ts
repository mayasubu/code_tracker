import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
      <div>
        <h2>Your Submissions</h2>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Review your past code attempts.</p>
      </div>
      <button (click)="load()" class="btn btn-outline">Refresh</button>
    </div>

    <div class="glass-panel">
      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of submissions">
            <td><a [routerLink]="['/problems', s.problemId._id]" style="color: var(--text-main); font-weight: 500; text-decoration: none;">{{ s.problemId.title }}</a></td>
            <td>
              <span class="badge" [ngClass]="{'badge-easy': s.problemId.difficulty==='Easy', 'badge-medium': s.problemId.difficulty==='Medium', 'badge-hard': s.problemId.difficulty==='Hard'}">{{ s.problemId.difficulty }}</span>
            </td>
            <td>
              <span class="badge" [ngClass]="{'badge-easy': s.status==='Accepted', 'badge-medium': s.status==='Pending', 'badge-hard': s.status==='Wrong Answer'}">{{ s.status }}</span>
            </td>
            <td style="color: var(--text-muted); font-size: 0.9rem;">{{ s.createdAt | date:'short' }}</td>
          </tr>
          <tr *ngIf="submissions.length === 0">
            <td colspan="4" style="text-align: center;">No submissions yet.</td>
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
export class SubmissionsComponent implements OnInit {
  submissions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any>('/api/submissions/my').subscribe(res => {
      if (res.success) this.submissions = res.submissions;
    });
  }
}
