import React, { useContext, useState } from "react";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "@/context/UserContext";
import { Dialog, DialogContent } from "@mui/material";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";

const Header = ({ isScrolled }) => {
  const [isRestartingConfirmation, setIsRestartingConfirmation] =
    useState(false);
  const { activeStep, restartForm } = useContext(UserContext);

  const onReset = () => {
    setIsRestartingConfirmation(false);
    restartForm();
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.isScrolled : null}`}
      >
        <div />

        <div className={styles.logoHolder}>
          <img
            onClick={() => restartForm()}
            src="/images/bidnovation.svg"
            alt="error"
          />
        </div>

        <div className={styles.actionHolder}>
          {(() => {
            if (activeStep === 1 || activeStep === 4) {
              return null;
            }

            return (
              <div onClick={() => setIsRestartingConfirmation(true)}>
                <Tooltip title="Start Over">
                  <svg
                    className={styles.retryIcon}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 7 1 4l3-3m0 12h6.5a4.5 4.5 0 1 0 0-9H2"
                    />
                  </svg>
                </Tooltip>
              </div>
            );
          })()}
        </div>
      </header>

      <Dialog
        open={isRestartingConfirmation}
        onClose={() => setIsRestartingConfirmation(false)}
        maxWidth="sm"
      >
        <DialogContent>
          <pre className={`${typoStyles.p} ${styles.dialogTitle}`}>
            Want to start over?
          </pre>
          <p className={`${typoStyles.p} ${styles.dialogDescription}`}>
            This will clear your answers and start again from the beginning
          </p>

          <div className={styles.dialogActionHolder}>
            <button
              className={styles.closeButton}
              onClick={() => setIsRestartingConfirmation(false)}
            >
              Cancel
            </button>
            <button
              className={`${styles.closeButton} ${styles.mainAction}`}
              onClick={onReset}
            >
              Start Over
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
