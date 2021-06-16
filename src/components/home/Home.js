import React, { useState, useEffect } from "react";
import { Grid, Slide } from "@material-ui/core";
import db from "../firebase";
import { storage } from "../firebase";
import "./css/Home.css";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

//-> component imports
import Input from "../common/Input";
import Button from "../common/Button";
import {
  notifySuccess,
  notifyError,
  notifyDynamicSuccess,
  notifyDynamicError,
} from "../notifications/NotificationAlerts";
import FormInput from "../common/FormInput";
import PulseSpinner from "../common/PulseSpinner";
import Product from "./subComponents/Product";
import Card from "./subComponents/Card";
import { GiTrashCan } from "react-icons/gi";
import Project from "./subComponents/Project";

const Home = () => {
  // -> intro states
  const [homeHeader, setHomeHeader] = useState("");
  const [homeProduct, setHomeProduct] = useState("");

  // -> cards states
  const [cardHeader, setCardHeader] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [cardFeatureOne, setCardFeatureOne] = useState("");
  const [cardFeatureTwo, setCardFeatureTwo] = useState("");
  const [cardFeatureThree, setCardFeatureThree] = useState("");
  const [cardFeatureFour, setCardFeatureFour] = useState("");
  const [cardProgress, setCardProgress] = useState(0);

  //-> sections states
  const [sectionOneHeader, setSectionOneHeader] = useState("");
  const [sectionOneIntro, setSectionOneIntro] = useState("");
  const [sectionOneImage, setSectionOneImage] = useState(null);
  const [sectionOneProgress, setSectionOneProgress] = useState(0);

  const [sectionTwoHeader, setSectionTwoHeader] = useState("");
  const [sectionTwoIntro, setSectionTwoIntro] = useState("");
  const [sectionTwoImage, setSectionTwoImage] = useState(null);
  const [sectionTwoProgress, setSectionTwoProgress] = useState(0);

  const [sectionThreeIntro, setSectionThreeIntro] = useState("");
  const [sectionThreeHeader, setSectionThreeHeader] = useState("");
  const [sectionThreeImage, setSectionThreeImage] = useState(null);
  const [sectionThreeProgress, setSectionThreeProgress] = useState(0);

  const [projectImage, setProjectImage] = useState(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectProgress, setProjectProgress] = useState(0);

  //-> handling brain image input
  //-> Handle file picker changes
  const handleCardImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setCardImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setCardImage(e.target.files[0]);
    }
  };
  const handleSectionOneImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionOneImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionOneImage(e.target.files[0]);
    }
  };
  const handleSectionTwoImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionTwoImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionTwoImage(e.target.files[0]);
    }
  };
  const handleSectionThreeImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionThreeImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionThreeImage(e.target.files[0]);
    }
  };
  const handleProjectsImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setProjectImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setProjectImage(e.target.files[0]);
    }
  };

  const saveHomeHeader = (e) => {
    e.preventDefault();
    //-> do some database stuff
    if (homeHeader) {
      db.collection("home")
        .doc("homeIntro")
        .collection("homeHeader")
        .doc("info")
        .set({ homeHeader: homeHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Home header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill in the home page header" });
    }
    setHomeHeader("");
  };

  const saveHomeProducts = (e) => {
    e.preventDefault();

    if (homeProduct) {
      db.collection("home")
        .doc("homeIntro")
        .collection("homeProducts")
        .add({ homeProduct: homeProduct })
        .then(() => {
          notifyDynamicSuccess({ message: "Product updated successfully!" });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill in the product you offer" });
    }
    setHomeProduct("");
  };

  const saveCard = (e) => {
    e.preventDefault();

    if (
      cardHeader &&
      cardImage &&
      cardFeatureOne &&
      cardFeatureTwo &&
      cardFeatureThree
    ) {
      const cardImageID = Math.random().toString(36).substring(6).toUpperCase();

      const uploadTask = storage
        .ref(`homeCardsImages/${cardImageID}`)
        .put(cardImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const cardProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setCardProgress(cardProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("homeCardsImages")
            .child(cardImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("home").doc("homeCards").collection("all").add({
                cardImage: url,
                cardImageID: cardImageID,
                cardHeader: cardHeader,
                cardFeatureOne: cardFeatureOne,
                cardFeatureTwo: cardFeatureTwo,
                cardFeatureThree: cardFeatureThree,
                cardFeatureFour: cardFeatureFour,
              });
              setCardProgress(0);
              setCardImage(null);
              setCardHeader("");
              setCardFeatureOne("");
              setCardFeatureTwo("");
              setCardFeatureThree("");
              setCardFeatureFour("");
              notifyDynamicSuccess({
                message: "Home card successfully saved",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Fill at least three features" });
    }
  };
  //-> Section One
  const saveSectionOneImage = (e) => {
    e.preventDefault();
    if (sectionOneImage) {
      const sectionOneImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`homeSectionImages/${sectionOneImageID}`)
        .put(sectionOneImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionOneProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionOneProgress(sectionOneProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("homeSectionImages")
            .child(sectionOneImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("home")
                .doc("homeSections")
                .collection("sectionOne")
                .doc("image")
                .set({
                  sectionOneImage: url,
                  sectionOneImageID: sectionOneImageID,
                });
              setSectionOneProgress(0);
              setSectionOneImage(null);
              notifyDynamicSuccess({
                message: "Home section one image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionOneHeader = (e) => {
    e.preventDefault();
    if (sectionOneHeader) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionOne")
        .doc("header")
        .set({ sectionOneHeader: sectionOneHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section one header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionOneHeader("");
  };
  const saveSectionOneIntro = (e) => {
    e.preventDefault();
    if (sectionOneIntro) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionOne")
        .doc("intro")
        .set({ sectionOneIntro: sectionOneIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section one intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionOneIntro("");
  };

  //-> Section two
  const saveSectionTwoImage = (e) => {
    e.preventDefault();

    if (sectionTwoImage) {
      const sectionTwoImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`homeSectionImages/${sectionTwoImageID}`)
        .put(sectionTwoImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionTwoProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionTwoProgress(sectionTwoProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("homeSectionImages")
            .child(sectionTwoImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("home")
                .doc("homeSections")
                .collection("sectionTwo")
                .doc("image")
                .set({
                  sectionTwoImage: url,
                  sectionTwoImageID: sectionTwoImageID,
                });
              setSectionTwoProgress(0);
              setSectionTwoImage(null);
              notifyDynamicSuccess({
                message: "Home section two image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionTwoHeader = (e) => {
    e.preventDefault();
    if (sectionTwoHeader) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionTwo")
        .doc("header")
        .set({ sectionTwoHeader: sectionTwoHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section two header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionTwoHeader("");
  };
  const saveSectionTwoIntro = (e) => {
    e.preventDefault();
    if (sectionTwoIntro) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionTwo")
        .doc("intro")
        .set({ sectionTwoIntro: sectionTwoIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section two intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionTwoIntro("");
  };

  //-> section three
  const saveSectionThreeImage = (e) => {
    e.preventDefault();

    if (sectionThreeImage) {
      const sectionThreeImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`homeSectionImages/${sectionThreeImageID}`)
        .put(sectionThreeImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionThreeProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionThreeProgress(sectionThreeProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("homeSectionImages")
            .child(sectionThreeImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("home")
                .doc("homeSections")
                .collection("sectionThree")
                .doc("image")
                .set({
                  sectionThreeImage: url,
                  sectionThreeImageID: sectionThreeImageID,
                });
              setSectionThreeProgress(0);
              setSectionThreeImage(null);
              notifyDynamicSuccess({
                message: "Home section three image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionThreeHeader = (e) => {
    e.preventDefault();
    if (sectionThreeHeader) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionThree")
        .doc("header")
        .set({ sectionThreeHeader: sectionThreeHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section three header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionThreeHeader("");
  };
  const saveSectionThreeIntro = (e) => {
    e.preventDefault();
    if (sectionThreeIntro) {
      db.collection("home")
        .doc("homeSections")
        .collection("sectionThree")
        .doc("intro")
        .set({ sectionThreeIntro: sectionThreeIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section three intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionThreeIntro("");
  };

  //-> Project images
  const saveProjectImage = (e) => {
    e.preventDefault();

    if (projectImage && projectDescription) {
      const projectImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`homeProjectsImages/${projectImageID}`)
        .put(projectImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const projectProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProjectProgress(projectProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("homeProjectsImages")
            .child(projectImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("home").doc("homeProjects").collection("all").add({
                projectImage: url,
                projectImageID: projectImageID,
                projectDescription: projectDescription,
              });
              setProjectProgress(0);
              setProjectImage(null);
              setProjectDescription("");
              notifyDynamicSuccess({
                message: "Project updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose image to upload" });
    }
  };

  // -> retrieve data from firestore database using firebase hooks
  const [homeHeaderDetails] = useDocument(
    db.collection("home").doc("homeIntro").collection("homeHeader").doc("info")
  );
  const [homeProductsDetails] = useCollection(
    db.collection("home").doc("homeIntro").collection("homeProducts")
  );
  const [homeCardDetails] = useCollection(
    db.collection("home").doc("homeCards").collection("all")
  );
  const [homeSectionOneHeader] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionOne")
      .doc("header")
  );
  const [homeSectionOneIntro] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionOne")
      .doc("intro")
  );
  const [homeSectionOneImage] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionOne")
      .doc("image")
  );
  const [homeSectionTwoHeader] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionTwo")
      .doc("header")
  );
  const [homeSectionTwoIntro] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionTwo")
      .doc("intro")
  );
  const [homeSectionTwoImage] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionTwo")
      .doc("image")
  );
  const [homeSectionThreeHeader] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionThree")
      .doc("header")
  );
  const [homeSectionThreeIntro] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionThree")
      .doc("intro")
  );
  const [homeSectionThreeImage] = useDocument(
    db
      .collection("home")
      .doc("homeSections")
      .collection("sectionThree")
      .doc("image")
  );
  const [homeProjectsDetails] = useCollection(
    db.collection("home").doc("homeProjects").collection("all")
  );

  // Delete Section images
  const deleteSectionOneImage = () => {
    if (homeSectionOneImage?.data().sectionOneImageID) {
      const imageID = homeSectionOneImage?.data().sectionOneImageID;

      db.collection("home")
        .doc("homeSections")
        .collection("sectionOne")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`homeSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section one image deleted successfully",
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
  const deleteSectionTwoImage = () => {
    if (homeSectionTwoImage?.data().sectionTwoImageID) {
      const imageID = homeSectionTwoImage?.data().sectionTwoImageID;

      db.collection("home")
        .doc("homeSections")
        .collection("sectionTwo")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`homeSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section two image deleted successfully",
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
  const deleteSectionThreeImage = () => {
    if (homeSectionThreeImage?.data().sectionThreeImageID) {
      const imageID = homeSectionThreeImage?.data().sectionThreeImageID;

      db.collection("home")
        .doc("homeSections")
        .collection("sectionThree")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`homeSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section three image deleted successfully",
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

  return (
    <div className={"home__container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home header info ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter home page header"}
              value={homeHeader}
              onChange={(e) => setHomeHeader(e.target.value)}
              onClick={saveHomeHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>[ Home header info Details ]</h4>
          <div className={"header__intro_box"}>
            {/* Home header details here */}
            {homeHeaderDetails?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {homeHeaderDetails?.data().homeHeader ? (
                  homeHeaderDetails?.data().homeHeader
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

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home products info ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter home page products offered"}
              value={homeProduct}
              onChange={(e) => setHomeProduct(e.target.value)}
              onClick={saveHomeProducts}
              buttonType={"submit"}
              buttonText={"Add"}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Home products offered info Details ]
          </h4>
          <div className={"products__box"}>
            {/* dieplay products here */}
            {homeProductsDetails?.docs ? (
              homeProductsDetails?.docs.map((doc) => {
                const { homeProduct } = doc.data();
                return (
                  <Product
                    key={doc.id}
                    homeProductID={doc.id}
                    homeProduct={homeProduct}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home header info ]</h4>
          <div>
            <form type={"submit"}>
              <Input
                type={"text"}
                placeholder={"Enter card header"}
                value={cardHeader}
                onChange={(e) => setCardHeader(e.target.value)}
              />
              <Input
                type={"file"}
                placeholder={"Enter card image"}
                onChange={handleCardImage}
                accept={"image/*"}
              />
              <Input
                type={"text"}
                placeholder={"Enter feature one"}
                value={cardFeatureOne}
                onChange={(e) => setCardFeatureOne(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter feature two"}
                value={cardFeatureTwo}
                onChange={(e) => setCardFeatureTwo(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter feature three"}
                value={cardFeatureThree}
                onChange={(e) => setCardFeatureThree(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder={"Enter feature four"}
                value={cardFeatureFour}
                onChange={(e) => setCardFeatureFour(e.target.value)}
              />
              {cardProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={cardProgress} max="100" />
                </div>
              ) : (
                <Button onClick={saveCard} text={"Add"} type={"submit"} />
              )}
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>[ Home cards details here ]</h4>
          <div className={"products__box"}>
            {/* display cards here */}
            {homeCardDetails?.docs ? (
              homeCardDetails?.docs.map((doc) => {
                const {
                  cardFeatureOne,
                  cardFeatureTwo,
                  cardFeatureThree,
                  cardFeatureFour,
                  cardHeader,
                  cardImage,
                  cardImageID,
                } = doc.data();
                return (
                  <Card
                    key={doc.id}
                    cardID={doc.id}
                    cardHeader={cardHeader}
                    cardFeatureOne={cardFeatureOne}
                    cardFeatureTwo={cardFeatureTwo}
                    cardFeatureThree={cardFeatureThree}
                    cardFeatureFour={cardFeatureFour}
                    cardImage={cardImage}
                    cardImageID={cardImageID}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      {/* section one */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home Section One ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section one header"}
              value={sectionOneHeader}
              onChange={(e) => setSectionOneHeader(e.target.value)}
              onClick={saveSectionOneHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section one intro"}
              value={sectionOneIntro}
              onChange={(e) => setSectionOneIntro(e.target.value)}
              onClick={saveSectionOneIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section one image"}
                onChange={handleSectionOneImage}
                accept={"image/*"}
              />
              {sectionOneProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionOneProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionOneImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Home section one details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section one info here */}
            {homeSectionOneHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {homeSectionOneHeader?.data().sectionOneHeader ? (
                  homeSectionOneHeader?.data().sectionOneHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {homeSectionOneIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {homeSectionOneIntro?.data().sectionOneIntro ? (
                  homeSectionOneIntro?.data().sectionOneIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {homeSectionOneImage?.data() ? (
                homeSectionOneImage?.data().sectionOneImage &&
                homeSectionOneImage?.data().sectionOneImageID ? (
                  // homeSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={homeSectionOneImage?.data().sectionOneImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionOneImage()}
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

      {/* section two */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home Section Two ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section two header"}
              value={sectionTwoHeader}
              onChange={(e) => setSectionTwoHeader(e.target.value)}
              onClick={saveSectionTwoHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section two intro"}
              value={sectionTwoIntro}
              onChange={(e) => setSectionTwoIntro(e.target.value)}
              onClick={saveSectionTwoIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section two image"}
                onChange={handleSectionTwoImage}
                accept={"image/*"}
              />
              {sectionTwoProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionTwoProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionTwoImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Home section two details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section two info here */}
            {homeSectionTwoHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {homeSectionTwoHeader?.data().sectionTwoHeader ? (
                  homeSectionTwoHeader?.data().sectionTwoHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {homeSectionTwoIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {homeSectionTwoIntro?.data().sectionTwoIntro ? (
                  homeSectionTwoIntro?.data().sectionTwoIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {homeSectionTwoImage?.data() ? (
                homeSectionTwoImage?.data().sectionTwoImage &&
                homeSectionTwoImage?.data().sectionTwoImageID ? (
                  // homeSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={homeSectionTwoImage?.data().sectionTwoImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionTwoImage()}
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

      {/* section three */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home Section Three ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section three header"}
              value={sectionThreeHeader}
              onChange={(e) => setSectionThreeHeader(e.target.value)}
              onClick={saveSectionThreeHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section three intro"}
              value={sectionThreeIntro}
              onChange={(e) => setSectionThreeIntro(e.target.value)}
              onClick={saveSectionThreeIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section three image"}
                onChange={handleSectionThreeImage}
                accept={"image/*"}
              />
              {sectionThreeProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionThreeProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionThreeImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Home section three details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section three info here */}
            {homeSectionThreeHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {homeSectionThreeHeader?.data().sectionThreeHeader ? (
                  homeSectionThreeHeader?.data().sectionThreeHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {homeSectionThreeIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {homeSectionThreeIntro?.data().sectionThreeIntro ? (
                  homeSectionThreeIntro?.data().sectionThreeIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {homeSectionThreeImage?.data() ? (
                homeSectionThreeImage?.data().sectionThreeImage &&
                homeSectionThreeImage?.data().sectionThreeImageID ? (
                  // homeSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={homeSectionThreeImage?.data().sectionThreeImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionThreeImage()}
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

      {/* combo section */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Home Projects & Images Section]</h4>
          <div>
            <Input
              type={"file"}
              placeholder={"Enter project image"}
              onChange={handleProjectsImage}
              accept={"image/*"}
            />
            <Input
              type={"text"}
              placeholder={"Enter project description"}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            {projectProgress > 0 ? (
              <div className={"upload__progress_bar"}>
                <progress value={projectProgress} max="100" />
              </div>
            ) : (
              <Button onClick={saveProjectImage} text={"Add"} type={"submit"} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Home combo projects details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display combo project images here */}
            <div className={"products__box"}>
              {/* display cards here */}
              {homeProjectsDetails?.docs ? (
                homeProjectsDetails?.docs.map((doc) => {
                  const {
                    projectDescription,
                    projectImage,
                    projectImageID,
                  } = doc.data();
                  return (
                    <Project
                      key={doc.id}
                      projectID={doc.id}
                      projectDescription={projectDescription}
                      projectImage={projectImage}
                      projectImageID={projectImageID}
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

export default Home;
