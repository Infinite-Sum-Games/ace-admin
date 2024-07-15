import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import '../style/BGstyles.css';
import dIcon from '../svg/dIcon1.svg';
import news0 from '../svg/news0.svg';
import Admin0 from '../svg/admin0.svg';
import draft from '../svg/draft.svg';
import logout from '../svg/logout.svg';

const SideBar: Component<{ activeIndex: number; setActiveIndex: (index: number) => void }> = (props) => {
  const [isCampaignsOpen, setIsCampaignsOpen] = createSignal(false);

  const toggleCampaigns = () => {
    setIsCampaignsOpen(!isCampaignsOpen());
  };

  const closeCampaigns = () => {
    setIsCampaignsOpen(false);
  };

  return (
    <div class="sideBar">
      <h1 class="head">ACE ADMIN</h1>
      <ul>
        <li>
          <a class={props.activeIndex === 0 ? 'active' : ''} onClick={() => {props.setActiveIndex(0);closeCampaigns();}}>
            <img src={dIcon} alt="Dashboard Icon" />
            Dashboard
          </a>
        </li>
        <li>
          <a class={props.activeIndex === 1 ? 'active' : ''} onClick={() => {props.setActiveIndex(1);closeCampaigns();}}>
            <img src={draft} alt="Draft Icon" />
            Draft
          </a>
        </li>
        <li>
          <a class={props.activeIndex === 2 ? 'active' : ''} onClick={() => {props.setActiveIndex(2);toggleCampaigns();}}>
            <img src={news0} alt="Campaigns Icon" />
            Campaigns
          </a>
          <div class={`dropdown ${isCampaignsOpen() ? 'active' : ''}`}>
            <ul>
              <li>
                <a class={props.activeIndex === 4 ? 'active' : ''} onClick={() => {props.setActiveIndex(4);}}>
                  Newsletter
                </a>
              </li>
              <li>
                <a class={props.activeIndex === 5 ? 'active' : ''} onClick={() => {props.setActiveIndex(5);}}>
                  Subscribers
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li style="align-items: left;">
          <a class={props.activeIndex === 3 ? 'active' : ''} onClick={() => { props.setActiveIndex(3);closeCampaigns();}}>
            <img src={Admin0} alt="Admin Icon" />
            Admin
          </a>
        </li>
      </ul>
      <button class="actionButton">
        <img src={logout} alt="Logout" />
      </button>
    </div>
  );
};

export default SideBar;