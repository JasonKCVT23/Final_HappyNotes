import { CardData } from '../Card/CardData';
export interface WhiteboardData {
    _id: string; 
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
    cards: CardData[]; 
  }
  