import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import {Line,Pie } from 'react-chartjs-2';
import {revenue,pie_sale} from 'data/chartdata';
import userImage from 'assets/img/products/2.jpeg';
import { NumberWidget } from 'components/Widget';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardImg,
  CardBody,
  CardText,
  Table
} from 'reactstrap';
import Page from 'components/Page';



class VendingMachine extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      vm_id:0,
      longitude:0,
      latitude:0,
      sales:0,
      status:'Online'
    }
   // console.log(props.location.state)
    // if (props.location.data == undefined){
    //   window.location.href = '/dashboard'
    // }
    // else{
 //   this.data = props.location.state
    // }
    

  }

  getUrlVars() { 
    var vars = {}; 
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([-]*[a-zA-z0-9]*[.]*[a-zA-z0-9]*)/gi, function(m,key,value) { 
       vars[key] = value; 
    })
    return vars; 
  }

  getVM_data(){
    var result = this.getUrlVars()
    if(result['vm_id'] == undefined && this.props.location.data == undefined){
      window.location.href = '/dashboard'
    }
    else if(result['vm_id'] == undefined){
      this.data = this.props.location.data
    }
    else{
      this.data.vm_id = result['vm_id']
      
      this.data.longitude = result['longitude']
      this.data.latitude = result['latitude']
      this.data.sales = result['sales']
      this.data.status = result['status']
    }
  }
  render() {
    this.getVM_data()

    return (
      <MainLayout breakpoint={this.props.breakpoint}> 
      <Page
        className="VendingMachine"
        title="Vending Machine"
      >
          <Row>

          <Col lg={4}>
            <NumberWidget
              title="Monthly Net Sales"
              subtitle="This month"
              number="1M"
              color="secondary"
              progress={{
                value: 80,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={4} >
            <NumberWidget
              title="Monthly Purchases"
              subtitle="This month"
              number="50k"
              color="secondary"
              progress={{
                value: 92,
                label: 'Last month',
              }}
            />
          </Col >
          <Col lg={4} >
          <NumberWidget
              title="Monthly Profits"
              subtitle="This month"
              number="21k"
              color="secondary"
              progress={{
                value: 98,
                label: 'Last month',
              }}
            />
          </Col>
          </Row>
          <Row>
        <Col lg={6}  md="12" sm="12" xs="12">
            <Row>
        <Card>
            <CardImg top src={userImage} height = '400'/>
            <CardBody>
              <CardTitle>Your Vending Machine</CardTitle>
              <CardText>
                Owned by SW Vault <br/>
                Vending Machine ID: {this.data.vm_id} <br/>
                Vending Machine Location: (Longitude: {this.data.longitude}, Latitude: {this.data.latitude})<br/>
                Current Net Sales: {this.data.sales} <br/>
                Vending Machine Status: Online
              </CardText>
            </CardBody>
          </Card>
          </Row>
          </Col>
         
        <Col lg={6}  md="12" sm="12" xs="12">
        <Card className="mb-3">
            <CardHeader>Responsive</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Col>
          </Row>
          <Row >
              <Col lg={6}  md="12" sm="12" xs="12">
          <Card>
                <CardHeader>
                    Total Revenue{' '}
                    <small className="text-muted text-capitalize">Recent 7 Days</small>
                </CardHeader>
                <CardBody>
                    <Line data={revenue.weekly_revenue}/>
                </CardBody>
                </Card>          
          </Col>

          <Col lg={6}  md="12" sm="12" xs="12"> 
            <Card>
            <CardHeader>Product Sales{' '}
                    <small className="text-muted text-capitalize">Recent 7 Days</small></CardHeader>
            <CardBody>
              <Pie data={pie_sale} />
            </CardBody>
          </Card>
            </Col>
            
          </Row>
        </Page>
      </MainLayout>
    );
  }
}

export default VendingMachine;