import React from "react";
import db from "../../firebase";

import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const ProductCircle = ({
  productCircleID,
  productCircleOne,
  productCircleTwo,
}) => {
  const deleteProductCircle = (productCircleID) => {
    if (productCircleID) {
      db.collection("design")
        .doc("designProductCircle")
        .collection("cards")
        .doc(productCircleID)
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
          onClick={() => deleteProductCircle(productCircleID)}
        />
      </div>
      <div>
        <p>
          <span id={"label"}>Characteristic header:</span> {productCircleOne}
        </p>
        <p>
          <span id={"label"}>Characteristic description:</span>{" "}
          {productCircleTwo}
        </p>
      </div>
    </div>
  );
};

export default ProductCircle;
