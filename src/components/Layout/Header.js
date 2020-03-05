import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

import {decode,checkExpired} from '../authendication'

const bem = bn.create('header');



class Header extends React.Component {
  state = {
    isOpenUserCardPopover: false,
    email:undefined
  };



  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  componentWillMount(){
    if(this.state.email === undefined){
      var code = decode()
      this.setState({
        email:code.email
      })
  }
  }

  signOut(){
    delete localStorage.jtwToken
    delete localStorage.auth
    window.location.href='/'
  }

  render() {

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              
            </NavLink>
          </NavItem>
          <NavItem tag="button"   className="border-light mr-2" onClick={()=>window.location.href='/profile'}>
          <MdPersonPin /> Profile
          </NavItem>
          <NavItem tag="button"  className="border-light mr-2">
          <MdHelp /> Help
          </NavItem>
          

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    
                    <ListGroupItem tag="button" action className="border-light" onClick= {()=>this.signOut()}>
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
