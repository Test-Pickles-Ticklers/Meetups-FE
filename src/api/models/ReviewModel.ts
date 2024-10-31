interface ReviewModel {
  _id: string;
  meetupsId: string;
  reviewer: string;
  comment: string;
  rating: number;
  createdAt?: string;
}

export default ReviewModel;
