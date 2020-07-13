import React, { Component } from "react";
import SelectSPDService from "../services/selectSPD.service";
import { Link } from "react-router-dom";

export default class SPDSelector extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchSPD = this.onChangesearchSPD.bind(this);
    this.setActiveSelection = this.setActiveSelection.bind(this);
    this.searchSPD = this.searchSPD.bind(this);

    this.state = {
      spds: [],
      currentspd: null,
      currentIndex: -1,
      searchSPD: ""
    };
  }

  onChangesearchSPD(e) {
    const searchSPD = e.target.value;

    this.setState({
      searchSPD: searchSPD
    });
  }

  setActiveSelection(spd, index) {
    this.setState({
      currentspd: spd,
      currentIndex: index
    });
  }

  searchSPD() {
    SelectSPDService.get(this.state.searchSPD)
      .then(response => {
        this.setState({
          spds: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchSPD, spds, currentspd, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title" value={searchSPD} onChange={this.onChangesearchSPD} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.searchSPD}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          Select 2 SPD values for the conversion ratio
          <br/>

          <ul className="list-group">
            {spds &&
              spds.map((spd, index) => (
                <li className = {
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick = {
                  () => this.setActiveSelection(spd, index)
                } key = { index }>
                  {spd.spd_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentspd ? (
            <div>
              SPD Detals
              <div>
                <label>
                  <strong>User ID : </strong>
                </label>{" "}
                {currentspd.user_uid}
              </div>
              <div>
                <label>
                  <strong>Name : </strong>
                </label>{" "}
                {currentspd.spd_name}
              </div>
              <div>
                <label>
                  <strong>SPD ID : </strong>
                </label>{" "}
                {currentspd.spd_id}
              </div>
              <Link
                to={"/spds/" + currentspd.id}
                className="badge badge-warning"
              >
                select
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a spd...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
