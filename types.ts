export interface ZoningResult {
  verdict: 'APPROVED' | 'DENIED';
  analysis: string;
  gotcha: string;
  actionPlan: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface FileData {
  file: File;
  preview: string;
}