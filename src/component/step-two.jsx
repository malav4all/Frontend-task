import React, {useState} from 'react';
import styled from 'styled-components';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';

const StepTwo = (props) => {
  return (
    <>
      <div className="container mt-10">
        <div className="mb-3 row form-group ">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            DOB
          </label>
          <div className="col-sm-6">
            <input
              type="date"
              name="dob"
              className="form-control"
              value={props?.dob?.firstName.value}
              onChange={props.handleOnChangeInputField}
              required
              id="staticEmail"
              placeholder="Please Enter Name"
            />
          </div>
        </div>
        <div className="mb-1 row form-group">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            ProfileImage
          </label>
          <div className="col-sm-6">
            <input
              type="file"
              className="form-control"
              name="file"
              onChange={(e) =>
                props.profileImageUpload && props.profileImageUpload(e)
              }
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
        </div>
        <div className="mb-1 row form-group">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Aadhar Image
          </label>
          <div className="col-sm-6 form-group">
            <input
              type="file"
              name="aadharImage"
              onChange={(e) =>
                props.aadharImageUpload && props.aadharImageUpload(e)
              }
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Please Enter Phone No"
            />
          </div>
        </div>

        <br />
        <div className="d-flex justify-content-evenly">
          <button
            type="button"
            onClick={() => props.back()}
            class="btn btn-primary col-sm-2"
          >
            back
          </button>
          <button
            type="button"
            onClick={() => props.apihandler && props.apihandler()}
            class="btn btn-primary col-sm-2"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
