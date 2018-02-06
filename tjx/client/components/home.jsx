import React from 'react';
import Carosel from './carosel.jsx';
import {Button, Comment, Form, Header, Segment,Grid,Icon,Search,Divider,Input,Label,Menu,Image,Select,Radio,TextArea,Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]
export default class Home extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state={
      activeItem: 'create',
      activeItem2:'bread'
     }
     this.handleScroll=this.handleScroll.bind(this);
  }
  handleScroll(){
    window.scrollTo(0,500);
  }
  render()
  {
    // const {activeItem} = this.state
    //   const {activeItem2} = this.state
    return(
      <div>
        <Image src='./images/top1.png' style={{width:"100%"}}/>
        <Image src='./images/poc.png' className='poc' onClick={this.handleScroll}/>
      <Carosel/>
      <br/>
        <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column width={9}>
          <Header as='h2' icon textAlign='center'>
             <Icon name='truck' color='red' circular />
             <br/>
             <Header.Content className='homeHeader'>
               Inventory
             </Header.Content>
             <br/>
             <br/>
             <Header.Content className='homeHeader'>
               Allocation Demo
             </Header.Content>
           </Header>
        </Grid.Column>
        <Grid.Column width={7}>
        <br/>
        <br/>
        <br/>
        <Button as={Link} to='/poView' color='linkedin' size='massive' fluid>
         <Icon name='browser' /> Purchase Orders
        </Button>
         <br/>
         <br/>
         <br/>
        <Button as={Link} to='/inventory' color='linkedin' size='massive' fluid>
         <Icon name='browser' /> Inventory View
        </Button>
        <br/>
        <br/>
        <br/>
        <Button as={Link} to='/boView' color='linkedin' size='massive' fluid>
          <Icon name='browser' /> Booking Orders
        </Button>
         <br/>
         <br/>
         <br/>
        </Grid.Column>
      </Grid.Row>

      </Grid>
    </div>
    );
  }
}
