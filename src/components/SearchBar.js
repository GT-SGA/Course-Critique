import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, withRouter } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import { IconButton, TextField } from '@material-ui/core';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
// import FormControl from 'react-bootstrap/FormControl';

const axios = require('axios');

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      numResults: 0,
      queryTime: 0,
      results: [],  //format [id, link]
      topResult: null,
      clearInput: false
    };
  }

  /*props format: example call <SearchBar this.props.format={2}>
  0: only default search
  1: include results (regular links)
  2: include results + example searches
  3: dropdown search
  */

  async handleKeyPress(e) {
    //e.stopPropagation();
    if (e.key == 'Enter') {
      this.searchTopResult();
      this.setState(state => ({
        clearInput: !state.clearInput
      }))
    }

    // edit this line for the change
    //else this.getElasticSearch()
  }
  async getElasticSearch() {
    //only search if length >= 3
    let text = document.getElementById("searchbar").value;
    if (text.length < 3) {
      return;
    }
    const url = `${ELASTICSEARCH_URL}?q=` + text

    const config = {
      method: 'get',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    const res = await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
    if (res.searchresponse)
      this.updateData(res);
  }


  updateData = (res) => {
    let queryTime = res.queryms;
    if (queryTime === 0) {queryTime =1;}
    let totalResults = res.searchresponse.length;

    let totalList = []
    let links = []
    let topResult = "";

    const updateRes = () => {
      totalList = res.searchresponse
      var topResultHasBeenSet = false
      totalList.forEach((entry) => {
        if (entry.type === "course") {
          links.push([entry.value, `/course?courseID=${entry.value}`]);
          if (!topResultHasBeenSet) {
            topResult = `/course?courseID=${entry.value}`
            topResultHasBeenSet = true;
          }
        } else if (entry.type === "professor") {
          links.push([entry.value, `/prof?profID=${entry.uniqueID}`]);
          if (!topResultHasBeenSet) {
            topResult = `/prof?profID=${entry.uniqueID}`
            topResultHasBeenSet = true;
          }
        } else {
          throw new Error("Found a weird entry")
        }
      })
    }

    updateRes(res);

    this.setState({
      display: true,
      numResults: totalResults > 10 ? 10 : totalResults,
      queryTime: queryTime,
      results: links,
      topResult: topResult
    })
  }


  // navigates to top result if there is a top result
  searchTopResult = () => {
    let text = document.getElementById("searchbar").value;
    if (text.length < 3) {
      return;
    }
    this.getElasticSearch();
    //go to topResult page
    this.props.history.push(this.state.topResult);
  }

  showData = () => {
    return (
    <div style={{textAlign: 'left'}}>
      <h6>{this.state.numResults} results in: {this.state.queryTime} ms</h6>
      {this.state.results.map((result) => {
        return (
          <div>
            <Link to={result[1]}>{result[0]}</Link>
            <p></p>
          </div>
        )
      })}
    </div>
    )
  }

  showExample = () => {
    return (
     <table style={{textAlign: 'left', fontSize: '16px'}}>
        <thead>
          <tr>
            <td>Example Searches:</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ECE 3020</td>
          </tr>
          <tr>
            <td>PHYS 2212</td>
          </tr>
          <tr>
            <td>George P. Burdell</td>
          </tr>
        </tbody>
      </table>
    );
  }

  getDataList = () => {
    return(
      <Fragment>
      {this.state.results.map((result) => {
        return (
          <Fragment>
            <option value={result[0]}></option>
          </Fragment>
        )
      })}
      </Fragment>
    )
  }

  getOptions = () => {
    let values = []
    for (let i = 0; i < this.state.results.length; i++) {
      values.push(this.state.results[i][0]);
    }
    return values;
  }


  directOptionToPage = (value) => {
    for (let i = 0; i < this.state.results.length; i++) {
      if (value == this.state.results[i][0]) {
        this.props.history.push(this.state.results[i][1]);
        this.setState(state => ({
          clearInput: !state.clearInput
        }))
        break;
      }
    }
  }

  render() {
    return (
      <Fragment>
        <InputGroup style={{ marginBottom: "2vh" }}>
          {this.props.format !== 3 &&
          // <input type="text" id="searchbar" placeholder="e.g. Math 1552" list="results" autocomplete="off"
          //   onChange = {() => this.getElasticSearch()} onKeyPress = {(e) => this.handleKeyPress(e)}/>
          <Autocomplete
          id="searchbar"
          options={this.getOptions()}
          getOptionLabel={(option) => option}
          style={{ width: "80%", borderRadius: "4px" }}
          // inputValue=""
          onInputChange = {() => this.getElasticSearch()}
          onChange={(event, value) => this.directOptionToPage(value)}
          onKeyPress={(e) => this.handleKeyPress(e)}
          filterOptions={x => x}
          limitTags={1}
          freeSolo={true}
          renderInput={(params) => <TextField {...params} size="small" className= "searchbar" placeholder="Search for a Prof or Course" variant="outlined" 
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment>
                <IconButton id="search" size="small" variant="outline-secondary" onClick={() => this.searchTopResult()}>
                <SearchIcon style={{color: '#949494'}}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
          />}
          />
          }
          {this.props.format === 3 &&
            <Autocomplete
            key={this.state.clearInput}
            id="searchbar"
            options={this.getOptions()}
            clearOnEscape={true}
            getOptionLabel={(option) => option}
            style={{ width: "40em", borderRadius: "4px" }}
            onInputChange = {() => this.getElasticSearch()}
            onChange={(event, value) => this.directOptionToPage(value)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            filterOptions={x => x}
            limitTags={1}
            freeSolo={true}
            renderInput={(params) => <TextField {...params} size="small" className= "searchbar" placeholder="Search for a Prof or Course" variant="outlined" 
            InputProps={{
              ...params.InputProps,
              style: {
                color: '#808080'
              },
              startAdornment: (
                <InputAdornment>
                  <IconButton id="search" size="small" variant="outline-secondary" onClick={() => this.searchTopResult()}>
                    <SearchIcon style={{color: '#949494'}}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />}
            />
          }
          {/* <InputGroup.Append>
            <Button id="search" variant="outline-secondary" onClick={() => this.searchTopResult()}>
              <SearchIcon />
           </Button>
            <Button id="search" variant="outline-secondary" onClick={() => this.searchTopResult()}>Search</Button>
          </InputGroup.Append> */}
        </InputGroup>
        {/* {this.props.format === 2 && <hr></hr>} */}
        {(this.props.format === 1 || (this.props.format === 2 && this.state.display))
          &&
          <div>
            {/* {this.showData()} */}
            {this.showExample()}
          </div>
        }
        {(this.props.format === 2 && !this.state.display) &&
            <div>
              {this.showExample()}
            </div>
        }
        {/* {this.props.format === 2 && <hr></hr>} */}
      </Fragment>
    )
  }
}

export default withRouter(SearchBar);