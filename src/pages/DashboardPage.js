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
    }
    else{
      window.location.href='/';
    }
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
              number="9800"
              color="secondary"
              progress={{
                value: 100,
                label: 'Active',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
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

          <Col lg={3} md={6} sm={6} xs={12}>
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
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
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
