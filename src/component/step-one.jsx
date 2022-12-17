import React, {useState} from 'react';
import styled from 'styled-components';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import StepTwo from './step-two';
import axios from 'axios';
// AiOutlinePlusCircle
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('/image/regiterBackground.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form``;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
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

const StepOne = () => {
  const [data, setData] = useState({
    firstName: {
      value: '',
    },
    email: {
      value: '',
    },
    phone: {
      value: '',
    },
    dob: {
      value: '',
    },
  });
  const [active, setActive] = useState(0);
  const [bulkEmail, setBulkEmail] = useState([]);
  const [bulkPhone, setBulkPhone] = useState([]);
  const handleOnChangeInputField = (event) => {
    setData({
      ...data,
      [event.target.name]: {
        ...data[event.target.name],
        value: event.target.value,
      },
    });
  };
  const next = () => {
    if (
      data.firstName.value.length !== 0 &&
      bulkEmail.length !== 0 &&
      bulkPhone.length !== 0
    ) {
      setActive(() => active + 1);
    } else {
      alert('Please Insert Detail');
    }
  };
  const back = () => {
    setActive(() => active - 1);
  };
  const addMultipleEmail = () => {
    let emailArray = [];
    emailArray.push(...bulkEmail, data.email.value);
    setBulkEmail(emailArray);
  };
  const addMultiplePhoneno = () => {
    let phoneArray = [];
    phoneArray.push(...bulkPhone, data.phone.value);
    setBulkPhone(phoneArray);
  };

  const profileImageUpload = (event) => {
    setData({
      ...data,
      profileImage: event.target.files[0],
    });
  };
  const aadharImageUpload = (event) => {
    setData({
      ...data,
      aadharPic: event.target.files[0],
    });
  };
  const apihandler = async () => {
    const formData = new FormData();
    formData.append('firstName', data.firstName.value);
    formData.append('email', JSON.stringify(bulkEmail));
    formData.append('phone', JSON.stringify(bulkPhone));
    formData.append('dob', data.dob.value);
    formData.append('profileImage', data.profileImage);
    formData.append('aadharImage', data.aadharPic);
    const promise = await axios.post(
      'http://localhost:5000/register',
      formData,
      {
        'content-type': 'multipart/form-data',
      }
    );
    if (promise.status === 200) {
      alert('Record Insert Successfully');
      setActive(0);
    } else {
      alert('Something Went Wrong');
    }
  };

  const formView = () => {
    switch (active) {
      case 1:
        return (
          <StepTwo
            back={back}
            handleOnChangeInputField={handleOnChangeInputField}
            data={data}
            profileImageUpload={profileImageUpload}
            aadharImageUpload={aadharImageUpload}
            apihandler={apihandler}
          />
        );
      default:
        return (
          <Container>
            <Wrapper>
              <Title>CREATE AN ACCOUNT</Title>
              {/* <Form> */}
              <Input
                type="text"
                name="firstName"
                value={data.firstName.value}
                onChange={handleOnChangeInputField}
                required
                placeholder="Fist Name"
              />{' '}
              <br />
              <Input
                type="text"
                name="email"
                value={data.email.value}
                onChange={handleOnChangeInputField}
                required
                placeholder="Email"
              />
              <AiOutlinePlusCircle onClick={addMultipleEmail} />
              <br />
              {bulkEmail.map((item, index) => {
                return (
                  <>
                    <p>{item}</p>
                    <AiOutlineMinusCircle />
                  </>
                );
              })}
              <Input
                type="text"
                name="phone"
                value={data.phone.value}
                onChange={handleOnChangeInputField}
                required
                placeholder="Phone No"
              />
              <AiOutlinePlusCircle onClick={addMultiplePhoneno} />
              <br />
              <Button type="submit" onClick={next}>
                Next
              </Button>
              {/* </Form> */}
            </Wrapper>
          </Container>
        );
    }
  };
  return formView();
};

export default StepOne;
