import React from "react";
import db from "../../firebase";

import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const Trait = ({ traitID, trait, section }) => {
  const deleteTrait = (traitID) => {
    if (traitID) {
      db.collection("development")
        .doc("devSections")
        .collection(`${section}`)
        .doc("traits")
        .collection("all")
        .doc(traitID)
        .delete()
        .then(() => {
          notifyDynamicSuccess({
            message: "Trait deleted successfully",
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
          onClick={() => deleteTrait(traitID)}
        />
      </div>
      <div>
        <p>
          <span id={"label"}>Trait:</span> {trait}
        </p>
      </div>
    </div>
  );
};

export default Trait;
