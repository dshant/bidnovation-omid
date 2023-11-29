import React from "react";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";
import { testimonials } from "@/utils/testimonials";

const RatingSection = ({ isScrolled }) => {
  return (
    <section className={styles.section}>
      <div className={styles.main}>
        <h1 className={`${typoStyles.h1} ${styles.heading}`}>
          The (Almost) 5 Star Insurance Company
        </h1>
        <p className={`${typoStyles.p} ${styles.description}`}>
          Bidnovation has earned 4.9 stars by our partners, and has successfully
          bought & sold $350 million dollars worth of Real Estate
        </p>

        {isScrolled && (
          <div className={styles.ratingsHolder}>
            <div className={styles.ratings} />
          </div>
        )}
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.animatedSlider}>
          {testimonials.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardProfile}>
                <img src={item.url} alt="profile" />

                <div>
                  <h2 className={`${typoStyles.p} ${styles.name}`}>
                    {item.name}
                  </h2>
                  <span className={styles.name}>{item.name}</span>
                </div>
              </div>

              <p className={`${typoStyles.p} ${styles.review}`}>
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingSection;
