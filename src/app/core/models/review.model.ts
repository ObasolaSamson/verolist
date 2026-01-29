export interface Review {
  id: string;
  businessId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

