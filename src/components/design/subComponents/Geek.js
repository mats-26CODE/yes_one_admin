import React from "react";
import db from "../../firebase";

import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const Geek = ({ designGeekID, designGeekHeader, designGeekInfo }) => {
  const deleteGeek = (designGeekID) => {
    if (designGeekID) {
      db.collection("design")
        .doc("designGeeks")
        .collection("cards")
        .doc(designGeekID)
        .delete()
        .then(() => {
          notifyDynamicSuccess({
            message: "Characteristic deleted successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };
  return (
    <div className={"design__detail_container"}>
      <div>
        <GiTrashCan
          size={"1.5rem"}
          className={"trash__icon"}
          onClick={() => deleteGeek(designGeekID)}
        />
      </div>
      <div>
        <p>
          <span id={"label"}>Characteristic header:</span> {designGeekHeader}
        </p>
        <p>
          <span id={"label"}>Characteristic description:</span> {designGeekInfo}
        </p>
      </div>
    </div>
  );
};

export default Geek;
