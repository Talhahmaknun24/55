
export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  iteration?: number;
}

export enum TestStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  COMPLETED = 'COMPLETED'
}

export interface ApiResponse {
  status: number;
  data: any;
  error?: string;
}
