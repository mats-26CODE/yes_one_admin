import React from "react";
import db from "../../firebase";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Brain = ({
  brainName,
  brainTitle,
  brainImage,
  brainId,
  brainImageID,
}) => {
  const classes = useStyles();
  const deleteBrain = (brainId) => {
    if (brainId && brainImageID) {
      db.collection("team")
        .doc("teamBrains")
        .collection("all")
        .doc(brainId)
        .delete()
        .then(() => {
          firebase
            .storage()
            .ref(`teamBrainsImages/${brainImageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Team brain deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };
  return (
    <div className={"brain_behind_container"}>
      <div>
        <GiTrashCan
          size={"1.5rem"}
          className={"trash__icon"}
          onClick={() => deleteBrain(brainId)}
        />
      </div>
      <div>
        <div>
          <Avatar src={brainImage} className={classes.large} />
        </div>
        <div>
          <p>
            <span id={"label"}>Name:</span> {brainName}
          </p>
          <p>
            <span id={"label"}>Title:</span> {brainTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brain;
