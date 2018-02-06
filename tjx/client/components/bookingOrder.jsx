import React from 'react';
import {Button, Comment, Form, Header, Segment,Grid,Icon,Search,Divider,Input,Label,Menu,Image,Select,Radio,TextArea,Dropdown,Table,Modal  } from 'semantic-ui-react';
import Request from 'superagent';
export default class BookingOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boDetails : [],
      modalOpen : false,
      modalDetails : '',
      flag : false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmBooking = this.handleConfirmBooking.bind(this);
    this.handleDeliveryDate = this.handleDeliveryDate.bind(this);
    this.handleCarrierId = this.handleCarrierId.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
  }
  componentDidMount() {
    Request.get('/getBookingOrder')
          .end((err, res) => {
            if (err) {
              console.log('Error from fetching bookingOrder data - > ',err);
            } else {
              console.log('response from bookingOrder data - > ',JSON.parse(res.text));
              this.setState({boDetails:JSON.parse(res.text)});
              console.log('state - > ',this.state.boDetails);
            }
          });
  }
  handleOpen(item) {
    this.setState({modalOpen: true, modalDetails:item});
  }
  handleClose() {
    this.setState({modalOpen: false});
  }
  handleDeliveryDate(e,data){
    var modalDetails = this.state.modalDetails;
    modalDetails.po_delivery_date = data.value;
    this.setState({modalDetails:modalDetails, flag:true});
  }
  handleCarrierId(e,data){
    var modalDetails = this.state.modalDetails;
    modalDetails.carrier_id = data.value;
    this.setState({modalDetails:modalDetails, flag:true});
  }
  handleDestination(e,data){
    var modalDetails = this.state.modalDetails;
    modalDetails.destination = data.value;
    this.setState({modalDetails:modalDetails, flag:true});
  }
  handleConfirmBooking() {
    console.log('log from confirm - > ',this.state.modalDetails);
    var modalDetails = this.state.modalDetails;
    if (this.state.flag) {
      modalDetails.bo_status = 'Manual Override';
    } else {
      modalDetails.bo_status = 'Confirmed';
    }
    this.setState({modalDetails:modalDetails});
    Request.post('/postBookingOrder')
          .query({boData : this.state.modalDetails})
          .end((err, res) => {
            if (err) {
              console.log('Error in posting updated bo data - > ', err);
            } else {
              console.log('res for posting updated bo data - > ', res);
            }
          });
    this.setState({modalOpen: false, flag:false})
  }
  render() {
    var modalDetails = this.state.modalDetails;
    var tableBody = this.state.boDetails.map((item, i) => {
      return(
        <Table.Row key={i}>
          <Table.Cell className='table1'>
            {item.bo_id}
            <span> - </span>
            <Button onClick={()=>this.handleOpen(item)} icon><Icon name='external' /></Button>
          </Table.Cell>
          <Table.Cell className='table1'>{item.po_id}</Table.Cell>
          <Table.Cell className='table1'>{item.carrier_id}</Table.Cell>
          <Table.Cell className='table1'>{item.po_delivery_date}</Table.Cell>
          <Table.Cell className='table1'>{item.destination}</Table.Cell>
          <Table.Cell className='table1'>{item.type_of_delivery}</Table.Cell>
          <Table.Cell className='table1'>{item.bo_status}</Table.Cell>
        </Table.Row>
      );
    });
    return(
      <div>
        <Image src='./images/top1.png'/>
        <br/>
        <Header as='h2' icon textAlign='center'>
          <Icon name='shipping' color='red' circular />
          <Header.Content className='header'>
            Booking Orders
          </Header.Content>
        </Header>
        <Segment>
          <Table inverted >
            <Table.Header >
              <Table.Row>
                <Table.HeaderCell className='tableHeader'>Booking Order Id</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Purchase Order Id</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Carrier Id</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Delivery Date</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Destination</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Type of Delivery</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Booking Order Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableBody}
            </Table.Body>
          </Table>
        </Segment>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='large'>
                  <Header as='h2' className='modalHeader'>
                    <Icon name='browser' />
                    <Header.Content >
                      Booking Orders
                    </Header.Content>
                  </Header>
                  <Modal.Content>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right',content: 'Booking Order ID' }}
                            labelPosition='left'
                            value={modalDetails.bo_id} fluid
                            disabled
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Booking Order Status' }}
                            labelPosition='left'
                            value={this.state.modalDetails.bo_status} fluid
                            disabled
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Purchase Order ID' }}
                            labelPosition='left'
                            value={this.state.modalDetails.po_id} fluid
                            disabled
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Purchase Order Creation Date' }}
                            labelPosition='left'
                            value={this.state.modalDetails.po_creation_date} fluid
                            disabled
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Pickup Date' }}
                            labelPosition='left'
                            value={this.state.modalDetails.po_pickup_date} fluid
                            disabled
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Input
                            label={{  color:'yellow',pointing:'right', content: 'Delivery Date' }}
                            labelPosition='left'
                            defaultValue={this.state.modalDetails.po_delivery_date} fluid
                            onChange={this.handleDeliveryDate}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Vendor ID' }}
                            labelPosition='left'
                            value={this.state.modalDetails.vendor_id} fluid
                            disabled
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Input
                            label={{  color:'yellow',pointing:'right', content: 'Carrier ID' }}
                            labelPosition='left'
                            defaultValue={this.state.modalDetails.carrier_id} fluid
                            onChange={this.handleCarrierId}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Origin' }}
                            labelPosition='left'
                            value={this.state.modalDetails.origin} fluid
                            disabled
                          />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'yellow', pointing:'right', content: 'Destination' }}
                            labelPosition='left'
                            defaultValue={this.state.modalDetails.destination} fluid
                            onChange={this.handleDestination}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            label={{ color:'grey', pointing:'right', content: 'Type Of Delivery' }}
                            labelPosition='left'
                            value={this.state.modalDetails.type_of_delivery} fluid
                            disabled
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.handleConfirmBooking} inverted>
                      <Icon name='warning' /> Confirm
                    </Button>
                    <Button color='red' onClick={this.handleClose} inverted>
                     <Icon name='close' /> Close
                   </Button>
                 </Modal.Actions>
                </Modal>
      </div>
    );
  }
}
