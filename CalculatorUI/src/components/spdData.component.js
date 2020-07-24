import React, { Component } from "react";
import AddSPDDataService from "../services/sdpData.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CSVReader } from 'react-papaparse'
import SaveRoom from "../components/saveRoom.component";
import SelectSPDService from "../services/selectSPD.service";
import "../App.css";

var irradiance = 0;
var total_irradiance = 0;
var circadian_potency = 0;
var photopic_power = 0;
var corneal_lux = 0;

const potency_SSD = [0.016326562,0.017764168,0.019311469,0.020975196,0.022762346,0.024680179,0.026736212,0.028938214,0.031294201,0.033812422,0.036501355,0.039369688,0.042426308,0.045680284,0.049140846,0.052817367,0.056719338,0.060856341,0.065238026,0.069874074,0.074774171,0.079947967,0.085405046,0.09115488,0.097206789,0.103569899,0.110253096,0.117264976,0.124613796,0.132307425,0.140353289,0.148758316,0.157528884,0.166670763,0.176189058,0.186088154,0.196371657,0.207042339,0.218102082,0.229551819,0.241391488,0.253619971,0.266235049,0.279233353,0.29261032,0.306360147,0.320475758,0.334948766,0.349769442,0.364926692,0.380408033,0.396199581,0.412286039,0.428650692,0.445275411,0.462140661,0.479225515,0.496507677,0.51396351,0.531568074,0.549295164,0.567117365,0.585006106,0.602931725,0.620863541,0.638769927,0.656618403,0.674375715,0.692007941,0.709480588,0.726758702,0.743806976,0.760589872,0.777071735,0.793216921,0.808989922,0.824355494,0.839278786,0.85372547,0.867661875,0.881055111,0.893873204,0.906085219,0.917661385,0.928573215,0.938793622,0.948297035,0.9570595,0.965058784,0.972274468,0.978688033,0.984282942,0.989044707,0.992960954,0.996021476,0.998218279,0.999545613,1,0.997479236,0.989748801,0.976929809,0.959221699,0.936897077,0.910294734,0.879811092,0.845890392,0.809013945,0.769688822,0.728436347,0.685780754,0.642238348,0.598307479,0.554459572,0.511131441,0.468719005,0.427572521,0.387993336,0.350232144,0.314488664,0.280912616,0.249605845,0.220625401,0.193987404,0.169671464,0.147625485,0.127770656,0.110006455,0.094215525,0.080268293,0.068027238,0.057350725,0.048096363,0.040123871,0.033297426,0.027487532,0.022572419,0.018439015,0.014983545,0.0121118,0.009739128,0.007790202,0.006198614,0.004906341,0.00386312,0.003025769,0.002357495,0.001827187,0.001408745,0.001080436,0.000824296,0.000625582,0.000472283,0.000354681,0.000264967,0.000196907,0.000145562,0.000107042,7.83025E-05,5.6979E-05,4.1245E-05,2.96992E-05,2.12734E-05,1.51581E-05,1.07441E-05,7.57553E-06,5.31341E-06,3.70724E-06,2.57303E-06,1.77646E-06,1.22007E-06,8.33551E-07,5.66494E-07,3.8298E-07,2.57558E-07,1.72302E-07,1.14663E-07,7.59053E-08,4.9985E-08,3.27434E-08,2.13366E-08,1.38307E-08,8.91827E-09,5.7205E-09,3.6501E-09,2.31682E-09,1.46284E-09,9.18798E-10,5.74063E-10,3.56793E-10,2.20593E-10,1.3567E-10,8.30025E-11,5.05146E-11,3.05816E-11,1.84171E-11,1.10331E-11,6.57497E-12,3.89768E-12,2.29845E-12,1.34829E-12,7.86767E-13,4.56696E-13,2.6371E-13,1.51475E-13,8.65515E-14,4.91955E-14,2.78159E-14,1.56451E-14,8.75345E-15,4.8719E-15,2.69734E-15,1.48556E-15,8.1388E-16,4.43556E-16,2.40466E-16,1.29681E-16,6.95692E-17,3.71257E-17,1.97083E-17,1.04074E-17,5.46702E-18,2.85678E-18,1.48498E-18,7.67859E-19,3.94966E-19,2.02095E-19,1.02865E-19,5.20832E-20,2.62328E-20,1.31434E-20,6.55075E-21,3.2478E-21,1.60179E-21,7.8585E-22,3.83522E-22,1.86191E-22,8.99174E-23,4.31963E-23,2.06427E-23,9.81303E-24,4.64042E-24,2.18287E-24,1.02145E-24,4.7547E-25,2.20164E-25,1.01412E-25,4.64671E-26,2.11797E-26,9.60313E-27,4.33134E-27,1.94334E-27,8.67348E-28,3.85083E-28,1.70072E-28,7.47186E-29,3.26544E-29,1.41962E-29,6.13932E-30,2.6411E-30,1.13023E-30,4.81135E-31,2.03743E-31,8.58257E-32,3.5964E-32,1.49912E-32,6.21616E-33,2.56404E-33,1.05207E-33,4.29421E-34,1.74356E-34,7.04222E-35,2.82943E-35,1.13085E-35,4.49603E-36,1.77816E-36,6.99566E-37,2.73781E-37,1.06585E-37,4.12769E-38,1.59014E-38,6.09367E-39,2.32295E-39,8.80885E-40,3.32289E-40,1.24689E-40,4.65436E-41,1.72826E-41,6.38372E-42,2.34561E-42,8.57346E-43,3.11726E-43,1.12748E-43,4.05657E-44,1.45187E-44,5.16909E-45,1.8307E-45,6.44968E-46,2.26035E-46,7.88009E-47,2.73277E-47,9.42743E-48,3.23519E-48,1.10439E-48,3.7503E-49,1.26685E-49,4.25697E-50,1.42296E-50,4.73156E-51,1.56506E-51,5.14964E-52,1.68554E-52,5.48805E-53,1.77752E-53,5.72703E-54,1.83553E-54,5.85206E-55,1.85599E-55,5.85542E-56,1.83763E-56,5.73688E-57,1.7816E-57,5.5038E-58,1.69134E-58,5.17033E-59,1.57225E-59,4.75601E-60,1.43114E-60,4.28388E-61,1.27559E-61,3.77833E-62,1.11329E-62,3.26311E-63,9.51423E-64,2.75952E-64,7.96177E-65,2.28509E-65,6.524E-66,1.85286E-66,5.23465E-67,1.47113E-67,4.11273E-68,1.14374E-68,3.16404E-69,8.7071E-70,2.38354E-70,6.49065E-71,1.75821E-71,4.73776E-72,1.26996E-72,3.3863E-73,8.98211E-74,2.37E-74,6.22064E-75,1.6242E-75,4.21853E-76,1.08993E-76,2.80127E-77,7.16191E-78,1.82146E-78,4.60816E-79,1.15972E-79,2.90332E-80,7.23027E-81,1.79115E-81,4.41393E-82,1.08202E-82,2.63855E-83,6.40046E-84,1.54445E-84,3.70727E-85,8.85222E-86,2.10265E-86,4.9682E-87,1.16775E-87,2.73033E-88,6.35037E-89,1.46926E-89,3.38157E-90,7.74202E-91,1.76322E-91,3.99464E-92,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const photopic_SSD = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0028,0.0031159,0.0034576,0.0038268,0.0042256,0.0046562,0.0051216,0.0056248,0.0061695,0.0067597,0.0074,0.0081451,0.0089555,0.0098322,0.010774,0.011779,0.012842,0.013956,0.015111,0.016297,0.0175,0.018582,0.019645,0.020683,0.021694,0.022678,0.023636,0.024572,0.02549,0.026397,0.0273,0.028335,0.029383,0.030442,0.03151,0.032584,0.033661,0.034735,0.035803,0.03686,0.0379,0.038838,0.039752,0.040646,0.041524,0.042391,0.043252,0.044116,0.04499,0.045881,0.0468,0.047743,0.048733,0.049785,0.05091,0.052122,0.053435,0.054864,0.056424,0.058131,0.06,0.062602,0.0652775,0.0680421,0.0709111,0.0739,0.077016,0.0802664,0.0836668,0.0872328,0.09098,0.0949176,0.0990458,0.1033674,0.1078846,0.1126,0.117532,0.1226744,0.1279928,0.1334528,0.13902,0.1446764,0.1504693,0.1564619,0.1627177,0.1693,0.1762431,0.1835581,0.1912735,0.199418,0.20802,0.2171199,0.2267345,0.2368571,0.2474812,0.2586,0.2701849,0.2822939,0.2950505,0.308578,0.323,0.3384021,0.3546858,0.3716986,0.3892875,0.4073,0.4256299,0.4443096,0.4633944,0.4829395,0.503,0.5235693,0.544512,0.56569,0.5869653,0.6082,0.6293456,0.6503068,0.6708752,0.6908424,0.71,0.7281852,0.7454636,0.7619694,0.7778368,0.7932,0.8081104,0.8224962,0.8363068,0.8494916,0.862,0.8738108,0.8849624,0.8954936,0.9054432,0.9148501,0.9237348,0.9320924,0.9399226,0.9472252,0.954,0.9602561,0.9660074,0.9712606,0.9760225,0.9803,0.9840924,0.9874182,0.9903128,0.9928116,0.9949501,0.9967108,0.9980983,0.999112,0.9997482,1,0.9998567,0.9993046,0.9983255,0.9968987,0.995,0.9926005,0.9897426,0.9864444,0.9827241,0.9786,0.9740837,0.9691712,0.9638568,0.9581349,0.952,0.9454504,0.9384992,0.9311628,0.9234576,0.9154,0.9070064,0.8982772,0.8892048,0.8797816,0.87,0.8598613,0.849392,0.838622,0.8275813,0.8163,0.8047947,0.793082,0.781192,0.7691547,0.757,0.7447541,0.7324224,0.7200036,0.7074965,0.6949,0.6822192,0.6694716,0.6566744,0.6438448,0.631,0.6181555,0.6053144,0.5924756,0.5796379,0.5668,0.5539611,0.5411372,0.5283528,0.5156323,0.503,0.4904688,0.4780304,0.4656776,0.4534032,0.4412,0.42908,0.417036,0.405032,0.393032,0.381,0.3689184,0.3568272,0.3447768,0.3328176,0.321,0.3093381,0.2978504,0.2865936,0.2756245,0.265,0.2547632,0.2448896,0.2353344,0.2260528,0.217,0.2081616,0.1995488,0.1911552,0.1829744,0.175,0.1672235,0.1596464,0.1522776,0.1451259,0.1382,0.1315003,0.1250248,0.1187792,0.1127691,0.107,0.1014762,0.0961886,0.091123,0.0862649,0.0816,0.0771206,0.0728255,0.0687101,0.0647698,0.061,0.0573962,0.053955,0.0506738,0.0475497,0.04458,0.0417587,0.039085,0.0365638,0.0342005,0.032,0.0299626,0.0280766,0.0263294,0.0247081,0.0232,0.0218008,0.0205011,0.0192811,0.0181207,0.017,0.0159038,0.0148372,0.0138107,0.0128348,0.01192,0.0110683,0.0102734,0.0095333,0.0088462,0.00821,0.0076238,0.0070854,0.0065915,0.0061385,0.005723,0.0053431,0.0049958,0.0046764,0.0043801,0.004102,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

export default class AddSPD extends Component {
  constructor(props) {
    super(props);
    this.onChangeUID = this.onChangeUID.bind(this);
    this.onChangeSPDName = this.onChangeSPDName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeSPDValue = this.onChangeSPDValue.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.setActiveSelection = this.setActiveSelection.bind(this);
    this.searchSPD = this.searchSPD.bind(this);

    this.state = {
      uid: "",
      spd_name: "",
      spd_value: {},
      lux_level: "",
      submitted: false,
      spds: [],
      currentspd: null,
      currentIndex: -1,
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

  onChangeSPDValue(e) {
    this.setState({
      lux_level: e.target.value
    });
  }

  setActiveSelection(spd, index) {
    this.setState({
      currentspd: spd,
      currentIndex: index
    });
  }

  handleOnDrop = (data) => {
    console.log('File Uploaded')
    for (var i = 0; i < data.length; i++)
    {
      this.state.spd_value[data[i].data[0]] =  data[i].data[1];
    }
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
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

    for (var i = 380; i < 781; i++)
    {
      corneal_lux = corneal_lux + (Number(this.state.spd_value[i]) * this.state.lux_level);
      total_irradiance = total_irradiance + Number(this.state.spd_value[i]);
      // Calculate CPPR need to normalize circadian_potency to relative circadian_potency
      circadian_potency = circadian_potency + potency_SSD[i-380] * Number(this.state.spd_value[i]);
      photopic_power = photopic_power + photopic_SSD[i-380] * Number(this.state.spd_value[i]);
    }
    console.log("full irradiance: " + circadian_potency);

    // Access JSON values needed
    for (i = 438; i < 493; i++)
    {
      irradiance = irradiance + Number(this.state.spd_value[i]);
    }

    if( !this.state.lux_level == 0) {
      circadian_potency = 0
      for (var i = 438; i < 493; i++)
      {
        // Calculate lux something
        circadian_potency = circadian_potency + potency_SSD[i-380] * Number(this.state.spd_value[i]);
      }
      corneal_lux = 685*corneal_lux/100
      console.log("Corneal Lux: " + corneal_lux);

      console.log("Circadian irradiance: " + circadian_potency)
      alert("Minimum Tabletop Lux to comply with DAY threshold " + 2*corneal_lux*20/circadian_potency +
            " Maximum Tabletop Lux to comply with NIGHT threshold " + 2*corneal_lux*2/circadian_potency );
    }

    alert("CPPR: " + circadian_potency/photopic_power + " CB Potency: " + irradiance/total_irradiance*100 + " LUX " + corneal_lux );
    console.log(circadian_potency/photopic_power);
    console.log(irradiance/total_irradiance*100);

  }

  searchSPD() {
    SelectSPDService.get(this.state.uid)
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
      <div className="submit-form">
          <div>
            <div className="form-group">
              <label htmlFor="title">Username</label>
              <input type="text" className="form-control" id="uid" required value={this.state.uid} onChange={this.onChangeUID} name="uid"/>
            </div>
            <div className="col-md-8">
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchSPD}>
                    Search
                  </button>
                </div>
              </div>
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
          </div>

          <div className="list row">

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

          <div className="second">
            <div className="col-md-12 text-center">
              <form>
                <button onClick={this.saveUserInfo} className="btn btn-success button">
                  Calculate
                </button>
                <button className="btn btn-success button">
                <Link to = {"/saveroom"} style={{ textDecoration: 'none', color: "white"}}>
                  Save a Room
                </Link>
                </button>
              </form>
            </div>
          </div>

      </div>
    );
  }
}
