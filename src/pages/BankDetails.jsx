import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Paper,
  Divider,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import '../css/allBanks.css';

function BankDetails() {
  // get ID of bank from the URL
  const { id } = useParams();

  // banks currently in store
  const banks = useSelector((state) => state.allBanks);
 
  // banks marked as favorites
  const favorites = useSelector((state) => state.favorites);
 
  // bankdetails to be displayed
  const [bankDetails, setbankDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
      // first look in cuurent banks if the desired bank is present
      const newBank = banks.find((bank) => bank.ifsc === id) ;
      setbankDetails(newBank);

    // if the bank is not present in current bank in store
    // that means
    // this is a favorite bankv
    if (bankDetails === null) {
      const newFavorite = favorites.find((bank) => bank.ifsc === id);
      setbankDetails(newFavorite);
    }
  }, [bankDetails, banks, favorites, id]);

  return (
    <>
      <h1 className="main_heading">Bank Details</h1>
      <Divider style={{ marginBottom: "40px" }} />
      <Button
        startIcon={<ArrowBack />}
        style={{ marginBottom: "20px" }}
        color="secondary"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </Button>
      <Paper>
        <div className="paperData">
          <Typography variant="subtitle1">
            <Grid container spacing={2}>
              {bankDetails ? (
                <>
                  <Grid item xs={12}>
                    <b>Bank Name:</b> {bankDetails["bank_name"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>IFSC code:</b> {bankDetails["ifsc"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>Bank ID:</b> {bankDetails["bank_id"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>Branch:</b> {bankDetails["branch"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>City:</b> {bankDetails["city"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>District:</b> {bankDetails["district"]}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <b>State:</b> {bankDetails["state"]}
                  </Grid>
                  <Grid item xs={12}>
                    <b>Address:</b> {bankDetails["address"]}
                  </Grid>
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default BankDetails;