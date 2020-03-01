import React,{useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../assets/img/bg/img2.jpeg';
import axios from 'axios';
import {decode,checkExpired} from '../components/authendication'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          SW Vault{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function getUrlVars() { 
  var vars = {}; 
  window.location.href.replace(/[?&]+([^=&]+)=([-]*[a-zA-z0-9]*[.]*[a-zA-z0-9]*)/gi, function(m,key,value) { 
     vars[key] = value; 
  })
  return vars; 
}

export default function SignInSide() {
  const classes = useStyles();

  const user = {
    email:"",
    password:""
}

  const [state,setState]  = React.useState({
    data:false
  });
    const error = {
        iserror : false,
        errormsg: "Invalid Email Address or Password"
    }
    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        user[name]=value;
    }

    const submitHandler = (e) =>{
        console.log(state)
        axios.post("https://vending-insights-smu.firebaseapp.com/login",user)
        .then(response => {
          console.log(response)
                if(response.data !== 'no'){
                    localStorage.setItem('jtwToken',response.data.token)
                    localStorage.setItem('auth',response.data.auth)
                    window.location.href = '/dashboard';
                    
                }
                else{
                    document.getElementsByClassName("error")[0].hidden= false;
                     
                }

            }).catch(error => {console.log(error)})
    }

    useEffect(() => {
      if(localStorage.jtwToken){
        var code = decode()
        if(checkExpired(code.exp)){
          window.location.href='/dashboard';
        }
      }
    });

    function checkSession(){
      var result = getUrlVars();
      if(result['session']){
        if(!state.data){
          setState({
            data : true
          }
          )
      }
      }
    }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div hidden = {!state.data}>{checkSession()}You session is lost. Try to login again.</div>
          <form className={classes.form} noValidate 
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange= {changeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange= {changeHandler}
            /><div>
            <span className='error' hidden={true} align='left' color='red'>{error.errormsg}</span></div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            onClick = {submitHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs >
                <Link href="\check_email" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="\signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}