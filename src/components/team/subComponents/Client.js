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

const Client = ({ clientLogo, clientName, clientLogoID, clientID }) => {
  const classes = useStyles();
  const deleteClient = (clientID) => {
    if (clientID && clientLogoID) {
      db.collection("team")
        .doc("clients")
        .collection("all")
        .doc(clientID)
        .delete()
        .then(() => {
          firebase
            .storage()
            .ref(`clientsLogos/${clientLogoID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Client deleted successfully",
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
          onClick={() => deleteClient(clientID)}
        />
      </div>
      <div>
        <div>
          <Avatar src={clientLogo} className={classes.large} />
        </div>
        <div>
          <p>
            <span id={"label"}>Name:</span> {clientName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Client;
