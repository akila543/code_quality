import React from 'react';
import {Button, Comment, Form, Header, Segment,Grid,Icon,Search,Divider,Input,Label,Menu,Image,Select,Radio,TextArea,Dropdown,Table,Modal  } from 'semantic-ui-react';
import Request from 'superagent';
export default class ProductOrderViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData : [],
      poDetails : [],
      modalOpen : false,
      skuDetails : [],
      allocationModalOpen:false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAllocation=this.handleAllocation.bind(this);
  }
  componentDidMount() {
    Request.get('/purchaseOrder')
            .end((err, res) => {
              if (err) {
                console.log('Error from fetching purchaseOrder data - > ',err);
              } else {
                console.log('res from purchaseOrder data - > ',JSON.parse(res.text), typeof res.text);
                this.setState({
                  tableData:JSON.parse(res.text).tableData,
                  poDetails:JSON.parse(res.text).poDetails
                });
                console.log('-- > ',this.state);
              }
            });
  }
  handleOpen(item) {
    var arr = [];
    this.state.poDetails.map((item1, i1) => {
      if (item.purchaseOrderId == item1.po_id) {
        console.log('item1 - > ',item1.po_id,item.purchaseOrderId,item1.sku_id);
        var obj = {
          skuId : item1.sku_id,
          units : item1.ordered_quantity
        }
        arr.push(obj);
      }
    })
    this.setState({modalOpen: true, skuDetails: arr});
  }
  handleAllocation(){
    this.setState({allocationModalOpen:true});
    Request.get('http://localhost:9093/doAllocation?type=rule')
            .end((err, res) => {
              if (err) {
                console.log('Error from fetching purchaseOrder data - > ',err);
              } else {
                console.log('allocation done');
              }
            });
  }
  handleClose() {
    this.setState({modalOpen: false, allocationModalOpen:false});
  }
  render() {
    var tableBody = this.state.tableData.map((item, i) => {
      return(
        <Table.Row key={i}>
          <Table.Cell centered className='table1'>{item.purchaseOrderId}</Table.Cell>
          <Table.Cell centered className='table1'>{item.purchaseCreationDate}</Table.Cell>
          <Table.Cell centered className='table1'>{item.purchasePickupDate}</Table.Cell>
          <Table.Cell centered className='table1'>{item.purchaseDeliveryDate}</Table.Cell>
          <Table.Cell centered className='table1'>
            <Button.Group widths='2'>
            <Button onClick={()=>this.handleOpen(item)} icon><Icon name='external' /></Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      );
    });
    return(
      <div>
        <Image src='./images/top1.png'/>
        <br/>
        <Header as='h2' icon textAlign='center'>
          <Icon name='shopping cart' color='red' circular />
          <Header.Content className='header'>
            Purchase Orders
          </Header.Content>
        </Header>
        <Segment>
          <Table inverted >
            <Table.Header >
              <Table.Row>
                <Table.HeaderCell className='tableHeader'>Purchase Order Id</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>P.O Creation Date</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>P.O. Pickup Date</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>P.O. Delivery Date</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Sku Details</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableBody}
            </Table.Body>
          </Table>
        </Segment>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small'>
          <Modal.Content>
            <Table inverted>
              <Table.Header >
                <Table.Row>
                  <Table.HeaderCell className='tableHeader'>Sku Id</Table.HeaderCell>
                  <Table.HeaderCell className='tableHeader'>Units</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.skuDetails.map((item1, i1) => {
                  console.log('item1 - > ',item1.sku_id,item1.units);
                  return(
                    <Table.Row key={i1}>
                      <Table.Cell className='table1'>{item1.skuId}</Table.Cell>
                      <Table.Cell className='table1'>{item1.units}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Modal.Content>
          <Modal.Actions>
           <Button color='red' onClick={this.handleClose} inverted>
             <Icon name='close' /> Close
           </Button>
         </Modal.Actions>
        </Modal>
        <Grid centered columns={5}>
          <Grid.Row>
            <Grid.Column>
              <Modal
                trigger={<Button positive medium onClick={this.handleAllocation}>Allocate Processing Centers</Button>}
                open={this.state.allocationModalOpen}
                onClose={this.handleClose}
                basic
                size='small'
              >

                <Modal.Content>
                  <h3>Rules are fired and PC has been allocated.</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                  </Button>
                </Modal.Actions>
              </Modal>
        {/* <Button positive medium onClick={this.handleAllocation} icon>Allocate Processing Centers</Button> */}
      </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}
