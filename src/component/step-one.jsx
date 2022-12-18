import React, {useState} from 'react';
import StepTwo from './step-two';
import axios from 'axios';
// AiOutlinePlusCircle

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
    if (data.email.value.length !== 0) {
      emailArray.push(...bulkEmail, data.email.value);
      setBulkEmail(emailArray);
    } else {
      alert('Please Insert Email');
    }
    setData({
      ...data,
      email: {
        ...data['email'],
        value: '',
      },
    });
  };
  const addMultiplePhoneno = () => {
    let phoneArray = [];
    if (data.phone.value.length !== 0) {
      phoneArray.push(...bulkPhone, data.phone.value);
      setBulkPhone(phoneArray);
    } else {
      alert('Please Enter Phone NO');
    }
    setData({
      ...data,
      phone: {
        ...data['phone'],
        value: '',
      },
    });
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
    try {
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
        setBulkEmail([]);
        setBulkPhone([]);
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeMultipleEmail = (index) => {
    const firstArr = bulkEmail.slice(0, index) || [];
    const secondArr = bulkEmail.slice(index + 1) || [];
    const finalArr = [...firstArr, ...secondArr];
    setBulkEmail(finalArr);
  };
  const removeMultiplePhone = (index) => {
    const firstArr = bulkPhone.slice(0, index) || [];
    const secondArr = bulkPhone.slice(index + 1) || [];
    const finalArr = [...firstArr, ...secondArr];
    setBulkPhone(finalArr);
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
          <>
            <div className="container">
              <h1>Create Account</h1>
              <div className="mb-3 row form-group ">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="firstName"
                    value={data.firstName.value}
                    className="form-control"
                    onChange={handleOnChangeInputField}
                    required
                    id="staticEmail"
                    placeholder="Please Enter Name"
                  />
                </div>
              </div>
              <div className="mb-1 row form-group">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={data.email.value}
                    onChange={handleOnChangeInputField}
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="submit"
                    onClick={addMultipleEmail}
                    className="btn btn-primary mb-3"
                  >
                    Add
                  </button>
                </div>
              </div>
              {bulkEmail.map((item, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col-sm-6"> {item}</div>
                      <div className="col-sm-2">
                        <button
                          type="submit"
                          onClick={() => removeMultipleEmail(index)}
                          className="btn btn-primary mb-3"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="mb-1 row form-group">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Phone No
                </label>
                <div className="col-sm-6 form-group">
                  <input
                    type="number"
                    name="phone"
                    value={data.phone.value}
                    onChange={handleOnChangeInputField}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Please Enter Phone No"
                  />
                </div>

                <div className="col-sm-2">
                  <button
                    type="submit"
                    onClick={addMultiplePhoneno}
                    className="btn btn-primary mb-3"
                  >
                    Add
                  </button>
                </div>
              </div>
              {bulkPhone.map((item, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col-sm-6"> {item}</div>
                      <div className="col-sm-2">
                        <button
                          type="submit"
                          onClick={() => removeMultiplePhone(index)}
                          className="btn btn-primary mb-3"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
              <br />
              <button
                type="button"
                onClick={next}
                class="btn btn-primary col-sm-2"
              >
                Next
              </button>
            </div>
          </>
        );
    }
  };
  return formView();
};

export default StepOne;
