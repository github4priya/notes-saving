import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import './LoginScreen.css'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // useEffect(() => {
    //   if (userInfo) {
    //     navigate("/mynotes");
    //   }
    // }, [navigate, userInfo]);

    const submitHandler = async(e) =>{
        e.preventDefault();
        dispatch(login(email, password));
    }




    return (
        <MainScreen title="LOGIN">

              {error && <ErrorMessage variant="danger">Invalid email or password</ErrorMessage>}
              {loading && <Loading/>}
        <Form className="loginContainer" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail" >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{marginTop: "20px" }} >
            Submit
          </Button>
          <Row className="py-3 form_items">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
        </Form>


        </MainScreen>
    )
}

export default LoginScreen
