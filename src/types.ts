export type FactoryArea = {
  id: string;
  name: string;
  status: 'normal' | 'busy' | 'risk' | 'error';
};

export type EventLog = {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
};

export type DemoState = 
  | 'idle' 
  | 'initializing' 
  | 'reasoning' 
  | 'recommendations' 
  | 'kpi_update' 
  | 'exception'
  | 'exception_reasoning'
  | 'rebalanced'
  | 'chat'
  | 'report';
