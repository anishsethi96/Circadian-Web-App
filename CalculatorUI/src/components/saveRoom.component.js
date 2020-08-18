import React, { Component } from "react";
import SaveRoomDataService from "../services/saveRoom.service";

export default class SaveRoom extends Component {
  constructor(props) {
    super(props);
    this.onChangeRoomUID = this.onChangeRoomUID.bind(this);
    this.onChangeBuildingName = this.onChangeBuildingName.bind(this);
    this.onChangeRoomName = this.onChangeRoomName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeSavedRoom = this.onChangeSavedRoom.bind(this);
    this.onChangeMeasurementA = this.onChangeMeasurementA.bind(this);
    this.onChangeMeasurementH = this.onChangeMeasurementH.bind(this);
    this.onChangeSPDID = this.onChangeSPDID.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);


    this.state = {
      room_uid: "",
      building_name: "",
      room_name: "",
      location: "",
      savedroom_type: "",
      measurement_angle: "",
      measurement_height: "",
      room_spd_id: "",
      submitted: false
    };
  }

  onChangeRoomUID(e) {
    this.setState({
      room_uid: e.target.value
    });
  }

  onChangeBuildingName(e) {
    this.setState({
      building_name: e.target.value
    });
  }

  onChangeRoomName(e) {
    this.setState({
      room_name: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeSavedRoom(e) {
    this.setState({
      savedroom_type: e.target.value
    });
  }

  onChangeMeasurementA(e) {
    this.setState({
      measurement_angle: e.target.value
    });
  }

  onChangeMeasurementH(e) {
    this.setState({
      measurement_height: e.target.value
    });
  }

  onChangeSPDID(e) {
    this.setState({
      room_spd_id: e.target.value
    });
  }

  saveUserInfo() {
    var data = {
      room_uid: this.state.room_uid,
      building_name: this.state.building_name,
      room_name: this.state.room_name,
      location: this.state.location,
      savedroom_type: this.state.savedroom_type,
      measurement_angle: this.state.measurement_angle,
      measurement_height: this.state.measurement_height,
      room_spd_id: this.state.room_spd_id
    };

    SaveRoomDataService.create(data)
    //console.log(data)
    this.setState({submitted: true});
  }

  render() {
    return (
      <div className="submit-form">
        <h2> Enter Room Details </h2>
          <div>
            <div className="form-group">
              <label htmlFor="title">Room UID</label>
              <input type="text" className="form-control" id="room_uid" required value={this.state.room_uid} onChange={this.onChangeRoomUID} name="room_uid"/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Building Name</label>
              <input type="text" className="form-control" id="building_name" required value={this.state.building_name} onChange={this.onChangeBuildingName} name="building_name" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Room Name</label>
              <input type="text" className="form-control" id="room_name" required value={this.state.room_name} onChange={this.onChangeRoomName} name="room_name"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Location</label>
              <input type="text" className="form-control" id="location" required value={this.state.location} onChange={this.onChangeLocation} name="location"/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Saved Room Type (Dropdown?) </label>
              <input type="text" className="form-control" id="savedroom_type" required value={this.state.savedroom_type} onChange={this.onChangeSavedRoom} name="savedroom_type" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Measurment Angle</label>
              <input type="text" className="form-control" id="measurement_angle" required value={this.state.measurement_angle} onChange={this.onChangeMeasurementA} name="measurement_angle"/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Measurment Height</label>
              <input type="text" className="form-control" id="measurement_height" required value={this.state.measurement_height} onChange={this.onChangeMeasurementH} name="measurement_height"/>
            </div>

            <div className="form-group">
              <label htmlFor="description">SPD ID (Dropdown based on UID?) </label>
              <input type="text" className="form-control" id="room_spd_id" required value={this.state.room_spd_id} onChange={this.onChangeSPDID} name="room_spd_id" />
            </div>

            <button onClick={this.saveUserInfo} className="btn btn-success">
              Save Room
            </button>
            <br/>
            <br/>

          </div>
      </div>
    );
  }
}
