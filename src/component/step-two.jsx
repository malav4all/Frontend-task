import React, {useState} from 'react';
import styled from 'styled-components';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
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

const StepTwo = (props) => {
  return (
    <>
      <Container>
        <Wrapper>
          <Input
            type="date"
            name="dob"
            value={props?.dob?.firstName.value}
            onChange={props.handleOnChangeInputField}
            required
            placeholder="Fist Name"
          />{' '}
          <br />
          <label>Profile Image</label>
          <Input
            type="file"
            name="file"
            onChange={(e) =>
              props.profileImageUpload && props.profileImageUpload(e)
            }
            required
            placeholder="Email"
          />
          <br />
          <label>Aadhar Image</label>
          <Input
            type="file"
            name="aadharImage"
            onChange={(e) =>
              props.profileImageUpload && props.aadharImageUpload(e)
            }
            required
          />
          <br />
          <Button type="submit" onClick={() => props.back()}>
            Back
          </Button>
          <br />
          <input
            value="Submit"
            type="button"
            onClick={() => props.apihandler && props.apihandler()}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default StepTwo;
