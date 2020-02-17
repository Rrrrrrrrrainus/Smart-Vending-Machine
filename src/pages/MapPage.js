import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import MapContainer from 'components/Maps/maps'
import {
  Row,
  Col,
} from 'reactstrap';
import Page from 'components/Page';

class MapPage extends React.Component {

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
