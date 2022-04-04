import React from "react";
import db from "../../firebase";
import firebase from "firebase";

import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const Product = ({ homeProductID, homeProduct }) => {
  const deleteProduct = (homeProductID) => {
    if (homeProductID) {
      db.collection("home")
        .doc("homeIntro")
        .collection("homeProducts")
        .doc(homeProductID)
        .delete()
        .then(() => {
          notifyDynamicSuccess({
            message: "Product deleted successfully",
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
          onClick={() => deleteProduct(homeProductID)}
        />
      </div>
      <div>
        <p>
          <span id={"label"}>Product:</span> {homeProduct}
        </p>
      </div>
    </div>
  );
};

export default Product;
