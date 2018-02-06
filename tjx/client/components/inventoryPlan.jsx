import React from 'react';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
import {Button, Comment, Form, Header, Segment,Grid,Icon,Search,Divider,Input,Label,Menu,Image,Select,Radio,TextArea,Dropdown,Table,Modal  } from 'semantic-ui-react';
import Request from 'superagent';
const square = { width: 185, height: 185 }
export default class InventoryView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tableData : [],
      productCategoryId : [],
      projectionDate : [],
      reveal : [],
      kIndex : 0,
      pdId : '',
      projDate : ''
     }
     this.handleReveal = this.handleReveal.bind(this);
     this.handlePDId = this.handlePDId.bind(this);
     this.handleProjectionDate = this.handleProjectionDate.bind(this);
     this.handleTableData = this.handleTableData.bind(this);
  }
  componentDidMount(){
    Request.get('/inventoryPlans')
          .end((err, res) => {
            if (err) {
              console.log('Error from fetching purchaseOrder data - > ',err);
            } else {
              console.log('res from purchaseOrder data - > ',JSON.parse(res.text), typeof res.text);
              this.setState({
                productCategoryId:JSON.parse(res.text).productCategoryId,
                projectionDate:JSON.parse(res.text).projectionDate,
              });
              console.log(this.state);
            }
          });
  }
  handlePDId(e,{value}){
    this.setState({pdId:value});
  }
  handleProjectionDate(e,{value}){
    this.setState({projDate:value});
  }
  handleReveal(){
    Request.get('/shortFallQty')
          .query({pdId:this.state.pdId, projDate:this.state.projDate})
          .end((err, res) => {
            if (err) {
              console.log('err - > ', err);
            } else {
              console.log('res - >', JSON.parse(res.text) );
              this.setState({tableData:JSON.parse(res.text)});
              this.handleTableData();
            }
          });
          console.log(' >> ',this.state.tableData);
  }
  handleTableData() {
    var tableBody = this.state.tableData.map((item, i) => {
      console.log('iii - >' ,item);
      return(
        <Table.Row key={i}>
          <Table.Cell className='table1'>{item.pc_id}</Table.Cell>
          <Table.Cell className='table1'>{item.shortfall_quantity}</Table.Cell>
        </Table.Row>
      );
    });
    var temp = [];
    temp.push(
      <Zoom>
        <Segment>
          <Table inverted >
            <Table.Header >
              <Table.Row>
                <Table.HeaderCell className='tableHeader'>Processing Center Id</Table.HeaderCell>
                <Table.HeaderCell className='tableHeader'>Target Open Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableBody}
            </Table.Body>
          </Table>
        </Segment>
     </Zoom>
    );
    this.setState({reveal:temp});
  }

  render(){
    var productCategoryId = [];
    this.state.productCategoryId.map((item, i)=>{
      if (productCategoryId.findIndex(x => x.value===item)==-1) {
        productCategoryId.push({key:i,value:item,text:item})
      } else {
        console.log('already present in arr');
      }
    });
    var projectionDate = [];
    this.state.projectionDate.map((item,i)=>{
      if (projectionDate.findIndex(x => x.value===item)==-1) {
        projectionDate.push({key:i,value:item,text:item})
      } else {
        console.log('already present in arr');
      }
    });
    return(
      <div>
        <Image src='./images/top1.png'/>
      <br/>
      <Header as='h2' icon textAlign='center'>
         <Icon name='shopping cart' color='red' circular />
         <Header.Content className='header'>
           Inventory View
         </Header.Content>
       </Header>
        <Segment color='red'>
          <Grid container>
            <Grid.Row centered columns={3}>
              <Grid.Column>
                <Button.Group>
                  <Button >Product Department ID</Button>
                    <Dropdown placeholder='XXXX' button options={productCategoryId} onChange={this.handlePDId} />
                </Button.Group>
              </Grid.Column>
              <Grid.Column>
                <Button.Group>
                  <Button>Projection Date</Button>
                    <Dropdown placeholder='YYYY-MM-DD' button options={projectionDate} onChange={this.handleProjectionDate}/>
                </Button.Group>
              </Grid.Column>
                <Grid.Column>
                  <Button positive onClick={this.handleReveal}><Icon name='check'/>Check Target Open Quantity</Button>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <br/>
        <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              {this.state.reveal}
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    );
  }
}
