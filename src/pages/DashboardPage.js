import { AnnouncementCard, TodosCard } from 'components/Card';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import MapContainer from 'components/Maps/maps'
import {revenue} from 'data/chartdata';
import {
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import axios from 'axios'
import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import { Line } from 'react-chartjs-2';
import {
  MdPersonPin,
  MdRateReview,
  MdShare,
  MdThumbUp,
} from 'react-icons/md';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import {decode,checkExpired} from '../components/authendication'

// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );

class DashboardPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      year: undefined,
      month:undefined,
      email: undefined,
      token:localStorage.jtwToken,
      count:undefined,
      non_count:undefined,
      monthly_sale:undefined,
      pre_monthly_sale:undefined,
      monthly_purchase:undefined,
      pre_monthly_purchase:undefined,
      monthly_profit:undefined,
      pre_monethly_profit:undefined

    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  componentWillMount(){
    if(localStorage.jtwToken){
      var code = decode()
      if(!checkExpired(code.exp)){
        window.location.href='/?session=false';
      }
      else{
        let today = new Date()
        this.setState({
          year:today.getFullYear(),
          month:today.getMonth()+1,
          email:code.email,
        },()=>{
            this.getHandler()
        })
        
      }
    }
    else{
      window.location.href='/';
    }
  }

  getHandler = (e) =>{
    
    const info = {
      year: this.state.year,
      month:this.state.month,
      email: this.state.email,
      // token:localStorage.jtwToken
    }
    axios.post("https://vending-insights-smu.firebaseapp.com/vm/vminfo",info)
     .then(response => {
           this.setState({
             
             count:response.data.count,
             non_count:100,
             monthly_sale:response.data.total_sale,
             pre_monthly_sale: 100*response.data.total_sale/response.data.previous_total_sale,
             monthly_purchase: response.data.purchase_count,
             pre_monthly_purchase: 100*response.data.purchase_count/response.data.previous_purchase_count,
             monthly_profit: response.data.profit,
             pre_monethly_profit:100*response.data.profit/response.data.previous_profit
           })
           if(response.data.count === 0 || response.data.count === null){
            this.setState(prevState => {
              var non_count = prevState.non_count;
              non_count = 100
              return { ...prevState, non_count };
            })
           }
           if(response.data.previous_total_sale === 0 || response.data.previous_total_sale === null){
            this.setState(prevState => {
              var pre_monthly_sale = prevState.pre_monthly_sale;
              pre_monthly_sale = 100
              return { ...prevState, pre_monthly_sale };
            })
           }
           if(response.data.total_sale === null){
            this.setState(prevState => {
              var monthly_sale = prevState.monthly_sale;
              monthly_sale = 0
              return { ...prevState, monthly_sale };
            })
           }
           if(response.data.previous_purchase_count === 0 || response.data.previous_purchase_count === null){
            this.setState(prevState => {
              var pre_monthly_purchase = prevState.pre_monthly_purchase;
              pre_monthly_purchase = 100
              return { ...prevState, pre_monthly_purchase };
            })
           }
           if(response.data.previous_profit === 0 || response.data.previous_profit === null){
            this.setState(prevState => {
              var pre_monethly_profit = prevState.pre_monethly_profit;
              pre_monethly_profit = 100
              return { ...prevState, pre_monethly_profit };
            })
           }
        }).catch(error => {console.log(error)})
}


  render() {

    return (
      <MainLayout breakpoint={this.props.breakpoint}> 
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Vending Machines"
              number={this.state.count}
              color="secondary"
              progress={{
                value: this.state.non_count,
                label: 'Active',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Net Sales"
              subtitle="This month"
              number={this.state.monthly_sale}
              color="secondary"
              progress={{
                value: this.state.pre_monthly_sale,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Purchases"
              subtitle="This month"
              number={this.state.monthly_purchase}
              color="secondary"
              progress={{
                value: this.state.pre_monthly_purchase,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Profits"
              subtitle="This month"
              number={this.state.monthly_profit}
              color="secondary"
              progress={{
                value: this.state.pre_monethly_profit,
                label: 'Last month',
              }}
            />
          </Col>

        </Row>

        <Row>
        <Col lg="7" md="12" sm="12" xs="12" >
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
          
          <Col lg="5" md="12" sm="12" xs="12" > 
            <MapContainer></MapContainer>
          </Col>

          
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="People you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Reviews"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="30+ Shares"
            subtitle="New Shares"
          />
        </CardGroup>

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Products</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Users</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col> */}

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <CardDeck style={{ marginBottom: '1rem' }}>
          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck> */}

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row>
      </Page>
      </MainLayout>
    );
  }
}
export default DashboardPage;
