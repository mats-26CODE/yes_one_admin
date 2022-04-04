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

const Card = ({
  cardID,
  cardHeader,
  cardFeatureOne,
  cardFeatureTwo,
  cardFeatureThree,
  cardFeatureFour,
  cardImage,
  cardImageID,
}) => {
  const classes = useStyles();
  const deleteCard = (cardID) => {
    if (cardID && cardImageID) {
      db.collection("home")
        .doc("homeCards")
        .collection("all")
        .doc(cardID)
        .delete()
        .then(() => {
          firebase
            .storage()
            .ref(`homeCardsImages/${cardImageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Card deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };
  return (
    <div className={"products__detail_container"}>
      <div>
        <GiTrashCan
          size={"1.5rem"}
          className={"trash__icon"}
          onClick={() => deleteCard(cardID)}
        />
      </div>
      <div>
        <div>
          <Avatar src={cardImage} className={classes.large} />
        </div>
        <div>
          <p>
            <span id={"label"}>Header:</span> {cardHeader}
          </p>
          <p>
            <span id={"label"}>Feature One:</span> {cardFeatureOne}
          </p>
          <p>
            <span id={"label"}>Feature Two:</span> {cardFeatureTwo}
          </p>
          <p>
            <span id={"label"}>Feature Three:</span> {cardFeatureThree}
          </p>
          <p>
            <span id={"label"}>Feature Four:</span> {cardFeatureFour}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
