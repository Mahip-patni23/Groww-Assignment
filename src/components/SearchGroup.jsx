import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import updateSearchParams from "../actionCreators/updateSearchParams";
import store from "../store";
import "../css/searchParams.css";

function SearchGroup() {

  const searchParams = useSelector((state) => state.searchParams);

  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  const debounce = (func, time) => {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, time);
    };
  };

  const debouncedFunction = debounce((value) => {
    searchParams.query = value;
    store.dispatch(updateSearchParams(searchParams));
  }, 500);

  return (
    <>
      <Typography variant="h6" color="secondary" style={{ margin: "40px 0 20px 0", textAlign: 'center' }}>
        Search Your Preference..
      </Typography>
      <Grid className="grid_container" container spacing={2} style={{ marginBottom: "40px"}}>
        <Grid item lg={3} md={4} sm={4} xs={12}>
          <FormControl
            variant="outlined"
            style={{ minWidth: 250, marginRight: "50px" }}
          >
            <InputLabel id="select-city-label">Select city</InputLabel>
            <Select
              labelId="select-city-label"
              id="select-city"
              label="Select city"
              value={searchParams.city}
              disabled={loading}
              onChange={(e) => {
                searchParams.city = e.target.value;
                searchParams.query = "";
                searchParams.category = "";
                document.getElementById("query").value = "";
                dispatch(updateSearchParams(searchParams));
              }}
            >
              <MenuItem value={"BANGLORE"}>BANGALORE</MenuItem>
              <MenuItem value={"MUMBAI"}>MUMBAI</MenuItem>
              <MenuItem value={"DELHI"}>DELHI</MenuItem>
              <MenuItem value={"LUCKNOW"}>LUCKNOW</MenuItem>
              <MenuItem value={"HYDERABAD"}>HYDERABAD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={4} sm={4} xs={12}>
          <FormControl
            variant="outlined"
            style={{ minWidth: 250, marginRight: "50px" }}
          >
            <InputLabel id="select-category-label">Select Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              label="Select category"
              disabled={loading}
              value={searchParams.category}
              onChange={(e) => {
                searchParams.category = e.target.value;
                searchParams.query = "";
                document.getElementById("query").value = "";
                dispatch(updateSearchParams(searchParams));
              }}
            >
              <MenuItem value="">
                <em>Select category</em>
              </MenuItem>
              <MenuItem value={"ifsc"}>IFSC</MenuItem>
              <MenuItem value={"branch"}>Branch</MenuItem>
              <MenuItem value={"bank_name"}>Bank name</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <div className="queryInput">
            <div
              className={
                "tooltip-text" + (searchParams.category ? " hide" : "")
              }
            >
              Please select category
            </div>
            <TextField
              id="query"
              disabled={!searchParams.category}
              fullWidth
              onKeyUp={(e) => {
                debouncedFunction(e.target.value);
              }}
              label="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchGroup;