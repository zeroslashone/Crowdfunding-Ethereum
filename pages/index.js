import campaignGenerator from "../ethereum/campaignGenerator";
import React, { Component } from "react";
import web3 from "../ethereum/web3";
import NavBar from "../Components/NavBar";
import ImgMediaCard from "../Components/CampaignCards";
import AddCampaignButtons from "../Components/AddCampaignsButton";
import Grid from "@material-ui/core/Grid";
import CssBaseline from '@material-ui/core/CssBaseline'

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaignCount = await campaignGenerator.methods
      .listCampaigns()
      .call();
    const campaigns = await Promise.all(
      Array(parseInt(campaignCount))
        .fill()
        .map((element, index) => {
          return campaignGenerator.methods.campaignData(index).call();
        })
    );
    console.log(campaigns);
    return { campaigns };
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar />
        <Grid container>
          <Grid container xs={8}>
            {this.props.campaigns.map((campaign) => {
              return (
                <Grid item xs={6}>
                  <ImgMediaCard campaign={campaign} />
                </Grid>
              );
            })}
          </Grid>
          <Grid container xs={4}>
            <AddCampaignButtons />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CampaignIndex;
