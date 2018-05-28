import React from 'react';
import TeamItem from './TeamItem.jsx';
import * as CONFIG from 'constants/config';

class TeamList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ul className="list-team">
        <TeamItem name="Anna" position="Co-Founder" image="img-member-1.png" description={`<p>Book club meetings hold a special place in Anna's heart and calendar. She has been in a book club since 2005 and began leading the book club that inspired Bookclubz in Philadelphia in 2011. She is eager to field your questions, receive your feedback, and incorporate new ideas into the site.</p> <p>Currently, her favorite book club book is Just Kids by Patti Smith.</p>`} />
        <TeamItem name="Ian" position="Co-Founder" image="img-member-2.png" description={`<p>Ian is a self-taught computer programmer and the website engineer behind <a href="${CONFIG.LINK_SITE}">bookclubz.com</a>. He loves to code and work with start-up websites. He provides Bookclubz with ongoing tech support and website management. <a href="${CONFIG.LINK_SITE}">Bookclubz.com</a> wouldn't exist without him!</p> <p>His favorite book ever is John Steinbeck’s East of Eden.</p>`} />
      </ul>
    );
  }
}

export default TeamList;
