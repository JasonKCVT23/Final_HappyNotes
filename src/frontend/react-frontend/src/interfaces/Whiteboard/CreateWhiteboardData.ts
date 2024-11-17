import { CardData } from '../Card/CardData';

export interface CreateWhiteboardData {
  whiteboardTitle: string;
  isPrivate: boolean;
  userId: string;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  cards: CardData[];
  createdAt: Date;
  updatedAt: Date;
}