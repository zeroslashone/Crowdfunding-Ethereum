import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Campaign from "../ethereum/campaign"
import {makeStyles} from "@material-ui/core/styles"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import web3 from "../ethereum/web3"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function FinalizeCampaign(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  
  const handleClickOpen = async () => {
    const campaign = Campaign(props.campaignAddress)
    const manager = await campaign.methods.manager().call()
    const target = Number(web3.utils.fromWei(await campaign.methods.target().call(), 'ether'))
    const campaignBalance = Number(web3.utils.fromWei(await web3.eth.getBalance(props.campaignAddress)))
    if(campaignBalance <= target/2) {
      alert('You have not yet met the Campaign target criteria!!!')
    } else if(manager.toLowerCase() === window.ethereum.selectedAddress) {
      setOpen(true);
      setLoading(false);
    } else {
      alert("You are not authorized to make this call");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setOpen(false)
    setLoading(true)
    try {
      const campaign = Campaign(props.campaignAddress)
      await campaign.methods.transferFunds().send({
        from: window.ethereum.selectedAddress
      })
      setLoading(false)
      alert("This campaign has successfully ended!")
      location.reload();
    } catch(err) {
      setLoading(false)
      alert(err)
    }
  }


  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen} disabled = {props.disabled}>
        Transfer Funds
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Transfer Funds"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You sure you want to end this campaign and transfer all the funds to the recipient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={onSubmit} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
