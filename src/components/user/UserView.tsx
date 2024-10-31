import { useEffect, useState } from 'react';
import { getUserReview } from '../../api/reviews/apiReviewCalls';
import ReviewModel from '../../api/reviews/models/reviewModel';

const UserView = () => {
  const [data, setData] = useState<ReviewModel[]>([]);

  const fetchData = async () => {
    try {
      const response = await getUserReview();
      console.log('User data:', response);

      setData(response);
    } catch (error: any) {
      console.error('Error fetching user reviews:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((reviews) => (
            <li key={reviews._id}>
              <strong>Reviewer:</strong> {reviews.reviewer}
              <br />
              <strong>Comment:</strong> {reviews.comment}
              <br />
              <strong>Rating:</strong> {reviews.rating}
              <br />
              <strong>Created At:</strong>{' '}
              {new Date(reviews.createdAt as string).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default UserView;
