import { Link } from 'react-router-dom';
import UserOne from '../images/user/user-01.png';
import UserTwo from '../images/user/user-02.png';
import UserThree from '../images/user/user-03.png';
import UserFour from '../images/user/user-04.png';
import UserFive from '../images/user/user-05.png';
import Calendar from './CalendarView';

const ChatCard = () => {
  return (
    <div className="col-span-12 overflow-auto rounded-sm border border-stroke bg-white-500 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <Calendar weekendsVisible={true} currentEvents={[]}/>
    </div>
  );
};

export default ChatCard;
