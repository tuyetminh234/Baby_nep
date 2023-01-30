import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";

export default function HookRegisterForm(props) {
  // constructor(props) {
  //   super(props);

  // formRef = React.createRef();
  // }

  const formRef = React.createRef();
  const [filterValue, setFilterValue] = useState("");
  const [values, setValues] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "Client",
  });

  const [errors, setErors] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "",
  });

  const dispatch = useDispatch();
  const hookUserState = useSelector((state) => state.hookUserReducer);
// console.log(hookUserState)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();

    if (!isValid) {
      return;
    }
    if (props.selectedUser) {
      dispatch({
        type: "UPDATE_USER",
        payload: values,
      });
    } else {
      dispatch({
        type: "ADD_USER",
        payload: values,
      });
    }

    // console.log(values);
  };

  const handleBlur = (event) => {
    let message = "";
    const { validationMessage, name, validity, title, minLength, maxLength } =
      event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    // console.log(event);
    // console.log(validationMessage);

    // console.log(patternMismatch);

    if (valueMissing) {
      message = `${title} is required.`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength}-${maxLength} characters`;
    }

    if (patternMismatch) {
      message = `${title} is invalid pattern`;
    }

    setErors({
      ...errors,
      [name]: message,
    });
  };

  // const state = {
  //   keyword: ""
  // }

  const renderContent = (props) => {
    // const filteredData = props.userList.filter(ele => {
    //   return ele.fullName.toLowerCase().indexOf(state.keyword.toLowerCase()) !== -1
    // })

    // filter type
    // ...

    
    return hookUserState.userList.filter(ele => {
      return ele.fullName.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
        }).map((element, idx) => {
        return (
          // idx % 2 === 0 ( những thằng có idx = 0,2,4,6,8 chia hết cho 2 )
          <tr key={element.id} className={idx % 2 === 0 ? "bg-light" : undefined}>
            <td>{idx + 1}</td>
            <td>{element.username}</td>
            <td>{element.fullName}</td>
            <td>{element.email}</td>
            <td>{element.phoneNumber}</td>
            <td>{element.type}</td>
            <td>
              <button
                className="btn btn-info mr-2"
                onClick={() => setselectedUser(element)}
              >
                EDIT
              </button>
              <button
                onClick={() => deleteUser(element)}
                className="btn btn-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      });
  };

  const setselectedUser = (user) => {
    dispatch({
      type: "SET_SELECTED_USER",
      payload: user,
    });
  };

  const deleteUser = (user) => {
    dispatch({
      type: "DELETE_USER",
      payload: user,
    });
  };

  return (
    <div>
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold">
          REGISTER FORM
        </div>
        <div className="card-body">
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    onChange={handleChange}
                    required
                    title="User Name"
                  
                    onBlur={handleBlur}
                    name="username"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.username}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    title="Full Name"
                    name="fullName"
                    minLength={5}
                    maxLength={10}
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.fullName}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    title="Password"
                    name="password"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.password}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    title="Phone Number"
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.phoneNumber}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Email"
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.email}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    title="Type"
                    name="type"
                    className="form-control"
                  >
                    <option>Client</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button
                // disabled={!formRef.current?.checkValidity()}
                className="btn btn-warning mr-2"
              >
                SAVE
              </button>
              <button type="reset" className="btn btn-outline-dark">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold">USER MANAGEMENT</div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Search by full name..."
                className="form-control"
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>
          </div>
          <div className="col-3 ml-auto">
            <div className="form-group mb-0">
              <select className="form-control">
                <option>All</option>
                <option>Client</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderContent()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
