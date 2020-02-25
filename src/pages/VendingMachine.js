import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import {Line,Pie } from 'react-chartjs-2';
import {revenue,pie_sale} from 'data/chartdata';
import userImage from 'assets/img/products/2.jpeg';
import { NumberWidget } from 'components/Widget';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import axios from 'axios'
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

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

class VendingMachine extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      name:"",
      vm_id:0,
      longitude:0,
      latitude:0,
      sales:0,
      status:'Online'
    }

    this.add_product = {
      email:"jinxund@smu.edu",
      vm_id:this.data.vm_id,
      name:"",
      sales:"",
      price:"",
      inventory:"",
      purchase_url:""
    }
    this.products ={
      email:"jinxund@smu.edu",
      vm_id:this.data.vm_id
    }
    this.update_product = {
      email:"jinxund@smu.edu",
      vm_id:this.data.vm_id,
      name:"",
      price:"",
      inventory:"",
      purchase_url:""
    }
    this.delete_product ={
      email:"jinxund@smu.edu",
      vm_id:this.data.vm_id,
      name:""
    }
   this.state = {
    columns: [
      {title: 'Name', field: 'name' ,editable:'onAdd'},
      {title: 'Net Sales', field:'sales',type:'numeric',editable: 'onAdd, onDelete'},
      {title: 'Price', field:'price',type:'numeric'},
      {title: 'Inventory', field: 'inventory', },
      {title: 'Purchase URL', field: 'purchase_url', },
      
    ],
    data: [
    ],
  }
    

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
      this.data.name = result['name']
      this.data.longitude = result['longitude']
      this.data.latitude = result['latitude']
      this.data.sales = result['sales']
      this.data.status = result['status']
    }
  }

  getHandler = (e) =>{
    axios.post("https://vending-insights-smu.firebaseapp.com/vm/getallproduct",this.products)
     .then(response => {
            var products = response.data
            var product_info = []
            var keys = Object.keys(products)
            for(var i = 0; i < keys.length; i++) { 
                var key = (keys[i]) ; 
                var product = products[key]
                product_info.push(product)
            }
            this.setState(prevState => {
                var data = [...prevState.data];
                data = product_info
                return { ...prevState, data };
              });
        }).catch(error => {console.log(error)})
}
submitHandler = (newData,e) =>{
  axios.post("https://vending-insights-smu.firebaseapp.com/vm/addproduct",this.add_product)
   .then(response => {
      this.setState(prevState => {
          const data = [...prevState.data];
          newData.sales = 0;
          data.push(newData);
          return { ...prevState, data };
        });
      }).catch(error => {console.log(error)})
}

updateHandler = (newData,e) =>{
  axios.post("https://vending-insights-smu.firebaseapp.com/vm/updateproduct",this.update_product)
   .then(response => {
      console.log(response)
      }).catch(error => {console.log(error.response)})
}
deleteHandler = (newData,e) =>{
  axios.delete("https://vending-insights-smu.firebaseapp.com/vm/deleteproduct",
  {data:this.delete_product})
   .then(response => {
      console.log(response)
      }).catch(error => {console.log(error.response)})
}

  componentWillMount(){
    this.getVM_data()
    var promise = new Promise( (resolve, reject) => {
    
      if (this.data.vm_id !== 0) {
       resolve("Promise resolved successfully");
      }
      else {
       reject(Error("Promise rejected"));
      }
     });
    
     promise.then( result => {
      this.products.vm_id = this.data.vm_id
      this.add_product.vm_id = this.data.vm_id
      this.update_product.vm_id = this.data.vm_id
      this.delete_product.vm_id = this.data.vm_id
      this.getHandler()
     }, function(error) {
      
     });
    
  }
  render() {
    

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
            <CardTitle>{this.data.name}</CardTitle>
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
        <MaterialTable
      minRows={10}
      icons={tableIcons}
        title="Vending Machine List"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                this.add_product.name = newData.name
                this.add_product.price = newData.price
                this.add_product.inventory = newData.inventory
                this.add_product.purchase_url = newData.purchase_url
                this.submitHandler(newData)
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    this.update_product.name = newData.name
                    this.update_product.price = newData.price
                    this.update_product.inventory = newData.inventory
                    this.update_product.purchase_url = newData.purchase_url
                    this.updateHandler()
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.delete_product.name = oldData.name
                  this.deleteHandler()
                  return { ...prevState, data };
                });
              }, 600);
            }),
            
        }}
        options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100 ],
          }}
          onRowClick={(event,rowData) => window.open(rowData.purchase_url, '_blank').focus()}
          />
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