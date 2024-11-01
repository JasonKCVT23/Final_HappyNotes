export interface User {
    id: string; 
    userName: string; 
    userPassword: string; 
    email: string; 
    whiteboards: string[]; // Array of Whiteboard ObjectIds as strings
    activityLog: Array<{ 
      action: string; 
      timestamp: Date; 
      entityType: string; 
      entityId: string; 
      detail: string; 
    }>;
  }
  