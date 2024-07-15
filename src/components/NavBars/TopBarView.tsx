import { Component } from "solid-js";
import addAdmin from '../svg/addAdmin.svg';
import addEvent from '../svg/addEvent.svg';
import userIcon from '../svg/userIcon.svg';
import '../style/BGstyles.css'

const TopBarView: Component<{ title: string; activeIndex: number; onAddEventClick: () => void; onAddAdminClick: () => void }> = (props) => {
  return (
    <div class="topBarContainer">
      <div class="row">
        <h1 class="MainHead">{props.title}</h1>
        <div class="userIconContainer">
          <img src={userIcon} alt="User Icon" />
        </div>
      </div>
     
      <input class="search__input" type="text" placeholder="Search..." />
      <div class="buttonContainer">
        {props.activeIndex === 3 ? (
          <button class="actionButton" onClick={props.onAddAdminClick}>
            <img src={addAdmin} alt="Add Admin" />
          </button>
        ) : (
          <button class="actionButton" onClick={props.onAddEventClick}>
            <img src={addEvent} alt="Add Event" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBarView;
