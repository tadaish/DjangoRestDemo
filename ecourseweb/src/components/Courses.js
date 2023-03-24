import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import API, { endpoints } from "../configs/API";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const loadCourses = async () => {
      let res = await API.get(endpoints("courses"));
      setCourses(res.data.results);
    };

    loadCourses();
  }, []);

  return (
    <Container>
      <ul>
        {courses.map((c) => (
          <li>{c.subject}</li>
        ))}
      </ul>
      <Row>
        {courses.map((c) => (
          <Col md={3} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={c.image} />
              <Card.Body>
                <Card.Title>{c.subject}</Card.Title>
                <Button variant="primary">Xem chi tiết</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
