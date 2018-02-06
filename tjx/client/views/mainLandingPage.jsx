import React from 'react';

import AppBarCrew from '../components/appbarCrew.jsx';
import CrewChatBox from '../components/crewchatbox.jsx';
import {Doughnut} from 'react-chartjs-2';
import SwipeableViews from 'react-swipeable-views';
import {Grid,Image,Icon,Divider,Segment,Header,Menu,Sidebar,Dropdown} from 'semantic-ui-react';

import CrewLandingPage from '../components/crewLandingPage.jsx';

const trigger = (
  <Menu.Item as='a' >
    <span style={{paddingRight:'5px'}}>Catherine</span>
    <img className="ui avatar image" src="./../../images/avatar.jpg" />
    <span style={{padding:'20px'}}><CrewChatBox/></span>
  </Menu.Item>
)

const options = [
  { key: 'user', text: 'My profile', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

export default class Cre extends React.Component
{
  constructor(props)
  {
    super(props);
     this.state= {
       sidebarVisiblity: false,
       toggleIcon: 'content'
     }
  }
  handleSiderbarVisiblity()
  {
    if (this.state.sidebarVisiblity)
      this.setState({
        sidebarVisiblity: !this.state.sidebarVisiblity,
        toggleIcon: 'content'
      })
    else
      this.setState({
        sidebarVisiblity: !this.state.sidebarVisiblity,
        toggleIcon: 'remove'
      })
  }

  render()
  {
    const {visible} = this.state
     return(
       <div  className = "sidebar">
       <Sidebar.Pushable as={Segment}>
         <Sidebar as={Menu} animation='push'   width='thin' visible={this.state.sidebarVisiblity} icon='labeled' vertical inverted>
           <Menu.Item name='meals layout'>
             <Icon name='food' />
Meals Layout
           </Menu.Item>
           <Menu.Item name='gamepad'>
             <Icon name='wheelchair' />
             People Layout
           </Menu.Item>
           <Menu.Item name='gamepad'>
             <Icon name='users' />
             People Layout
           </Menu.Item>
           <Menu.Item name='file text outline'>
             <Icon name='file text outline' />
            Passenger Manifest
           </Menu.Item>
           <Menu.Item name='gamepad'>
             <Icon name='checked calendar' />
          Check List
           </Menu.Item>
           <Menu.Item name='gamepad'>
             <Icon name='write square' />
          12 Point Document
           </Menu.Item>
           <Menu.Item name='gamepad'>
             <Icon name='alarm outline' />
          Service Request
           </Menu.Item>

         </Sidebar>
         <Sidebar.Pusher>
           <Segment basic style={{
              padding:"14px 0px"}}>
              <Menu secondary className='appbar' inverted>
              <Menu.Item name='browse'>
              <Icon name={this.state.toggleIcon} inverted style={{
                marginLeft: '0px'
              }} onClick={this.handleSiderbarVisiblity.bind(this)}/>
            </Menu.Item>
                <Menu.Item name='submit'>
                  <Icon name='send'/>
                  <span className='companyName'>Airlines</span>
                </Menu.Item>
                <Menu.Menu position='right' style={{paddingRight:'10px'}}>
                  <Dropdown  trigger={trigger} options={options} pointing='top right' icon={null}/>
                </Menu.Menu>
              </Menu>
              </Segment>
              <CrewLandingPage/>
         </Sidebar.Pusher>
       </Sidebar.Pushable>

      </div>
    );
  }
}
