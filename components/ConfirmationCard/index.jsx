import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";
import { getDayfromDate } from "@/utils/getDayfromDate";

const ConfirmationCard = () => {
  const { selectedAddress, userData } = useContext(UserContext);

  return (
    <div className={styles.main}>
      <h1 className={`${typoStyles.h1} ${styles.heading}`} style={{
        marginTop: 15
      }}>
        {userData.firstName}, we will call you soon!
      </h1>
      <p className={`${typoStyles.p} ${styles.address}`}>{selectedAddress}</p>

      <p className={`${typoStyles.p} ${styles.description}`}>
        On <b>{userData.date && getDayfromDate(userData.date)} {userData.date}</b>{" "}
        between <b>{userData.time}</b>
      </p>
      <p className={`${typoStyles.p} ${styles.descriptionFooter}`}>
        We look forward to speaking with you!
      </p>
    </div>
  );
};

export default ConfirmationCard;
