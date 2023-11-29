import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";

import RatingSection from "@/components/RatingSection";
import SponserSection from "@/components/SponserSection";
import AnimationHolder from "@/components/AnimationHolder";
import LocationSearch from "@/components/LocationSearch";
import { UserContext } from "@/context/UserContext";
import OfferCard from "@/components/OfferCard";
import Footer from "@/components/Footer";
import UserInfoCard from "@/components/UserInfoCard";
import IncredibleSection from "@/components/IncredibleSection";
import ConfirmationCard from "@/components/ConfirmationCard";

export default function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [ratingSectionFilled, setRatingSectionFilled] = useState(false);
  const { selectedAddress, setSelectedAddress, activeStep, setActiveStep } =
    useContext(UserContext);
  const windowHeight = typeof window !== "undefined" && window.innerHeight;

  const handleChange = (value) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveStep(value)
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
      setRatingSectionFilled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (windowHeight > 1100) {
      setRatingSectionFilled(true);
    }
  }, []);

  return (
    <>
      <Header activeStep={activeStep} isScrolled={isScrolled} />

      <div className="mainDiv">
        <AnimationHolder>
          {(() => {
            if (activeStep === 2) {
              return <OfferCard handleChange={handleChange} />;
            }

            if (activeStep === 3) {
              return <UserInfoCard handleChange={handleChange} />;
            }

            if (activeStep === 4) {
              return <ConfirmationCard />;
            }

            return (
              <LocationSearch
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                handleChange={handleChange}
                isBottom={false}
              />
            );
          })()}
        </AnimationHolder>

        <SponserSection />
        <RatingSection isScrolled={ratingSectionFilled} />

        <IncredibleSection>
          {activeStep > 1 ? null : (
            <LocationSearch
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              handleChange={handleChange}
              onlySearch={true}
              isBottom={true}
            />
          )}
        </IncredibleSection>

        <Footer />
      </div>
    </>
  );
}
