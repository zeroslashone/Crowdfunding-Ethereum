import campaignGenerator from "../ethereum/campaignGenerator";
import React, { Component } from "react";
import web3 from "../ethereum/web3";
import NavBar from "../Components/NavBar";
import ImgMediaCard from "../Components/CampaignCards";
import AddCampaignButtons from "../Components/AddCampaignsButton";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import ContributionDetails from "../Components/ContributionDetails"
import Campaign from "../ethereum/campaign"
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
        }))

      const campaignStatus = await Promise.all(
        campaigns.map((campaign, index) => {
          return Campaign(campaign[0]).methods.completed().call()
        })
    );
    return { campaigns, campaignStatus };
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar />
        <Grid container>
          <Grid container xs={8}>
            {this.props.campaigns.map((campaign, index) => {
              return (
                <Grid key={index} item xs={6}>
                  <ImgMediaCard campaign={campaign} campaignStatus={this.props.campaignStatus[index]}/>
                </Grid>
              );
            })}
          </Grid>
          <Grid container xs={4} direction = "column" spacing = {4}>
            <AddCampaignButtons />
            <ContributionDetails campaigns = {this.props.campaigns}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CampaignIndex;
