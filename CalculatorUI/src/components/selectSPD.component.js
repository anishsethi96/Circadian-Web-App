import React, { Component } from "react";
import SelectSPDService from "../services/selectSPD.service";
import { Link } from "react-router-dom";

export default class SPDSelector extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  searchTitle() {
    SelectSPDService.get(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title" value={searchTitle} onChange={this.onChangeSearchTitle} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>SPD List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li className = {
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick = {
                  () => this.setActiveTutorial(tutorial, index)
                } key = { index }>
                  {tutorial.spd_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Saved SPD</h4>
              <div>
                <label>
                  <strong>User ID : </strong>
                </label>{" "}
                {currentTutorial.user_uid}
              </div>
              <div>
                <label>
                  <strong>Name : </strong>
                </label>{" "}
                {currentTutorial.spd_name}
              </div>
              <div>
                <label>
                  <strong>SPD ID : </strong>
                </label>{" "}
                {currentTutorial.spd_id}
              </div>
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                select
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
