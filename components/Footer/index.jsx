import React from "react";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.footerContent}>
        <p className={`${typoStyles.p} ${styles.description}`}>
          © Copyright Bidnovation Inc. 2023
        </p>
        <p className={`${typoStyles.p} ${styles.description}`}>
          Built with ❤️ all over the 🌎 USA
        </p>
      </div>
    </div>
  );
};

export default Footer;
