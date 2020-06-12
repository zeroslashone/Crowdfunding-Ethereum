import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import campaignGenerator from "../ethereum/campaignGenerator";
import web3 from "../ethereum/web3";

export default function FormDialog(props) {
  let createContract;
  const [open, setOpen] = React.useState(false);
  const [minimumContribution, setminimumContribution] = React.useState(0);
  const [name, setName] = React.useState("")
  
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    try {
      if(minimumContribution!==0 && name!==""){
        const accounts = await web3.eth.getAccounts();
        createContract = await campaignGenerator.methods
          .createCampaign(web3.utils.toWei(minimumContribution, "ether"),JSON.stringify(name))
          .send({ from: accounts[0] });
        alert(` Congrats new campaign successfully created at ${createContract.events.newCampaign.returnValues[0]}`)
      }
    } catch (err) {
      if(err.message!== 'Please pass numbers as strings or BN objects to avoid precision errors.')
        alert(err.message)
    }
  };

  return (
    <div>
      <Box ml={10} mt={15}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create New Campaign
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for the Campaign and minimum amount of contributions that is required to be made
            for this campaign
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="contractName"
            label="Campaign Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            placeholder= "Contribution value(in Ethers)"
            margin="dense"
            id="contributionAmount"
            label="Ether"
            type="text"
            onChange={(event) => setminimumContribution(event.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
