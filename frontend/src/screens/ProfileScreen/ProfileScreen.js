import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

const ProfileScreen = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (!userInfo) {
        navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);




  return (
      <>
    {
        userInfo?
        (
            <>
                <MainScreen title={`${userInfo.name} Profile`}>
      <div>
        <Row className="profileContainer" >
          <Col md={6} style={{textAlign: "center"}}>
            <h1>{userInfo.name}</h1>
            <h1>{userInfo.email}</h1>

          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
            </>
        ):
        (
            <>
                <MainScreen title="Profile">
      <div>
        <Row className="profileContainer" >
          <Col md={6} style={{textAlign: "center"}}>

          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
            </>
        )

    }
    </>

  );
};

export default ProfileScreen;