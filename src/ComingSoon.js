import React from 'react';
import './css/coming.css';

const ComingSoon = () =>
  <div id='list'>
    <h1>Coming Soon</h1>
    <div className='coming-header'>Social</div>
    <div className='coming-description'>
      The social feature will include a news feed where users will be able to post articles and images related to STEM. They will also be able to see posts shared by their followers. This space is intended for users to inspire themselves and each other. To make the posts easier to scan and digest, they will display in a masonry / cascading grid layout.

      Under the social feature, users will also be able to message and chat with one another, helping to create a sense of community among users.
    </div>
    <img className='coming-image' src="src/img/social-demo-screenshot.jpg" alt='social'/>
    <div className='coming-header'>Scheduling and Calendar</div>
    <div className='coming-description'>
      The calendar feature will allow mentors and mentees to schedule meetings, phone calls, deadlines and any other    time-sensitive reminders.
    </div>
    <img className='coming-image' src="src/img/calendar-demo-screenshot.jpg" alt='social'/>
  </div>


export default ComingSoon;
