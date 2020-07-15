import React, { Component } from "react";
import AddSPDDataService from "../services/sdpData.service";
import { CSVReader } from 'react-papaparse'

export default class AddSPD extends Component {
  constructor(props) {
    super(props);
    this.onChangeUID = this.onChangeUID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);

    this.state = {
      uid: "",
      password: "",
      first_name: "",
      last_name: "",
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

  saveUserInfo() {
    var data = {
      user_uid: this.state.uid,
      spd_name: this.state.password,
      spd_value: this.state.first_name,
      lux_level: this.state.last_name,
    };

    AddSPDDataService.create(data)
    this.setState({submitted: true});
  }

    handleOnDrop = (data) => {
    console.log('File Uploaded')
    for (var i = 0; i < data.length; i++)
    {
      console.log(data[i].data)
    }
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
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
              <label htmlFor="description">SPD Name</label>
              <input type="text" className="form-control" id="password" required value={this.state.password} onChange={this.onChangePassword} name="password" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Import SPD values</label>
              <input type="text" className="form-control" id="first_name" required value={this.state.first_name} onChange={this.onChangeFirstName} name="first_name"/>
              <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>

            <div className="form-group">
              <label htmlFor="title">Lux</label>
              <input type="text" className="form-control" id="last_name" required value={this.state.last_name} onChange={this.onChangeLastName} name="last_name"/>
            </div>

            <button onClick={this.saveUserInfo} className="btn btn-success">
              Submit
            </button>
          </div>
      </div>
    );
  }
}
