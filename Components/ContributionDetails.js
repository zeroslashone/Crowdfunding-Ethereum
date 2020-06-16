import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ContributionDetails(props) {
  
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [campaignNumber, setcampaignNumber] = React.useState(0);
  const [userAddress, setUserAddress] = React.useState("");
  const [contributorDetailsAddress, setContributorDetailsAddress] = React.useState("")
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState("");
  const [dialog, setDialog] = React.useState(false);
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    try {
      if (campaignNumber !== -1 && userAddress !== "") {
        setLoading(true);
        const campaign = Campaign(props.campaigns[campaignNumber][0]);
        setUserDetails(
          await campaign.methods.contributorDetails(userAddress).call()
        );
        setOpen(false);
        setLoading(false);
        setDialog(true);
        setContributorDetailsAddress(userAddress)
        console.log(contributorDetailsAddress)
        setUserAddress("")
      } else {
        alert("Please Enter Valid Details");
      }
    } catch (err) {
      console.log(err);
      setOpen(false);
      setLoading(false);
    }
  };

  const dialogClose = () => {
    setDialog(false);
  };

  const DialogInfo = () => {
    if (parseInt(userDetails[1]) !== 0) {
      return (
        <DialogContent>
          <DialogContentText>
            Campaign Name: {props.campaigns[campaignNumber][1]}
          </DialogContentText>
          <DialogContentText>
            Contributors Address: {contributorDetailsAddress}
          </DialogContentText>
          <DialogContentText>
            Total Contributions: {web3.utils.fromWei(userDetails[0], "ether")}{" "}
            ETH
          </DialogContentText>
          <DialogContentText>
            Total Contributions Count: {userDetails[1]} times
          </DialogContentText>
          <DialogContentText>
            Thank you for your Contributions!!!!!
          </DialogContentText>
        </DialogContent>
      );
    } else {
      return (
        <Box paddingLeft={3}>
        <DialogContentText fullWidth >
          Looks like you haven't made any contributions so far!!! Do Consider
          contributing. Thank You!!!
        </DialogContentText>
        </Box>
      );
    }
  };

  return (
    <div>
      <Box ml={9} mt={10}>
        
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Check Contribution details
        </Button>
        
        <Dialog open={dialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Contribution Details</DialogTitle>
          <DialogInfo />
          <DialogActions>
            <Button onClick={dialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Contribution Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select the name and Enter your Address
            </DialogContentText>
            <InputLabel id="demo-simple-select-label">
              Campaign Name
            </InputLabel>
            <Select
              native
              onChange={(event) => setcampaignNumber(event.target.value)}
              labelId="demo-simple-select-label"
          id="demo-simple-select"
              fullWidth
            >
              <option aria-label="None" value={-1}>
                None
              </option>
              {props.campaigns.map((campaign, index) => {
                return (
                  <option key={index} value={index}>
                    {campaign[1]}
                  </option>
                );
              })}
            </Select>
            <TextField
              required
              autoComplete="off"
              margin="dense"
              id="contractName"
              label="Contributor's Address"
              type="text"
              onChange={(event) => setUserAddress(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSearch} color="primary">
              Search
            </Button>
          </DialogActions>
        </Dialog>
        
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      
      </Box>
    </div>
  );
}
