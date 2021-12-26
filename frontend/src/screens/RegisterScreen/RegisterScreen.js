import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../../actions/userActions";

function RegisterScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister;

    useEffect(()=>{
        if(userInfo){
            navigate('/mynotes');
        }
    }, [navigate, userInfo]);

    const submitHandler = async(e) => {
        e.preventDefault();

        if(password!=confirmpassword)
        {
            setMessage('Password do not match')
        }
        else{
            dispatch(register(name, email, password, pic));
        }

    };

    return (
        <MainScreen title="REGISTER">
            <div >
                {loading && <Loading/>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {error && <ErrorMessage variant="danger">Invalid email</ErrorMessage>}
                <Form className="loginContainer" onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>


                    {/* <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File
                            id="custom-file"
                            type="image/png"
                            label="Upload Profile Picture"
                            custom
                        />
                    </Form.Group> */}

                    <Form.Group controlId="pic" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            // value={pic}
                            placeholder="Choose a profile pic"
                            // onChange={(e)=> setPic(e.target.value)}
                        />
                    </Form.Group>




                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}

export default RegisterScreen;
