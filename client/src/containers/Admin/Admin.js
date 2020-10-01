import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import QuizTable from "../../components/Quiz/QuizTable";
import NewQuiz from "../../components/NewQuiz/NewQuiz";
import ProtectedRoute from "../../utils/ProtectedRoute";

const Admin = (props) => {
  return (
    <React.Fragment>
      <Row style={{ height: "93vh" }}>
        <Col md={12} style={{ backgroundColor: "#f5f6fa" }}>
          <Switch>
            <ProtectedRoute exact path={`/admin`} component={QuizTable} />
            <ProtectedRoute
              exact
              path={`/admin/new-quiz`}
              component={NewQuiz}
            />
          </Switch>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Admin;
