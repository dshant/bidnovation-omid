import React, { useContext } from "react";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";
import { UserContext } from "@/context/UserContext";

const IncredibleSection = ({ children }) => {
  const { activeStep } = useContext(UserContext);

  return (
    <section className={styles.main}>
      <h1 className={`${typoStyles.h1} ${styles.heading}`}>
        Zero Hassle. Incredible Offers. No Fees.
      </h1>
      <p className={`${typoStyles.p} ${styles.heading}`}>
        Trusted by Homeowners
      </p>

      {activeStep === 1 ? (
        <p
          className={`${typoStyles.p} ${styles.description} ${styles.bottomText}`}
        >
          Type in your address and let the magic happen.
        </p>
      ) : null}
      {children}
    </section>
  );
};

export default IncredibleSection;
