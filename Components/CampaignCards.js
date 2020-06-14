import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Campaign from "../ethereum/campaign";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import web3 from "../ethereum/web3";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FinalizeCampaign from "./FinalizeCampaign"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ImgMediaCard(props) {
  const [open, setOpen] = React.useState(false);
  const [contributionAmount, setContributionAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [campaignMinimum, setCampaignMinimum] = React.useState("");
  const [campaignManager, setCampaignManager] = React.useState("");
  const [campaignBalance, setCampaignBalance] = React.useState("")
  const [campaignTarget, setCampaignTarget] = React.useState("")
  const classes = useStyles();

  const handleClose = async (campaignAddress) => {
    if (campaignAddress !== undefined && contributionAmount !== "") {
      const campaign = Campaign(campaignAddress);
      const minimumContribution = await campaign.methods
        .campaignMinimum()
        .call();
      if (
        parseInt(web3.utils.toWei(contributionAmount, "ether")) <
        parseInt(minimumContribution)
      ) {
        alert(
          `contribution amount too low. minimum: ${web3.utils.fromWei(
            minimumContribution,
            "ether"
          )} eth`
        );
      } else {
        const manager = await campaign.methods.manager().call();
        if (manager.toLowerCase() === window.ethereum.selectedAddress)
          alert(
            "The manager of the contract is not allowed to Contribute to his own fund"
          );
        else {
          setOpen(false);
          setLoading(true);
          try {
            await campaign.methods.contribute().send({
              value: web3.utils.toWei(contributionAmount, "ether"),
              from: window.ethereum.selectedAddress,
            });
            setLoading(false);
            alert("You have successfully contributed to this campaign");
          } catch (err) {
            setLoading(false);
            alert(err.message);
          }
        }
      }
    }
  };

  const dialogOpen = async () => {
    setLoading(true);
    try {
      const campaign = Campaign(props.campaign[0]);
      setCampaignBalance(web3.utils.fromWei(await web3.eth.getBalance(props.campaign[0]),'ether'))
      setCampaignManager(await campaign.methods.manager().call());
      setCampaignTarget(web3.utils.fromWei(await campaign.methods.target().call(),'ether'));
      setCampaignMinimum(
        web3.utils.fromWei(
          await campaign.methods.campaignMinimum().call(),
          "ether"
        )
      );
      setLoading(false);
      setDialog(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setDialog(true);
    }
  };

  const dialogClose = () => {
    console.log(dialog);
    setDialog(false);
    console.log(dialog);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box mt={5} ml={5}>
      <Card className={classes.root} raised>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.campaign[1]}
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              noWrap
            >
              Contract Adress: {props.campaign[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="primary" onClick={handleClick} disabled={props.campaignStatus}>
        Contribute
      </Button>
      <FinalizeCampaign campaignAddress={props.campaign[0]} disabled={props.campaignStatus}/>
      <Button size="small" onClick={dialogOpen} color="primary" disabled={props.campaignStatus}>
        View
      </Button>
          <Dialog open={dialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Campaign Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Campaign Name: {props.campaign[1]}
              </DialogContentText>
              <DialogContentText>
                Campaign Address: {props.campaign[0]}
              </DialogContentText>
              <DialogContentText>
                Campaign Manager Address: {campaignManager}
              </DialogContentText>
              <DialogContentText>
                Total Amount Raised So Far: {campaignBalance} ETH
              </DialogContentText>
              <DialogContentText>
                Campaign Target: {campaignTarget} ETH
              </DialogContentText>
              <DialogContentText>
                Campaign Minimum: {campaignMinimum} ETH
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={dialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Contribute</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter a Contribution Amount</DialogContentText>
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                id="name"
                label="Amount"
                type="text"
                fullWidth
                placeholder="Amount(in ethers)"
                onChange={(event) => setContributionAmount(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleClose(props.campaign[0])}
                color="primary"
              >
                Contribute
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
