import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import API, { endpoints } from "../configs/API";

const Header = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      let res = await API.get(endpoints("categories"));
      setCategories(res.data);
    };

    loadCategories();
  }, []);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Ecourse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
              {categories.map((c) => (
                <Nav.Link href="#link">{c.name}</Nav.Link>
              ))}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tên khoá học..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Tìm</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
