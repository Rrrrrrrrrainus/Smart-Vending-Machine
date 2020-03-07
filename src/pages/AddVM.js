import Page from 'components/Page';
import  MainLayout from '../components/Layout/MainLayout'
import React, {useEffect} from 'react';
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
import {decode,checkExpired} from '../components/authendication'


export default function AddVM(props){
    const auth = {
      token:localStorage.jtwToken,
      email:undefined
    }
    const add_vm = {
        email:auth.email,
        token:auth.token,
        longitude:"",
        latitude:"",
        name:""
    }

    const deletevm = {
      email:auth.email,
      token:auth.token,
        vm_id:""
    }

    const updatevm = {
      email:auth.email,
        token:auth.token,
      vm_id:"",
      longitude:0,
      latitude:0,
      name:""
  }

    var vms = {}

    const getHandler = (e) =>{
        axios.post("https://vending-insights-smu.firebaseapp.com/vm/getallvm",auth)
         .then(response => {
                // console.log(response)
                vms = response.data
                var vm_info = []
                var keys = Object.keys(vms)
                for(var i = 0; i < keys.length; i++) { 
                    var key = (keys[i]) ; 
                    var vm = vms[key]
                    vm['status'] = 'Online'
                    vm_info.push(vm)
                }
                setState(prevState => {
                    var data = [...prevState.data];
                    data = vm_info
                    return { ...prevState, data };
                  });
            }).catch(error => {console.log(error)})
    }
    const submitHandler = (newData,e) =>{
      var code = decode()
        add_vm.email = code.email
        axios.post("https://vending-insights-smu.firebaseapp.com/vm/addvm",add_vm)
         .then(response => {
            setState(prevState => {
                const data = [...prevState.data];
                newData.sales = 0;
                newData.status = 'Online';
                newData.vm_id = response.data*1
                data.push(newData);
                
                return { ...prevState, data };
              });
            }).catch(error => {console.log(error)})
    }
    const deleteHandler = (newData,e) =>{
      var code = decode()
        deletevm.email = code.email
        axios.delete("https://vending-insights-smu.firebaseapp.com/vm/deletevm",
        {data:deletevm})
         .then(response => {
            console.log(response)
            }).catch(error => {console.log(error.response)})
    }

    const updateHandler = (newData,e) =>{
      var code = decode()
        updatevm.email = code.email
      axios.post("https://vending-insights-smu.firebaseapp.com/vm/updatevm",updatevm)
       .then(response => {
          console.log(response)
          }).catch(error => {console.log(error.response)})
  }

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
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };

    const [state, setState] = React.useState({
      columns: [
        { title: 'ID', field: 'vm_id',editable: 'onAdd, onDelete'},
        {title: 'Name', field: 'name' },
        { title: 'Longitude', field: 'longitude', type: 'numeric' },
        {
          title: 'Latitude',
          field: 'latitude', type:'numeric'
        },
        {title: 'Net Sales', field:'sales',type:'numeric',editable: 'onAdd, onDelete'},
        {title: 'Status', field: 'status',editable: 'onAdd, onDelete' },
        
        
      ],
      data: [{vm_id:10,name:'11',longtitude:1,latitude:1,sales:0, status:'Online'}
      ]
    });

    useEffect(() => {
      new Promise( (resolve, reject) => {
        if(localStorage.jtwToken){
          var code = decode()
          auth.email = code.email
          if(!checkExpired(code.exp)){
            window.location.href='/?session=false';
          }
        }
        else{
          window.location.href='/';
        }
        if (auth.email !== undefined) {
         getHandler()
         resolve("Promise resolved successfully");
        }
        else {
         reject(Error("Promise rejected"));
        }
       });
        
      }, []);

    const movetovm = (vm) =>{
      props.history.push({
        pathname: '/vendingmachine',
        data: vm // your data array of objects
      })
    }
    return (
    <MainLayout> 
    <Page>
      <MaterialTable
      minRows={10}
      icons={tableIcons}
        title="Vending Machine List"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                
                resolve();
                add_vm.longitude = newData.longitude;
                add_vm.latitude = newData.latitude;
                add_vm.name= newData.name;
                submitHandler(newData)
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    updatevm.vm_id = newData.vm_id
                    updatevm.longitude = newData.longitude
                    updatevm.latitude = newData.latitude
                    updatevm.name = newData.name
                    updateHandler()
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  deletevm.vm_id = oldData.vm_id;
                  deleteHandler()
                  data.splice(data.indexOf(oldData), 1);
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
        onRowClick={(event,rowData) => movetovm(rowData)}
          /> </Page></MainLayout>
    );
  }