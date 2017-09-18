import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { toLines, removeEmptyLines, replaceQuotes } from './helpers';

class Departamentos extends Component {
  
  // state = {
  //   departaments: [
  //     {
  //       code: '01',
  //       name: 'Lima'
  //     },
  //     {
  //       code: '02',
  //       name: 'Arequipa'
  //     }
  //   ]
  // };

  constructor(props){
    super(props);
  }

  render(){
    const { departaments } = this.props;
    return(
      <div>
        <h4>DEPARTAMENTO</h4>
        <table id="departaments">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Código Padre</th>
              <th>Descripción Padre</th>
            </tr>
          </thead>
          <tbody>
            { departaments.map((departament, index) => 
              <tr key={'departament'+index}>
                <td>{departament.code}</td>
                <td>{departament.name}</td>
                <td>-</td>
                <td>-</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class Provincias extends Component {
  
  // state = {
  //   departaments: [
  //     {
  //       code: '01',
  //       name: 'Lima', 
  //       provinces: [
  //         {
  //           code: '51',
  //           name: 'Barranca',
  //           districts: []
  //         }
  //       ]
  //     },
  //     {
  //       code: '02',
  //       name: 'Arequipa',
  //       provinces: [
  //         {
  //           code: '64',
  //           name: 'Caylloma',
  //           districts: []
  //         }
  //       ]
  //     }
  //   ]
  // };

  constructor(props){
    super(props);
  }

  render(){
    const { departaments } = this.props;
    return(
      <div>
        <h4>PROVINCIA</h4>
        <table id="provinces">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Código Padre</th>
              <th>Descripción Padre</th>
            </tr>
          </thead>
          <tbody>
            { departaments.map( departament => departament.provinces.map( (province, index) => 
              <tr key={'province'+index}>
                <td>{province.code}</td>
                <td>{province.name}</td>
                <td>{departament.code}</td>
                <td>{departament.name}</td>
              </tr>))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class Distritos extends Component {
  
  // state = {
  //   departaments: [
  //     {
  //       code: '01',
  //       name: 'Lima', 
  //       provinces: [
  //         {
  //           code: '51',
  //           name: 'Barranca',
  //           districts: []
  //         },
  //         {
  //           code: '50',
  //           name: 'Lima',
  //           districts: [
  //             {
  //               code: '203',
  //               name: 'San Isidro'
  //             },
  //             {
  //               code: '202',
  //               name: 'La Molina'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       code: '02',
  //       name: 'Arequipa',
  //       provinces: [
  //         {
  //           code: '64',
  //           name: 'Caylloma',
  //           districts: []
  //         },
  //         {
  //           code: '63',
  //           name: 'Arequipa',
  //           districts: [
  //             {
  //               code: '267',
  //               name: 'Cercado'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // };

  constructor(props){
    super(props);
  }

  render(){
    const { departaments } = this.props;
    return(
      <div>
        <h4>DISTRITO</h4>
        <table id="districts">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Código Padre</th>
              <th>Descripción Padre</th>
            </tr>
          </thead>
          <tbody> 
            { departaments.map( departament => departament.provinces.map( (province) => province.districts.map( (district, index) => 
              <tr key={'district'+index}>
                <td>{district.code}</td>
                <td>{district.name}</td>
                <td>{province.code}</td>
                <td>{province.name}</td>
              </tr>)) )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

let departaments = [];

class Ubigeo extends Component {
  
  state = {
    departaments: []
  }

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  exist = function(array, code){
    var idx = -1;
    for(var i = 0; i < array.length; i++){
      var temp = array[i];
      if(temp.code === code){
        idx = i;
        break;
      }
    }
    return idx;
  };

  readData = function(line){
    var segment = line.split('/');
    var departament = segment[0].trim();
    var province = segment[1].trim();
    var district = segment[2].trim();
    var departamentCode = departament.substr(0, 2);				
		var departamentName = departament.substr(2, departament.length - 2);
    var existDepartament = this.exist(departaments, departamentCode);
    if(existDepartament === -1){
		  departaments.push({
        code : departamentCode,
        name : departamentName,
        provinces : []
      });
    }else{
      var provinceCode = province.substr(0, 2);				
      var provinceName = province.substr(2, province.length - 2);
      var existProvince = this.exist(departaments[existDepartament].provinces, provinceCode);
      if(existProvince === -1){
        departaments[existDepartament].provinces.push({
          code : provinceCode,
          name : provinceName,
          districts : []
        });
      }else{
        var districtCode = district.substr(0, 3);				
        var districtName = district.substr(3, district.length-3);
        var existDistrict = this.exist(departaments[existDepartament].provinces[existProvince].districts, districtCode);
        departaments[existDepartament].provinces[existProvince].districts.push({
          code : districtCode,
          name : districtName
        });
      }
    }
    console.log(departaments);
    this.setState({ departaments: departaments });
  };

  generate = (array) => {
    var self = this;
    for(var i = 0; i < array.length; i++){
      this.readData(array[i]); 
    }
  }


  handleChange(selectorFiles){
    console.log('handleChange', selectorFiles);
    let file = selectorFiles[0];
		let reader = new FileReader();
		reader.onload = (event) =>{
      let txt = replaceQuotes(event.target.result);
      console.log('txt', txt);
      let lines = toLines(txt);
      console.log('lines', lines);
      let clean = removeEmptyLines(lines);
      console.log('clean', clean);
      this.generate(clean);
		};
		reader.readAsText(file);
  }

  clickGenerate(){
    console.log('click generate');  
  }

  render(){
    const { departaments } = this.state;
    return(
      <div>
        <div>
          <input
              type="file"
              ref="image"
              id="upload-file"
              onChange={ (e) => this.handleChange(e.target.files) }
          />
        </div>
        <div>
          <button type="button" onClick={this.clickGenerate}>Generar</button>
        </div>
        <Departamentos departaments={departaments}/>
        <Provincias departaments={departaments}/>
        <Distritos departaments={departaments}/> 
      </div>
    );
  }
}

ReactDOM.render(
  <Ubigeo></Ubigeo>,
  document.getElementById('app')
);
