interface AddReviewRequest {
  meetupsId: string;
  reviewer: string;
  comment: string;
  rating: number;
  createdAt?: string;
}

export default AddReviewRequest;
