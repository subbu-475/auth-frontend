import React,{useEffect,useState} from 'react';
import {Container,Button} from 'react-bootstrap';
import '../styles/home.css';
import axios from 'axios';
import API_URL from '../../config/global';
import { json } from 'react-router-dom';

const Home = () => {
  const [res,setRes] = useState({})

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user&& user.token) {
      getData(user.token)
    }
  },[])
  const getData = async (token) => {
    try {
      const config = {
        headers:{
          Authorization: token,
        }
      }
      const response = await axios.get(`${API_URL}home`,config);
      console.log(response);

      if (response.data==="Invalid Token"){
        alert("login again")
      } else if (response.data==="server busy"){
        alert('unauthorized access')
      } else if (response?.status){
        setRes(response.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
        <h1>Welcome to the our website</h1>
        <p>We are here for serve you</p>
        <p>{res.name}</p>
        <Button variant="primary" type="submit">Get Started</Button>
    </Container>
  )
}

export default Home;
