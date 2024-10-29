import { useEffect } from 'react';
import { getAllMeetups } from '../../api/meetups/apiMeetupCalls';

const MeetupsView = () => {
  useEffect(() => {
    const data = async () => {
      const response = getAllMeetups();
      console.log('Full response:', response);

      console.log('Meetups data:', response, data);
    };
    data();
  }, []);
  return <div>MeetupsView</div>;
};

export default MeetupsView;
