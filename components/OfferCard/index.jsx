import React from "react";
import Layout from "../Layout";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";

const OfferCard = ({ handleChange }) => {
  return (
    <Layout>
      <div className={styles.buttonHolder}>
        <button onClick={() => handleChange(3)} className={styles.button}>
          Any Questions?
        </button>
      </div>

      <p className={`${typoStyles.p} ${styles.description}`}>
        We're happy to share more details!
      </p>
    </Layout>
  );
};

export default OfferCard;
