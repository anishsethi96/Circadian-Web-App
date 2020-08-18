import React, { Component } from "react";
import CreateUserDataService from "../services/createUser.service";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUID = this.onChangeUID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailID = this.onChangeEmailID.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);

    this.state = {
      uid: "",
      password: "",
      first_name: "",
      last_name: "",
      email_id: "",
      company_name: "",
      submitted: false
    };
  }

  onChangeUID(e) {
    this.setState({
      uid: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangeEmailID(e) {
    this.setState({
      email_id: e.target.value
    });
  }

  onChangeCompany(e) {
    this.setState({
      company_name: e.target.value
    });
  }

  saveUserInfo() {
    var data = {
      uid: this.state.uid,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email_id: this.state.email_id,
      company_name: this.state.company_name
    };

    //console.log(data);

    CreateUserDataService.create(data)
    this.setState({submitted: true});
  }

  render() {
    return (
      <div className="submit-form">
          <div>
            <div className="form-group">
              <label htmlFor="title">Username</label>
              <input type="text" className="form-control" id="uid" required value={this.state.uid} onChange={this.onChangeUID} name="uid"/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input type="password" className="form-control" id="password" required value={this.state.password} onChange={this.onChangePassword} name="password" />
            </div>

            <div className="form-group">
              <label htmlFor="title">First Name</label>
              <input type="text" className="form-control" id="first_name" required value={this.state.first_name} onChange={this.onChangeFirstName} name="first_name"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Last Name</label>
              <input type="text" className="form-control" id="last_name" required value={this.state.last_name} onChange={this.onChangeLastName} name="last_name"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Email ID</label>
              <input type="text" className="form-control" id="email_id" required value={this.state.email_id} onChange={this.onChangeEmailID} name="email_id"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Company / Organization</label>
              <input type="text" className="form-control" id="company_name" required value={this.state.company_name} onChange={this.onChangeCompany} name="company_name"/>
            </div>

            <button onClick={this.saveUserInfo} className="btn btn-success">
              Submit
            </button>
          </div>
      </div>
    );
  }
}
