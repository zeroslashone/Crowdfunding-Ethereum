import campaignGenerator from '../ethereum/campaignGenerator'
import React, { Component } from 'react'
import web3 from '../ethereum/web3'
import NavBar from '../Components/NavBar'
import ImgMediaCard from '../Components/CampaignCards'
import AddCampaignButtons from '../Components/AddCampaignsButton'
import Grid from "@material-ui/core/Grid"


class CampaignIndex extends Component {
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    const campaigns = await campaignGenerator.methods.listCampaigns().call({from: accounts[0]})
    return { campaigns, accounts }
  }
  render() {
    return (
      <div>
      <NavBar />
      <Grid
      container
      direction="row"
      >
      <Grid item xs = {12} sm = {8}>]
        <ImgMediaCard />
      </Grid>
      <Grid item xs= {12} sm = {4} >
        <AddCampaignButtons />
      </Grid>
      </Grid>
      </div>
    )
  }
}



export default CampaignIndex
