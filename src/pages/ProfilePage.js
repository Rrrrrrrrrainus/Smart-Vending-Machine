import Page from 'components/Page';
import React from 'react';
import '../styles/components/_form.scss'
import  MainLayout from '../components/Layout/MainLayout'
import {
  Form,
  FormGroup,
  FormText,
  Label,
} from 'reactstrap';
import Button from '@material-ui/core/Button';

import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import {decode,checkExpired} from '../components/authendication'
import TextField from '@material-ui/core/TextField';
import default_user from '/Users/rainus/Desktop/fkk/Smart Vending Machine/src/assets/img/users/default_user.png'
import FileBase64 from '../components/tobase64';


export default class ProfilePage  extends React.Component{
  constructor(props) {
    super(props)
  this.state= {
    user:{
      email:undefined,
    username:undefined,
    address:undefined,
    image:undefined
    },
    auth: {
      email:undefined,
      token:localStorage.jtwToken
    },
  };
}
getFiles(files){
  this.setState(prevState => {
          
    var user =  {...prevState.user}
    user.image = files[0].base64
    return { ...prevState,user };                                
  },()=>{
    document.getElementsByClassName('rentou')[0].src = this.state.user.image
  })
}
  componentWillMount(){
    if(localStorage.jtwToken){
      
      var code = decode()
      this.setState(
        prevState => {
          
          var auth =  {...prevState.auth}
          auth.email = code.email
          return { ...prevState,auth };                                
        },() => {
          this.getHandler()
      });

      if(!checkExpired(code.exp)){
        window.location.href='/?session=false';
      }
    }
    else{
      window.location.href='/';
    }
  }

  getHandler = (e) =>{
    axios.post("https://vending-insights-smu.firebaseapp.com/getimage",this.state.auth)
     .then(response => {
       this.setState(prevState =>{
        var user =  {...prevState.user}
        user.email = response.data.email
        user.address = response.data.address
        user.username = response.data.username
        user.image = response.data.image
        return { ...prevState,user };  
       },()=>{
         document.getElementById('email').value = this.state.user.email
         document.getElementById('companyname').value = this.state.user.username
         if(this.state.user.address !== undefined){
         document.getElementById('companyaddress').value = this.state.user.address}
         if(this.state.user.image !== undefined){
          document.getElementsByClassName('rentou')[0].src = this.state.user.image
         }
       })
        }).catch(error => {console.log(error)})
}

updateHandler = (e) =>{
  const update = {
    email: this.state.auth.email,
    token:this.state.auth.token,
    username: this.state.user.username,
    address:this.state.user.address,
    image:this.state.user.image
  }
  console.log(update)
  axios.post("https://vending-insights-smu.firebaseapp.com/updateuser",update)
   .then(response => {
     console.log(response)
      }).catch(error => {console.log(error)})
}
 changeHandler = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  
  this.setState(prevState =>{
    var user =  {...prevState.user}
    user[name] = value
    return { ...prevState,user };  
   })
}

  render(){
  return (
<MainLayout>
    <Page>
      <div className = "maye">
        <div className = "text-center">
          <img className = 'rentou' src= {default_user} alt = "pic"/>
        </div>

        <div className = "Name2 text-center">
  {this.state.user.username}<br/>
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
                disabled
                margin="normal"
                InputLabelProps= {{ shrink:true}}
                onChange = {this.changeHandler}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="companyname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="companyname"
                label="Company Name"
                className = 'textfield'
                InputLabelProps= {{ shrink:true}}
                autoFocus
                onChange = {this.changeHandler}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="companyaddress"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="companyaddress"
               label="Company Address"
                className = 'textfield'
                InputLabelProps= {{ shrink:true}}
                autoFocus
                onChange = {this.changeHandler}
              />
            </Grid>
            </Grid>
            <br/>
            <Grid item xs={12} >
              <FormGroup>
                  <Label for="exampleFile">File</Label>
                  <div></div>
                  <FileBase64
                  multiple={ true }
                  onDone={ this.getFiles.bind(this) } />
                  <FormText color="muted">
                    This is some placeholder block-level help text for the above
                    input. It's a bit lighter and easily wraps to a new line.
                  </FormText>
                </FormGroup>
            </Grid>
        </Form>
        <Button 
        fullWidth
        color = 'primary'
        variant="contained"
        onClick = {()=>this.updateHandler()}>Submit</Button>

        </div>

      <br/>
      <br/>
      </div>
    </Page>
    </MainLayout>
  );
  }
};

