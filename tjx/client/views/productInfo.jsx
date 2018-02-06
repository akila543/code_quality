import React from 'react';
import {Button, Comment, Form, Header, Segment,Grid,Icon,Search,Divider,Input,Label,Menu,Image } from 'semantic-ui-react';
import CreateInfo from '../components/createInfo.jsx'

export default class ProductInfo extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      activeItem: 'create',
      activeItem2:'bread'
     }
  }
  render()
  {
    const {activeItem} = this.state
      const {activeItem2} = this.state
    return(
      <div>
          <Menu pointing style={{marginLeft:'30%',marginTop:'2%',marginRight:'33.2%'}}>
         <Menu.Item color={'teal'} name='CREATE PRODUCT INFORMATION' active={activeItem === 'create'} onClick={this.handleItemClick} className='createProdInfo'/>
         <Menu.Item name='VIEW PRODUCT INFORMATION' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          </Menu>
       <Segment.Group raised className = "segment" style={{marginLeft:'2%',marginRight:'2%',marginTop:'-0.5%'}}>
          <Grid>
          <Grid.Column width={3}>
            <h3 className='heading'>SELECT PRODUCT</h3>
            <Menu fluid vertical tabular>
              <Menu.Item name='bio' active={activeItem2 === 'egg'} onClick={this.handleMenuClick}><Image src='./images/egg.png' size='small' /></Menu.Item>
              <Menu.Item name='bio' active={activeItem2 === 'bread'} onClick={this.handleMenuClick}><Image src='./images/bread.png' size='small' /></Menu.Item>
              <Menu.Item name='bio' active={activeItem2 === 'milk'} onClick={this.handleMenuClick}><Image src='./images/milk.png' size='small' /></Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
              <CreateInfo/>
          </Grid.Column>
        </Grid>
       </Segment.Group>
    </div>
    );
  }
}
