import React from "react";
import db from "../../firebase";
import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { TiTimes } from "react-icons/ti";

const Trait = ({ teamTrait, traitId }) => {
  const deleteTrait = (traitId) => {
    if (traitId) {
      db.collection("team")
        .doc("teamTraits")
        .collection("all")
        .doc(traitId)
        .delete()
        .then(() => {
          notifyDynamicSuccess({ message: "Trait cleared successfully" });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };
  return (
    <div className={"trait_container"}>
      <p><span id={"label"}>Trait:</span> {teamTrait}</p>
      <TiTimes
        size={"1.5rem"}
        className={"clear__icon"}
        onClick={() => deleteTrait(traitId)}
      />
    </div>
  );
};

export default Trait;
