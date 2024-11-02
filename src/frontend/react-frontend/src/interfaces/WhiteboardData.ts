export interface WhiteboardData {
    id?: string; 
    whiteboardTitle: string; 
    isPrivate: boolean; 
    userId: string; 
    createdAt: Date; 
    updatedAt: Date; 
    position: { 
      x: number;
      y: number;
    };
    dimensions: { 
      width: number;
      height: number;
    };
    cards: string[]; // Array of Card ObjectIds as strings
  }
  