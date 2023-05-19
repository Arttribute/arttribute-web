import React, { useEffect } from "react";
import { useRouter } from "next/router";
//import { ethers } from "ethers";
//import Web3Modal from "web3modal";
//import { Web3Storage } from "web3.storage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TransitionProps } from "@mui/material/transitions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

//import { ArttributeAddress } from "../../../config.js";
//import Arttribute from "../../../Arttribute.json";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ["Upload dataset", "Manage access", "Add details"];

interface Props {
  minimized: boolean;
}

export default function CreateCollection(props: Props) {
  const { minimized } = props;
  //const router = useRouter();
  //const storageToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  //const storage = new Web3Storage({ token: storageToken });

  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);
  const [next, setNext] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [headline, setHeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    if (activeStep === steps.length) {
      setFinish(true);
    }
  }, [activeStep]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setActiveStep(nextStep);
    setFinish(false);
  };

  async function processImageFiles() {
    let files = {
      datasetFile: "",
      metadataUrl: "",
    };

    if (!file || !image) {
      console.log("File or image is missing");
      return;
    }
  }

  async function CreateArtCollecion() {
    setLoading(true);
    //const web3Modal = new Web3Modal();
    //const connection = await web3Modal.connect();
    //const provider = new ethers.providers.Web3Provider(connection);
    //const signer = provider.getSigner();

    //const datasetFile = fileurl
    //const metadataUrl = fielurl

    //let contract = new ethers.Contract(
    //  FoliohouseAddress,
    //  Foliohouse.abi,
    //  signer
    //);

    //let creationAction = await contract.createDataset(
    //  124,
    //  name,
    //  datasetFile,
    //  metadataUrl,
    //  isPrivate
    //);

    //await creationAction.wait();
    //setLoading(false);
    //router.reload();
    //handleClose();
  }

  return (
    <div>
      <ListItemButton
        onClick={handleClickOpen}
        sx={{
          display: minimized ? "block" : "none",
          justifyContent: "center",
          px: 2.0,
        }}
      >
        <ListItemIcon
          sx={{
            color: "#2962ff",
            minWidth: 0,
            mr: "auto",
            justifyContent: "center",
          }}
        >
          <AddBoxIcon sx={{ fontSize: 32 }} />
        </ListItemIcon>
      </ListItemButton>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          m: 2,
          textTransform: "none",
          display: minimized ? "none" : "flex",
        }}
      >
        Create new collection
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: 600 }}
              variant="h5"
              component="div"
            >
              Create a new collection
            </Typography>
            <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {activeStep === 1 ? <div>Hello world</div> : null}
            {activeStep === 2 ? null : null}
            {activeStep === 3 ? null : null}
            <Grid container spacing={2}>
              <Grid item xs={activeStep === 1 ? 0 : 6}>
                {activeStep !== 1 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{ textTransform: "none", mt: 2 }}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : null}
              </Grid>
              <Grid item xs={activeStep === 1 ? 12 : 6}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ textTransform: "none", mt: 2 }}
                  //onClick={finish ? CreateDataset : handleNext}
                  disabled={!file || !name}
                >
                  {finish ? (
                    loading ? (
                      <CircularProgress size={25} sx={{ color: "#fff" }} />
                    ) : (
                      "Finish"
                    )
                  ) : (
                    "Next"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
