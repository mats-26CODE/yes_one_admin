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

  const dispatch = useDispatch();
  // const team = useSelector(selectTeam);
  // const trait = useSelector(selectTeamTraits)

  //-> handling brain image input
  // Handle file picker changes
  const handleBrainImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e+6) {
      setBrainImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setBrainImage(e.target.files[0]);
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
          notifyDynamicError({message: error})
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
              notifyDynamicSuccess({ message: 'Team member successfully saved'});
            });
        }
      );
    } else {
      notifyDynamicError({
        message: "Fill all member fields and choose a cool member image",
      });
    }
  };

  return (
    <div className={"team_container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
          <div>{/* display team and header details here */}</div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
              {progress ? (
                <div className={"upload__progress_bar"}>
                  <progress value={progress} max="100" />
                </div>
              ) : (
                <Button type={"submit"} text={"Save"} onClick={saveTeamBrain} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
      </Grid>
    </div>
  );
};

export default Team;
