import React from "react";
import db from "../../firebase";
import firebase from "firebase";

import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const DesignImage = ({ designID, designImage, designImageID }) => {
  const deleteDesign = () => {
    if (designID && designImageID) {
      db.collection("design")
        .doc("designs")
        .collection("images")
        .doc(designID)
        .delete()
        .then(() => {
          firebase
            .storage()
            .ref(`designImages/${designImageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Design deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };
  return (
    <div className={"design__image_container"}>
      <div>
        <GiTrashCan
          size={"1.5rem"}
          className={"trash__icon"}
          onClick={() => deleteDesign(designID)}
        />
      </div>
      <div className={"design__image"}>
        <img src={designImage} alt={"project pic"} />
      </div>
    </div>
  );
};

export default DesignImage;
