import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./css/Team.css";
import db from "../firebase";

//-> component import
import Input from "../common/Input";
import Button from "../common/Button";
import {
  notifyDynamicError,
  notifyDynamicSuccess,
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

const Team = () => {
  const [teamInfo, setTeamInfo] = useState({});
  const [teamTraits, setTeamTraits] = useState([]);
  const [teamHeader, setTeamHeader] = useState("");
  const [teamIntro, setTeamIntro] = useState("");
  const [teamTrait, setTeamTrait] = useState("");
  const dispatch = useDispatch();
  const team = useSelector(selectTeam);
  const trait = useSelector(selectTeamTraits)

  useEffect(() => {
    const unsubscribe = db.collection("team").onSnapshot((snapshot) => {
      if (snapshot.size) {
        // we have something
        let teamData = {};
        snapshot.forEach((doc) => (teamData[doc.id] = doc.data()));
        setTeamInfo(teamData);
        dispatch(fetchTeamInfo({ teamData }));
        console.log("team info: ", teamData);
      } else {
        // it's empty
        notifyDynamicSuccess({ message: "Loading Team info" });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("teamTraits").onSnapshot((snapshot) => {
      if (snapshot.size) {
        // we have something
        let teamTraitsData = {};
        snapshot.forEach((doc) => (teamTraitsData[doc.id] = doc.data()));
        setTeamTraits(teamTraitsData);
        dispatch(fetchTeamTraits({ teamTraitsData }));
        console.log("team traits: ", teamTraitsData);
      } else {
        // it's empty
        notifyDynamicSuccess({ message: "Loading Team info" });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addTeamIntro = () => {
    db.collection("team")
      .doc("intro")
      .update({
        teamHeader: teamHeader,
        teamIntro: teamIntro,
      })
      .then((docRef) => {
        dispatch(
          saveTeamIntro({
            teamHeader: teamHeader,
            teamIntro: teamIntro,
          })
        );
        console.log("saved to db");
        notifyDynamicSuccess({ message: "Header and Intro updated" });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        notifyDynamicError({ message: "Oh No! Data not saved" });
      });
  };

  const addTeamTrait = (e) => {
    e.preventDefault();

    db.collection("teamTraits")
      .add({
        teamTrait: teamTrait,
      })
      .then((docRef) => {
        dispatch(
          saveTeamTrait({
            teamTrait: teamTrait,
          })
        );
        console.log("saved to db");
        notifyDynamicSuccess({ message: "Team Strength updated" });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        notifyDynamicError({ message: "Oh No! Data not saved" });
      });
  };
  return (
    <div className={"team_container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className={"career__box_fill"}>
            <Input
              value={teamHeader}
              onChange={(e) => setTeamHeader(e.target.value)}
              type="text"
              placeholder="your team page header intro"
            />
            <Input
              value={teamIntro}
              onChange={(e) => setTeamIntro(e.target.value)}
              type="text"
              placeholder="your team page header intro"
            />
            <Button type={"submit"} onClick={addTeamIntro} text={"update"} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {team.teamData ? (
            <div>
              <h4>Current data</h4>
              <p>Header: {team.teamData.intro.teamHeader}</p>
              <p>Introduction: {team.teamData.intro.teamIntro}</p>
            </div>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={"career__box_fill"}>
          <Input
            value={teamTrait}
            onChange={(e) => setTeamTrait(e.target.value)}
            type="text"
            placeholder="your team strength"
          />
          <Button type={"submit"} onClick={addTeamTrait} text={"update"} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        
      </Grid>
    </div>
  );
};

export default Team;
