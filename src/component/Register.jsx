import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
// AiOutlinePlusCircle
const Container = styled.div`
width: 100vw;
height: 100vh;
background-image: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("/image/regiterBackground.jpg");
background-repeat: no-repeat;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`;


const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color:white;

`;


const Title = styled.h1`
 font-size: 24px;
 font-weight: 300;

`;

const Form = styled.form`


`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0 0 ;
padding: 10px;
`;



const Agreement = styled.span`
 font-size: 13px;
 margin-top: 20px;
`;

const Button = styled.button`
width: 40%;
border: none;
padding: 12px 18px;
background-color: teal;
color: white;
cursor: pointer;
margin: 20px 0px;
`;


const Register = () => {
    const [data,setData] = useState({
        firstName:{
            value:""
        },
        email:{
            value:""
        },
        phone:{
            value:""
        }
    })
    const [bulkEmail,setBulkEmail] = useState([])
    const [bulkPhone,setBulkPhone] = useState([])

    const handleOnChangeInputField = (event) => {
        setData({
          ...data,
          [event.target.name]: {
            ...data[event.target.name],
            value: event.target.value,
          },
        });
      };

      const addMultipleEmail = ()=>{
        let emailArray = []
        emailArray.push(...bulkEmail,data.email.value)
        setBulkEmail(emailArray)
      }
      const addMultiplePhoneno = () =>{
        let phoneArray= []
        phoneArray.push(...bulkPhone,data.phone.value)
        setBulkPhone(phoneArray)
      }

      const apihandler =  async () =>{
          const finalData = {
              firstName:data.firstName.value,
              email:bulkEmail,
              phone:bulkPhone
          }
      }
    
    
    return (
        <>
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input type="text" name='firstName' value={data.firstName.value} onChange={handleOnChangeInputField} required placeholder="Fist Name" /> <br/>
                        <Input type="text" name='email' value={data.email.value} onChange={handleOnChangeInputField} required placeholder="Email" /><AiOutlinePlusCircle  onClick={addMultipleEmail}/><br/>
                        {bulkEmail.map((item,index)=>{
                            return(
                                <>
                                
                                    <p>{item}</p><AiOutlineMinusCircle />
                                
                                </>
                            )
                        })}
                        <Input type="text" name='phone'  value={data.phone.value} onChange={handleOnChangeInputField} required placeholder="Phone No" /><AiOutlinePlusCircle onClick={addMultiplePhoneno} /><br/>
                        <Button type='submit' onClick={apihandler}>Submit</Button>

                    </Form>
                </Wrapper>
            </Container>
        </>
    )
}

export default Register
