import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./css/Team.css";
import db from "../firebase";
import { storage } from "../firebase";

//-> component import
import Input from "../common/Input";
import Button from "../common/Button";
import {
  notifyDynamicError,
  notifyDynamicSuccess,
  notifyError,
} from "../notifications/NotificationAlerts";

//-> redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  saveTeamIntro,
  fetchTeamInfo,
  selectTeam,
  saveTeamTrait,
  fetchTeamTraits,
  selectTeamTraits,
} from "../../features/teamSlice";
import FormInput from "../common/FormInput";

const Team = () => {
  const [teamHeader, setTeamHeader] = useState("");
  const [teamIntro, setTeamIntro] = useState("");
  const [brainName, setBrainName] = useState("");
  const [brainTitle, setBrainTitle] = useState("");
  const [brainImage, setBrainImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [teamTrait, setTeamTrait] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientLogo, setClientLogo] = useState("");
  const [clientTreat, setClientTreat] = useState("");

  const dispatch = useDispatch();
  // const team = useSelector(selectTeam);
  // const trait = useSelector(selectTeamTraits)

  //-> handling brain image input
  // Handle file picker changes
  const handleBrainImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setBrainImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setBrainImage(e.target.files[0]);
    }
  };
  //-> handling client logo input
  const handleClientLogo = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setClientLogo(null);
      notifyDynamicError({ message: "Logo selected should not exceed 3MB" });
    } else {
      setClientLogo(e.target.files[0]);
    }
  };

  const saveTeamHeader = (e) => {
    e.preventDefault();

    if (teamHeader) {
      db.collection("team")
        .doc("teamHeaderIntro")
        .collection("info")
        .doc("teamHeader")
        .update({
          teamHeader: teamHeader,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Team page header updated successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill in the Team Page header" });
    }
    setTeamHeader("");
  };

  const saveTeamIntro = (e) => {
    e.preventDefault();
    if (teamIntro) {
      db.collection("team")
        .doc("teamHeaderIntro")
        .collection("info")
        .doc("teamIntro")
        .set({
          teamIntro: teamIntro,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Team page intro updated successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill in the Team Page intro" });
    }
    setTeamIntro("");
  };

  const saveTeamBrain = (e) => {
    e.preventDefault();

    if (brainImage && brainTitle && brainImage) {
      const uploadTask = storage
        .ref(`teamBrainsImages/${brainImage.name}`)
        .put(brainImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("teamBrainsImages")
            .child(brainImage.name)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("team").doc("teamBrains").collection("all").add({
                brainName: brainName,
                brainTitle: brainTitle,
                brainImage: url,
              });
              setProgress(0);
              setBrainImage(null);
              setBrainName("");
              setBrainTitle("");
              notifyDynamicSuccess({
                message: "Team member successfully saved",
              });
            });
        }
      );
    } else {
      notifyDynamicError({
        message: "Fill all member fields and choose a cool member image",
      });
    }
  };

  const saveTeamTrait = (e) => {
    e.preventDefault();

    if (teamTrait) {
      db.collection("team")
        .doc("teamTraits")
        .collection("all")
        .add({
          teamTrait: teamTrait,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Team trait successfully added",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
      setTeamTrait("");
    } else {
      notifyDynamicError({ message: "Oh No, fill in your team trait first" });
    }
  };

  const saveClient = (e) => {
    e.preventDefault();

    if (clientName && clientLogo) {
      const uploadTask = storage
        .ref(`clientsLogos/${clientLogo.name}`)
        .put(clientLogo);

      //-> This code gets you the progress of the logo upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("clientsLogos")
            .child(clientLogo.name)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("team").doc("clients").collection("all").add({
                clientName: clientName,
                clientLogo: url,
              });
              setProgress(0);
              setClientLogo(null);
              setClientName("");
              notifyDynamicSuccess({
                message: "Client successfully saved",
              });
            });
        }
      );
    } else {
      notifyDynamicError({
        message: "Fill all client's fields and choose the best quality logo",
      });
    }
  };

  const saveClientTreat = (e) => {
    e.preventDefault();

    if (clientTreat) {
      db.collection("team")
        .doc("clients")
        .collection("clientsTreat")
        .doc("info")
        .set({
          clientTreat: clientTreat,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Client treat updated successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Oh No, fill the client treat first" });
    }
  };

  return (
    <div className={"team_container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page header and intro ]</h4>
          <div className={"team__box_fill"}>
            <div>
              <FormInput
                type={"text"}
                placeholder={"Enter team page header"}
                value={teamHeader}
                onChange={(e) => setTeamHeader(e.target.value)}
                onClick={saveTeamHeader}
                buttonType={"submit"}
                buttonText={"Update"}
              />
            </div>

            <div>
              <FormInput
                type={"text"}
                placeholder={"Enter team page intro"}
                value={teamIntro}
                onChange={(e) => setTeamIntro(e.target.value)}
                onClick={saveTeamIntro}
                buttonType={"submit"}
                buttonText={"Update"}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 id={"sectionHeader"}>[ Page header and intro details ]</h4>
          <div>{/* display team and header details here */}</div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ The brains behind ]</h4>
          <div className={"team__box_fill"}>
            <form type={"submit"}>
              <Input
                type={"text"}
                placeholder={"Enter team member name"}
                value={brainName}
                onChange={(e) => setBrainName(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter team member title"}
                value={brainTitle}
                onChange={(e) => setBrainTitle(e.target.value)}
              />
              <Input
                type={"file"}
                placeholder={"Enter team member image"}
                onChange={handleBrainImage}
                accept={"image/*"}
              />
              {progress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={progress} max="100" />
                </div>
              ) : (
                <Button type={"submit"} text={"Save"} onClick={saveTeamBrain} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 id={"sectionHeader"}>[ The brains behind details ]</h4>
          {/* Display all team members here */}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Team traits / characteristics ]</h4>
          <div className={"team__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter team trait"}
              value={teamTrait}
              onChange={(e) => setTeamTrait(e.target.value)}
              onClick={saveTeamTrait}
              buttonType={"submit"}
              buttonText={"Add"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 id={"sectionHeader"}>
            [ Team traits / characteristics details ]
          </h4>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Clients area ]</h4>
          <div className={"team__box_fill"}>
            <form type={"submit"}>
              <Input
                type={"text"}
                placeholder={"Enter client's name"}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <Input
                type={"file"}
                placeholder={"Enter client's logo"}
                onChange={handleClientLogo}
                accept={"image/*"}
              />
              {progress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={progress} max="100" />
                </div>
              ) : (
                <Button type={"submit"} text={"Save"} onClick={saveClient} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 id={"sectionHeader"}>[ Clients area details ]</h4>
          <div>{/* display clients here */}</div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Client's treat ]</h4>
          <div className={"team__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter client treat"}
              value={clientTreat}
              onChange={(e) => setClientTreat(e.target.value)}
              onClick={saveClientTreat}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h4 id={"sectionHeader"}>[ Client's treat details ]</h4>
          <div>{/* display client treat here */}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Team;
