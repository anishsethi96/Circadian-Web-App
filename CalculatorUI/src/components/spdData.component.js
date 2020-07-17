import React, { Component } from "react";
import AddSPDDataService from "../services/sdpData.service";
import { CSVReader } from 'react-papaparse'
var sum = 0;
var tsum = 0;
var cbp = 0;

export default class AddSPD extends Component {
  constructor(props) {
    super(props);
    this.onChangeUID = this.onChangeUID.bind(this);
    this.onChangeSPDName = this.onChangeSPDName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSPDValue = this.onChangeSPDValue.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);

    this.state = {
      uid: "",
      spd_name: "",
      spd_value: {},
      lux_level: "",
      submitted: false
    };
  }

  onChangeUID(e) {
    this.setState({
      uid: e.target.value
    });
  }

  onChangeSPDName(e) {
    this.setState({
      spd_name: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      spd_value: e.target.value
    });
  }

  handleOnDrop = (data) => {
    console.log('File Uploaded')
    for (var i = 0; i < data.length; i++)
    {
      this.state.spd_value[data[i].data[0]] =  data[i].data[1];
    }

    for (i = 380; i < 781; i++)
    {
      tsum = tsum + Number(this.state.spd_value[i]);
    }

    // Access JSON values needed
    for (i = 438; i < 493; i++)
    {
      sum = sum + Number(this.state.spd_value[i]);
    }
    console.log(sum/tsum*100)
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  onChangeSPDValue(e) {
    this.setState({
      lux_level: e.target.value
    });
  }

  saveUserInfo() {
    var data = {
      user_uid: this.state.uid,
      spd_name: this.state.spd_name,
      spd_value: this.state.spd_value,
      lux_level: this.state.lux_level,
    };

    AddSPDDataService.create(data)
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
              <label htmlFor="description">SPD Name</label>
              <input type="text" className="form-control" id="spd_name" required value={this.state.spd_name} onChange={this.onChangeSPDName} name="spd_name" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Lux</label>
              <input type="text" className="form-control" id="lux_level" required value={this.state.lux_level} onChange={this.onChangeSPDValue} name="lux_level"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Import SPD values</label>
              <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>

            <button onClick={this.saveUserInfo} className="btn btn-success">
              Calculate and Save SPD
            </button>
          </div>
      </div>
    );
  }
}
