import logo from './logo.svg';
import './App.css';
import { Button, Col, Container, Form, Nav, NavItem, NavLink, Navbar, NavbarBrand, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className='App-heade'>
        <Navbar fixed="top" color="light" expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>

          <Container>
            <Row noGutters className="position-relative w-100 align-items-center">

              <Col className="d-none d-lg-flex justify-content-start">
                <Nav className="mrx-auto" navbar>

                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/">
                      <img alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                    </NavLink>
                  </NavItem>

                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/">Home</NavLink>
                  </NavItem>

                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/">Events</NavLink>
                  </NavItem>
                </Nav>
              </Col>

              <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                  <img src={logo} alt="logo" className="position-relative img-fluid" />
                </NavbarBrand>
              </Col>

              <Col className="d-none d-lg-flex justify-content-end">
                <Form>
                  <Button type="submit" color="info">Search</Button>
                </Form>
              </Col>

            </Row>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default App;
