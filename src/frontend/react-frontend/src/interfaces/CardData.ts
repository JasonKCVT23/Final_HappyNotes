export interface CardData {
  id: string; 
  cardTitle: string; 
  content: any; // mongoose.Schema.Types.Mixed allows any type
  createdAt: Date; 
  updatedAt: Date; 
  dueDate?: Date; 
  tag?: string; 
  position: { 
    x: number;
    y: number;
  };
  dimensions: { 
    width: number;
    height: number;
  };
  connection?: Array<{ 
    edge: number; // 0 (U), 1 (R), 2 (D), 3 (L)
    connectionId: string; 
  }>;
  comments?: Array<{ 
    commentId: string; 
    userId: string; 
    content: string;
    createdAt: Date; 
  }>;
}
