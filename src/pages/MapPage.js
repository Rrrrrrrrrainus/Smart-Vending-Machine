import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import MapContainer from 'components/Maps/maps'
import {
  Row,
  Col,
} from 'reactstrap';
import Page from 'components/Page';
import {decode,checkExpired} from '../components/authendication'


class MapPage extends React.Component {

  componentWillMount(){
    if(localStorage.jtwToken){
      var code = decode()
      if(!checkExpired(code.exp)){
        window.location.href='/?session=false';
      }
    }
    else{
      window.location.href='/';
    }
  }
  render() {
    return (
      <MainLayout breakpoint={this.props.breakpoint}> 
      <Page>
      <Row>
        <Col style={{height:"50rem"}}>
        
        
        <MapContainer></MapContainer>
        </Col>
      </Row>


        </Page>
      </MainLayout>
    );
  }
}

export default MapPage;
