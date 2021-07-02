import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

//->component imports
import Input from "../common/Input";
import Button from "../common/Button";
import {
  notifyDynamicSuccess,
  notifyDynamicError,
  notifyingLoading,
} from "../notifications/NotificationAlerts";
import FormInput from "../common/FormInput";
import PulseSpinner from "../common/PulseSpinner";
import "./css/Design.css";

//-> react icon imports
import { GiTrashCan } from "react-icons/gi";
import Geek from "./subComponents/Geek";
import ProductCircle from "./subComponents/ProductCircle";
import DesignImage from "./subComponents/DesignImage";

const Design = () => {
  const [designHeader, setDesignHeader] = useState("");
  const [designIntro, setDesignIntro] = useState("");
  const [designGeekHeader, setDesignGeekHeader] = useState("");
  const [designGeekInfo, setDesignGeekInfo] = useState("");
  const [designGeekImage, setDesignGeekImage] = useState(null);
  const [geekProgress, setGeekProgress] = useState(0);

  const [designImage, setDesignImage] = useState(null);
  const [designProgress, setDesignProgress] = useState(0);

  const [designProducts, setDesignProducts] = useState("");
  const [productCircleOne, setProductCircleOne] = useState("");
  const [productCircleTwo, setProductCircleTwo] = useState("");

  const [loading, setLoading] = useState(false);

  const buttonLoading = () => {
    if (loading) {
      notifyingLoading({ message: "Updating....." });
    }
  };

  //-> handle image file inputs
  const handleGeekImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      designGeekImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setDesignGeekImage(e.target.files[0]);
    }
  };
  const handleDesignImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      designImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setDesignImage(e.target.files[0]);
    }
  };

  //-> save data to db
  const saveDesignHeader = (e) => {
    e.preventDefault();
    if (designHeader !== "") {
      db.collection("design")
        .doc("designHeaderIntro")
        .collection("info")
        .doc("designHeader")
        .set({
          designHeader: designHeader,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Design Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Design Page header" });
    }
    setDesignHeader("");
  };
  const saveDesignIntro = (e) => {
    e.preventDefault();
    if (designIntro !== "") {
      db.collection("design")
        .doc("designHeaderIntro")
        .collection("info")
        .doc("designIntro")
        .set({
          designIntro: designIntro,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Design Intro Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Design Page intro" });
    }
    setDesignIntro("");
  };

  const saveGeek = (e) => {
    e.preventDefault();
    if (designGeekHeader !== "" && designGeekInfo !== "") {
      db.collection("design")
        .doc("designGeeks")
        .collection("cards")
        .add({
          designGeekHeader: designGeekHeader,
          designGeekInfo: designGeekInfo,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Characteristic header and info updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({
        message: "Fill in the characteristic header and info",
      });
    }
    setDesignGeekHeader("");
    setDesignGeekInfo("");
  };

  const saveGeekImage = (e) => {
    e.preventDefault();

    if (designGeekImage) {
      const designGeekImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`designImages/${designGeekImageID}`)
        .put(designGeekImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const geekProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setGeekProgress(geekProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("designImages")
            .child(designGeekImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("design")
                .doc("designGeeks")
                .collection("illustration")
                .doc("image")
                .set({
                  designGeekImage: url,
                  designGeekImageID: designGeekImageID,
                });
              setGeekProgress(0);
              setDesignGeekImage(null);
              notifyDynamicSuccess({
                message: "Design characteristic image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };
  const deleteGeekImage = () => {
    if (geekImageDetails?.data().designGeekImageID) {
      const imageID = geekImageDetails?.data().designGeekImageID;

      db.collection("design")
        .doc("designGeeks")
        .collection("illustration")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`designImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Characteristic image deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "No image to delete" });
    }
  };

  const saveDesignProducts = (e) => {
    e.preventDefault();
    if (designProducts) {
      db.collection("design")
        .doc("designProducts")
        .collection("designProductsDetails")
        .doc("info")
        .set({
          designProducts: designProducts,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Designed Products Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({
        message: "Fill in products designed description",
      });
    }
    setDesignProducts("");
  };

  const saveProductCircle = (e) => {
    e.preventDefault();
    if (productCircleOne !== "" && productCircleTwo !== "") {
      db.collection("design")
        .doc("designProductCircle")
        .collection("cards")
        .add({
          productCircleOne: productCircleOne,
          productCircleTwo: productCircleTwo,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Product circle updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({
        message: "Fill in products circle headers",
      });
    }
    setProductCircleOne("");
    setProductCircleTwo("");
  };

  const saveDesignImage = (e) => {
    e.preventDefault();

    if (designImage) {
      const designImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`designImages/${designImageID}`)
        .put(designImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const designProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setDesignProgress(designProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("designImages")
            .child(designImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("design")
                .doc("designs")
                .collection("images")
                .add({
                  designImage: url,
                  designImageID: designImageID,
                });
              setDesignProgress(0);
              setDesignImage(null);
              notifyDynamicSuccess({
                message: "Designs image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  //-> retrieve data from the database
  const [headerDetails] = useDocument(
    db
      .collection("design")
      .doc("designHeaderIntro")
      .collection("info")
      .doc("designHeader")
  );
  const [introDetails] = useDocument(
    db
      .collection("design")
      .doc("designHeaderIntro")
      .collection("info")
      .doc("designIntro")
  );
  const [designGeekDetails] = useCollection(
    db.collection("design").doc("designGeeks").collection("cards")
  );
  const [geekImageDetails] = useDocument(
    db
      .collection("design")
      .doc("designGeeks")
      .collection("illustration")
      .doc("image")
  );
  const [designProductsDetails] = useDocument(
    db
      .collection("design")
      .doc("designProducts")
      .collection("designProductsDetails")
      .doc("info")
  );
  const [productCircleDetails] = useCollection(
    db.collection("design").doc("designProductCircle").collection("cards")
  );
  const [designImagesDetails] = useCollection(
    db.collection("design").doc("designs").collection("images")
  );

  return (
    <div className={"design__container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Design Page header and introduction ]</h4>
          <div className={"devesign__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter design page header"}
              value={designHeader}
              onChange={(e) => setDesignHeader(e.target.value)}
              onClick={saveDesignHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter design page intro"}
              value={designIntro}
              onChange={(e) => setDesignIntro(e.target.value)}
              onClick={saveDesignIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>
            [ Design header and introduction current details ]
          </h4>
          <div className={"header__intro_box"}>
            {headerDetails?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {headerDetails?.data().designHeader ? (
                  headerDetails?.data().designHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {introDetails?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {introDetails?.data().designIntro ? (
                  introDetails?.data().designIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      {/* Geek Characteristics */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Design characteristics info ]</h4>
          <div>
            <form type={"submit"}>
              <Input
                type={"text"}
                placeholder={"Enter designs characteristic header"}
                value={designGeekHeader}
                onChange={(e) => setDesignGeekHeader(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter designs characteristic description"}
                value={designGeekInfo}
                onChange={(e) => setDesignGeekInfo(e.target.value)}
              />
              <Button onClick={saveGeek} text={"Add"} type={"submit"} />
            </form>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Design characteristics info details ]
          </h4>
          <div className={"products__box"}>
            {/* dieplay products here */}
            {designGeekDetails?.docs ? (
              designGeekDetails?.docs.map((doc) => {
                const { designGeekHeader, designGeekInfo } = doc.data();
                return (
                  <Geek
                    key={doc.id}
                    designGeekID={doc.id}
                    designGeekHeader={designGeekHeader}
                    designGeekInfo={designGeekInfo}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      {/* Characteristic image */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>
            [ Design characteristics side image ]
          </h4>
          <div>
            <Input
              type={"file"}
              placeholder={"Enter characteristic image"}
              onChange={handleGeekImage}
              accept={"image/*"}
            />
            {geekProgress > 0 ? (
              <div className={"upload__progress_bar"}>
                <progress value={geekProgress} max="100" />
              </div>
            ) : (
              <Button onClick={saveGeekImage} text={"Add"} type={"submit"} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Design characteristic image here ]
          </h4>
          <div className={"header__intro_box"}>
            <div className={"section__image_box"}>
              {geekImageDetails?.data() ? (
                geekImageDetails?.data().designGeekImage &&
                geekImageDetails?.data().designGeekImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={geekImageDetails?.data().designGeekImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteGeekImage()}
                    />
                  </div>
                ) : (
                  <PulseSpinner />
                )
              ) : (
                <p id={"label"}> No image set</p>
              )}
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Design products */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Products designed ]</h4>
          <div className={"devesign__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter products designed description"}
              value={designProducts}
              onChange={(e) => setDesignProducts(e.target.value)}
              onClick={saveDesignProducts}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>
            [ Design products details current details ]
          </h4>
          <div className={"header__intro_box"}>
            {headerDetails?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {designProductsDetails?.data().designProducts ? (
                  designProductsDetails?.data().designProducts
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      {/* Product circle */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Design product circle info ]</h4>
          <div>
            <form type={"submit"}>
              <Input
                type={"text"}
                placeholder={"Enter Product circle one"}
                value={productCircleOne}
                onChange={(e) => setProductCircleOne(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter Product circle two"}
                value={productCircleTwo}
                onChange={(e) => setProductCircleTwo(e.target.value)}
              />
              <Button
                onClick={saveProductCircle}
                text={"Add"}
                type={"submit"}
              />
            </form>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Design product circle info details ]
          </h4>
          <div className={"products__box"}>
            {/* dieplay products here */}
            {productCircleDetails?.docs ? (
              productCircleDetails?.docs.map((doc) => {
                const { productCircleOne, productCircleTwo } = doc.data();
                return (
                  <ProductCircle
                    key={doc.id}
                    productCircleID={doc.id}
                    productCircleOne={productCircleOne}
                    productCircleTwo={productCircleTwo}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      {/* Product Designs */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Designed images ]</h4>
          <div>
            <Input
              type={"file"}
              placeholder={"Enter product designed image"}
              onChange={handleDesignImage}
              accept={"image/*"}
            />
            {designProgress > 0 ? (
              <div className={"upload__progress_bar"}>
                <progress value={designProgress} max="100" />
              </div>
            ) : (
              <Button onClick={saveDesignImage} text={"Add"} type={"submit"} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Designs images here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display combo project images here */}
            <div className={"designs__image_box"}>
              {/* display cards here */}
              {designImagesDetails?.docs ? (
                designImagesDetails?.docs.map((doc) => {
                  const {
                    designImage,
                    designImageID,
                  } = doc.data();
                  return (
                    <DesignImage
                      key={doc.id}
                      designID={doc.id}
                      designImage={designImage}
                      designImageID={designImageID}
                    />
                  );
                })
              ) : (
                <PulseSpinner />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Design;
