import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Storage } from "web3.storage";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import { ArttributeAddress } from "../../../config.js";
import ArtAttribution from "../../../ArtAttribution.json";

interface Props {
  id: number;
  price: number;
  collectionName: string;
  featuredImage: string;
}
export default function AttributeArt(props: Props) {
  const router = useRouter();
  const { id, price, collectionName, featuredImage } = props;

  const storageToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWIyOTRhMTQ1RThENkU0ZDFCNmNlRTcwODAxZGNDMTkyOWQ5NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc5Mzg1Mjg3MTQsIm5hbWUiOiJGb2xpb2hvdXNlIn0.2mttZrpJ6UBXcJwqr28iUb1rV8cqR5Y0MuxhZp-h9n4";

  const storage = new Web3Storage({ token: storageToken });

  const [open, setOpen] = React.useState(false);
  const [priceToPay, setPriceToPay] = React.useState<number>(price);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setPriceToPay(NaN);
    } else {
      const parsedNumber = parseFloat(inputValue);
      if (!isNaN(parsedNumber)) {
        setPriceToPay(parsedNumber);
      }
    }
  };

  const handleAttribution = async () => {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      ArttributeAddress,
      ArtAttribution.abi,
      signer
    );
    try {
      const metadata = JSON.stringify({
        ownerName: name,
        collectionName: collectionName,
        contribution: priceToPay,
        featuredImage: featuredImage,
      });
      const datablob = new Blob([metadata], { type: "application/json" });
      const metadataFile = new File([datablob], "metadata.json");
      const resData = await storage.put([metadataFile]);
      const metadataUrl = `https://${resData.toString()}.ipfs.dweb.link/metadata.json`;
      let attributionAction = await contract.attributeCollection(
        id,
        metadataUrl,
        { value: ethers.utils.parseEther(priceToPay.toString()) }
      );
      await attributionAction.wait();
      setLoading(false);
      router.push("/certificates");
      handleClose();
    } catch (error) {
      console.log("Error uploading content: ", error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AutoAwesomeOutlinedIcon />}
        onClick={handleClickOpen}
        sx={{ textTransform: "none", mt: 2 }}
      >
        Use and Attribute Art
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Use and attribute art Collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount to pay"
            type="number"
            fullWidth
            variant="outlined"
            placeholder={`${price} +`}
            value={priceToPay}
            onChange={handlePriceChange}
            helperText={`Contributing at least ${price} +`}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Group or individual name"
            value={name}
            helperText="This is the name that will be displayed on your attribution certificate as proof of attribution."
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ textTransform: "none", mt: 2 }}
            onClick={handleAttribution}
          >
            {loading ? (
              <CircularProgress size={25} sx={{ color: "#fff" }} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
