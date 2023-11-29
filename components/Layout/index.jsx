import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";

const Layout = ({ children }) => {
  const { offerPrice, selectedAddress } = useContext(UserContext);

  return (
    <div className={styles.main}>
      <h1 className={`${typoStyles.h1} ${styles.heading}`}>Congratulations!</h1>
      <p className={`${typoStyles.p} ${styles.description}`}>
        Your home has been Qualified.
      </p>
      <p className={`${typoStyles.p} ${styles.address}`}>{selectedAddress}</p>
      <p className={`${typoStyles.p} ${styles.address}`}>Your offer</p>

      <div className={styles.priceBox}>
        <span className={styles.price}>${offerPrice}</span>
      </div>

      <span className={styles.policy}>
        No closing cost, No Commission, No hidden fees.
      </span>
      {children}
    </div>
  );
};

export default Layout;
