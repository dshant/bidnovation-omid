import React, { useContext } from "react";
import styles from "./style.module.css";
import CarAnimation from "../../public/json/carAnimation.json";
import CatAnimation from "../../public/json/cat.json";
import HumanAnimation from "../../public/json/man.json";
import Lottie from "lottie-react";
import { UserContext } from "@/context/UserContext";

const AnimationHolder = ({ children }) => {
  const { activeStep } = useContext(UserContext);

  const checkRoutes = () => {
    if (activeStep > 1) {
      return "beyondHomepage";
    }

    return "homepage";
  };

  return (
    <section className={`globalMain
      ${styles.main} 
      ${
        activeStep === 1 ? styles.firstStepMain : activeStep === 2 ? styles.secondStepMain :
        activeStep === 3 ? styles.thirdStepMain : 
        activeStep === 4 && 
        styles.fourthStepMain
      }`}>
      <div className={styles.childrenContainer}>{children}</div>
      <div className={styles.cloud} />
      <div className={styles.backgroundImage}>
        <div className={styles.left}>
          <div className={styles.carAnimation}>
            <Lottie animationData={CarAnimation} loop={true} />
          </div>

          <div className={styles.catAnimation}>
            <Lottie animationData={CatAnimation} loop={true} />
          </div>
        </div>

        <div className={styles.imageSpace} />

        <div
          className={`${styles.right} ${
            checkRoutes() === "beyondHomepage"
              ? styles.hideBackgroundOnMobile
              : null
          }`}
        >
          <div className={styles.manAnimation}>
            <Lottie animationData={HumanAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimationHolder;
