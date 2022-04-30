import React, { useEffect, useState } from "react";
import BanksList from "../components/BanksList";
import SearchGroup from "../components/SearchGroup";
import { Divider, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../components/Pagination";
import updateLoading from "../actionCreators/updateLoading";
import updateError from "../actionCreators/updateError";
import '../css/allBanks.css';

function AllBanks() {
  // load the banks from store into state
  const banks = useSelector((state) => state.allBanks);
  // get search params from the store
  const searchParams = useSelector((state) => state.searchParams);

  // used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage, setbanksPerPage] = useState(10);

  // to dispatch action in the redux store
  const dispatch = useDispatch();

  // method to be utilized by pagination component to manipulate cuurent page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // actual list of banks which will be rendered in the table
  const [filteredList, setfilteredList] = useState([]);

  // run effect to update the filteredList of banks whenever search query changes
  useEffect(() => {
    setfilteredList(banks);

    if (searchParams.query !== "") {
      dispatch(updateLoading(true));
      setfilteredList(
        banks.filter((bank) => {
          return bank[searchParams.category]
            .toLowerCase()
            .startsWith(searchParams.query.toLowerCase());
        })
      );

      if (filteredList.length === 0) {
        dispatch(updateError({ msg: "Not found" }));
      }
      dispatch(updateLoading(false));
    }
  }, [banks, searchParams.category, searchParams.query]);

  // used for logic of pagination
  let indexOfLastBank = currentPage * banksPerPage;
  let indexOfFirstBank = indexOfLastBank - banksPerPage;
  let currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);

  // effect to change number of rows when user changes its value from select dropdown
  useEffect(() => {
    indexOfLastBank = currentPage * banksPerPage;
    indexOfFirstBank = indexOfLastBank - banksPerPage;
    currentBank = filteredList.slice(indexOfFirstBank, indexOfLastBank);
  }, [banksPerPage]);

  return (
    <>
      <h1 className="main_heading shadow">All Banks</h1>
      <Divider />
      <SearchGroup />
      <Typography className="main_heading" variant="h6" color="secondary" style={{ margin: "30px 0 0 0" , textDecoration: 'underline'}}>
        List Of Banks(
        <span style={{ color: "#ff004c", fontSize: "17px"}}>
          {filteredList.length}
        </span>
        )
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
        }}
      >
        <div style={{marginBottom: '20px'}}>
          Rows per page:
          <select
            value={banksPerPage}
            onChange={(e) => {
              setbanksPerPage(e.target.value);
            }}
            onBlur={(e) => {
              setbanksPerPage(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </select>{" "}
        </div>
      </div>
      <BanksList bankList={currentBank} />

      <PaginationComponent
        banksPerPage={banksPerPage}
        totalBanks={filteredList.length}
        paginate={paginate}
      />
    </>
  );
}

export default AllBanks;
