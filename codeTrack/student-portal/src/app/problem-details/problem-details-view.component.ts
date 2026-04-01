import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-problem-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
      <div>
        <h2>{{ problem?.title || 'Loading...' }}</h2>
        <div style="margin-top: 0.5rem;" *ngIf="problem">
          <span class="badge" [ngClass]="{'badge-easy': problem.difficulty==='Easy', 'badge-medium': problem.difficulty==='Medium', 'badge-hard': problem.difficulty==='Hard'}">{{ problem.difficulty }}</span>
          <span *ngFor="let t of problem.tags" class="badge" style="background: rgba(255,255,255,0.1); color: var(--text-muted); margin-left: 0.5rem;">{{t}}</span>
        </div>
      </div>
      <a routerLink="/problems" class="btn btn-outline" style="text-decoration: none;">&larr; Back</a>
    </div>

    <div style="display: flex; gap: 2rem;">
      <div style="flex: 1;" class="glass-panel">
        <h3 style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">Description</h3>
        <p style="color: var(--text-muted); line-height: 1.6;">{{ problem?.description }}</p>
        
        <h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Sample Input</h4>
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-family: monospace;">{{ problem?.sampleInput }}</div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Sample Output</h4>
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-family: monospace;">{{ problem?.sampleOutput }}</div>
      </div>

      <div style="flex: 1;" class="glass-panel">
        <h3 style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">Code Editor</h3>
        <textarea [(ngModel)]="code" placeholder="Write your solution here..." style="font-family: monospace; min-height: 300px; width: 100%; background: #000; color: #0f0; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
          <span style="font-weight: 500;" [ngStyle]="{'color': msgColor}">{{ statusMsg }}</span>
          <button (click)="submitCode()" class="btn btn-primary" [disabled]="submitting">{{ submitting ? 'Running...' : 'Run & Submit' }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge-easy { background: rgba(16, 185, 129, 0.1); color: var(--success); }
    .badge-medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    .badge-hard { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
  `]
})
export class ProblemDetailsComponent implements OnInit {
  problem: any = null;
  code: string = '';
  submitting = false;
  statusMsg = '';
  msgColor = 'var(--text-main)';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<any>('/api/problems/' + id).subscribe(res => {
        if (res.success) this.problem = res.problem;
      });
    }
  }

  submitCode() {
    if (!this.code.trim()) {
      alert('Enter some code!');
      return;
    }
    this.submitting = true;
    this.statusMsg = 'Running tests...';
    this.msgColor = 'var(--text-muted)';
    this.http.post<any>('/api/submissions', { problemId: this.problem._id, code: this.code })
      .subscribe({
        next: (res) => {
          this.submitting = false;
          if (res.success) {
            this.statusMsg = `Result: ${res.submission.status}`;
            this.msgColor = res.submission.status === 'Accepted' ? 'var(--success)' : 'var(--danger)';
          } else {
            this.statusMsg = 'Error processing evaluation';
            this.msgColor = 'var(--danger)';
          }
        },
        error: () => {
          this.submitting = false;
          this.statusMsg = 'Network Error';
          this.msgColor = 'var(--danger)';
        }
      });
  }
}
