import React, { useContext, useState } from "react";
import LocationSearch from "../LocationSearch";
import AnimationHolder from "../AnimationHolder";
import UserInfoCard from "../UserInfoCard";
import { UserContext } from "@/context/UserContext";
import ConfirmationCard from "../ConfirmationCard";

const PreBookingSteps = () => {
  /**
   * PreBookingSteps component manages a multi-step pre-booking process.
   * - Step 1: Find and verify the user's location.
   * - Step 2: Display the offers and options screen.
   * - Step 3: Collect client's name and related information.
   * - Step 4: Gather client's email, appointment date, and preferred calling time.
   * - Default: Display a congratulatory page upon successful completion.
   */

  const [activeStep, setActiveStep] = useState(1);

  const { selectedAddress, setSelectedAddress } = useContext(UserContext);

  const handleChange = (value) => {
    setActiveStep(value);
  };

  const renderComponent = () => {
    switch (activeStep) {
      case 1:
        return (
          <LocationSearch
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            handleChange={handleChange}
          />
        );
      case 2:
        return;
      case 3:
        return;
      case 4:
        return;
      default:
        return null;
    }
  };

  return <AnimationHolder>{renderComponent()}</AnimationHolder>;
};

export default PreBookingSteps;
