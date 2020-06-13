import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import campaignGenerator from "../ethereum/campaignGenerator";
import web3 from "../ethereum/web3";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



export default function FormDialog(props) {
  let createContract;
  const [open, setOpen] = React.useState(false);
  const [minimumContribution, setminimumContribution] = React.useState(0);
  const [name, setName] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const classes = useStyles();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  }

  const handleClose = async () => {
    try {
      console.log(minimumContribution)
      if(minimumContribution!==0 && name!==""){
        setOpen(false);
        setLoading(true);
        const accounts = await web3.eth.getAccounts();
        createContract = await campaignGenerator.methods
          .createCampaign(web3.utils.toWei(minimumContribution, "ether"),name)
          .send({ from: accounts[0] });
        setLoading(false);
        alert(` Congrats new campaign successfully created at ${createContract.events.newCampaign.returnValues[0]}`)
      }
    } catch (err) {
      setLoading(false);
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
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
