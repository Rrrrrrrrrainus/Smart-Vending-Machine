import Page from 'components/Page';
import React from 'react';
import pic from "../assets/rentou.png"
import '../styles/components/_form.scss'
import  MainLayout from '../components/Layout/MainLayout'
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import {decode,checkExpired} from '../components/authendication'
import TextField from '@material-ui/core/TextField';


export default class ProfilePage  extends React.Component{
  constructor(props) {
    super(props)
  this.state= {
    user:{
      email:undefined,
    companyname:undefined,
    companyaddress:undefined,
    image:undefined
    },
    auth: {
      email:undefined,
      token:localStorage.jtwToken
    }
  };
}
  componentWillMount(){
    if(localStorage.jtwToken){
      var code = decode()
      this.setState(
        prevState => {
          let user = Object.assign({}, prevState.user);
          let auth = Object.assign({}, prevState.auth);  
          auth.email = code.email
          user.email = code.email;                           
          return { user,auth };                                
        }
      )
      if(!checkExpired(code.exp)){
        window.location.href='/?session=false';
      }
    }
    else{
      window.location.href='/';
    }
  }

//   getHandler = (e) =>{
//     axios.post("https://vending-insights-smu.firebaseapp.com/getimage",auth)
//      .then(response => {
//             // console.log(response)
//             vms = response.data
//             var vm_info = []
//             var keys = Object.keys(vms)
//             for(var i = 0; i < keys.length; i++) { 
//                 var key = (keys[i]) ; 
//                 var vm = vms[key]
//                 vm['status'] = 'Online'
//                 vm_info.push(vm)
//             }
//             setState(prevState => {
//                 var data = [...prevState.data];
//                 data = vm_info
//                 return { ...prevState, data };
//               });
//         }).catch(error => {console.log(error)})
// }

  render(){
  return (
<MainLayout>
    <Page>
      <div className = "maye">
        <div className = "text-center">
          <img className = 'rentou' src= {pic} alt = "pic"/>
        </div>

        <div className = "Name2 text-center">
          Dante Yuan<br/>
        </div>
        <div className = "description">
        When it comes to Zhoushuai playing games that you make sure the zhuai is up-to-date, however, from time to time shuai has been caught out by xiaomei in the arrive on university, such as the shuai that made it possible for a hacker to access all the settings on a Mac just by logging in as root in System Preferences.
        
        <hr/>
        <Form>
        <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                className = 'textfield'
                autoFocus
                defaultValue={this.state.user.email}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="companyname"
                name="companyname"
                variant="outlined"
                required
                fullWidth
                id="companyname"
                label="Company Name"
                className = 'textfield'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="companyaddress"
                name="companyaddress"
                variant="outlined"
                required
                fullWidth
                id="companyaddress"
                label="Company Address"
                className = 'textfield'
                autoFocus
              />
            </Grid>
            </Grid>
            <Grid item xs={12} >
              <FormGroup>
                  <Label for="exampleFile">File</Label>
                  <Input type="file" name="file" />
                  <FormText color="muted">
                    This is some placeholder block-level help text for the above
                    input. It's a bit lighter and easily wraps to a new line.
                  </FormText>
                </FormGroup>
            </Grid>
        </Form>

        </div>

      <br/>
      <br/>
      </div>
    </Page>
    </MainLayout>
  );
  }
};

