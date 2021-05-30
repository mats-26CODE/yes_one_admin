import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./css/Team.css";
import db from "../firebase";
import { storage } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

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
import Brain from "./subComponents/Brain";
import PulseSpinner from "../common/PulseSpinner";
import Trait from "./subComponents/Trait";
import Client from "./subComponents/Client";

const Team = () => {
  const [teamHeader, setTeamHeader] = useState("");
  const [teamIntro, setTeamIntro] = useState("");
  const [brainName, setBrainName] = useState("");
  const [brainTitle, setBrainTitle] = useState("");
  const [brainImage, setBrainImage] = useState(null);
  const [brainProgress, setBrainProgress] = useState(0);
  const [clientProgress, setClientProgress] = useState(0);
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
      const brainImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`teamBrainsImages/${brainImageID}`)
        .put(brainImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const brainProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setBrainProgress(brainProgress);
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
            .child(brainImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("team").doc("teamBrains").collection("all").add({
                brainName: brainName,
                brainTitle: brainTitle,
                brainImage: url,
                brainImageID: brainImageID,
              });
              setBrainProgress(0);
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
      const clientLogoID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`clientsLogos/${clientLogoID}`)
        .put(clientLogo);

      //-> This code gets you the progress of the logo upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const clientProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setClientProgress(clientProgress);
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
            .child(clientLogoID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("team").doc("clients").collection("all").add({
                clientName: clientName,
                clientLogo: url,
                clientLogoID: clientLogoID,
              });
              setClientProgress(0);
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

  //-> retrieve data from firestore database using firebase hooks
  const [headerDetails] = useDocument(
    db
      .collection("team")
      .doc("teamHeaderIntro")
      .collection("info")
      .doc("teamHeader")
  );
  const [introDetails] = useDocument(
    db
      .collection("team")
      .doc("teamHeaderIntro")
      .collection("info")
      .doc("teamIntro")
  );
  const [teamBrains] = useCollection(
    db.collection("team").doc("teamBrains").collection("all")
  );
  const [teamTraitsDetails] = useCollection(
    db.collection("team").doc("teamTraits").collection("all")
  );
  const [clientsDetails] = useCollection(
    db.collection("team").doc("clients").collection("all")
  );
  const [clientTreatDetails] = useDocument(
    db.collection("team").doc("clients").collection("clientsTreat").doc("info")
  );

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
          <h4 id={"sectionHeaderDetails"}>[ Page header and intro details ]</h4>
          <div className={"header__intro_box"}>
            {/* display team and header details here */}
            <h4>
              <span id={"label"}>Current header set:</span>{" "}
              {headerDetails?.data().teamHeader ? (
                headerDetails?.data().teamHeader
              ) : (
                <PulseSpinner />
              )}
            </h4>
            <h4>
              <span id={"label"}>Current intro set:</span>{" "}
              {introDetails?.data().teamIntro ? (
                introDetails?.data().teamIntro
              ) : (
                <PulseSpinner />
              )}
            </h4>
          </div>
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
              {brainProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={brainProgress} max="100" />
                </div>
              ) : (
                <Button type={"submit"} text={"Save"} onClick={saveTeamBrain} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>[ The brains behind details ]</h4>
          {/* Display all team members here */}
          <div className={"team__brains"}>
            {teamBrains?.docs ? (
              teamBrains?.docs.map((doc) => {
                const { brainName, brainTitle, brainImage, brainImageID } =
                  doc.data();

                return (
                  <Brain
                    key={doc.id}
                    brainId={doc.id}
                    brainName={brainName}
                    brainTitle={brainTitle}
                    brainImage={brainImage}
                    brainImageID={brainImageID}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
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
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>
            [ Team traits / characteristics details ]
          </h4>
          <div className={"team__brains"}>
            {teamTraitsDetails?.docs ? (
              teamTraitsDetails.docs.map((doc) => {
                const { teamTrait } = doc.data();
                return (
                  <Trait key={doc.id} traitId={doc.id} teamTrait={teamTrait} />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
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
              {clientProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={clientProgress} max="100" />
                </div>
              ) : (
                <Button type={"submit"} text={"Save"} onClick={saveClient} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>[ Clients area details ]</h4>
          <div className={"team__brains"}>
            {/* display clients here */}
            {clientsDetails?.docs ? (
              clientsDetails?.docs.map((doc) => {
                const { clientLogo, clientName, clientLogoID } = doc.data();

                return (
                  <Client
                    key={doc.id}
                    clientID={doc.id}
                    clientLogo={clientLogo}
                    clientName={clientName}
                    clientLogoID={clientLogoID}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
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
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>[ Client's treat details ]</h4>
          <div className={"header__intro_box"}>
            {/* display client treat here */}
            <h4>
              <span id={"label"}>Our treat:</span>{" "}
              {clientTreatDetails?.data().clientTreat ? (
                clientTreatDetails?.data().clientTreat
              ) : (
                <PulseSpinner />
              )}
            </h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Team;
