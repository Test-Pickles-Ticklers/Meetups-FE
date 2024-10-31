import { useParams } from 'react-router-dom';
import useMeetupMutation from './hooks/useMeetupMutation';

const MeetupInDetail = () => {
  const { id } = useParams();

  const { meetup, isLoading } = useMeetupMutation(id!);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {meetup && (
        <div>
          <h1>{meetup.title}</h1>
          <p>{meetup.organizer}</p>
          <p>{meetup.date}</p>
          <p>{meetup.time}</p>
          <p>{meetup.location}</p>
          <p>{meetup.participants}</p>
        </div>
      )}
    </>
  );
};

export default MeetupInDetail;
