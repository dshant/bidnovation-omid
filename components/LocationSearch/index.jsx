import React, { Fragment, useContext, useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Map from "../Map";
import { UserContext } from "@/context/UserContext";
import { CircularProgress, LinearProgress } from "@mui/material";
import StarRatings from "react-star-ratings";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";

const LocationSearch = ({
  handleChange,
  setSelectedAddress,
  selectedAddress,
  onlySearch = false,
  isBottom,
}) => {
  const {
    handleZillowAPI,
    setOfferPrice,
    offerPrice,
    handleCreateEntrie,
    setLoading,
    loading,
    longitudes,
    setLongitude,
    value,
    setValue,
    isZillowLoading,
  } = useContext(UserContext);

  const [progress, setProgress] = useState(0);
  const [apiResponse, setAPIResponse] = useState(null);
  const [savedSuggestion, setSavedSuggestion] = useState([]);
  const [dropDownShow, setDropDownShow] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, 30); // Increase the value here for a slower or faster progress bar

    return () => {
      clearInterval(interval);
    };
  }, [progress, loading]);

  useEffect(() => {
    if (progress === 100 && apiResponse?.id) {
      clearInterval();
      handleChange(2);
      setLoading(false);
    }
  }, [progress]);

  const handleSelect = async (address) => {
    if (address && value !== "") {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setLongitude(latLng);
      handleZillowAPI(address);
      setSelectedAddress(address);
      setValue(address);
    }
  };

  const handleLocationChange = (localValue) => {
    if (localValue === "") {
      setSelectedAddress("");
      setLongitude({});
      setOfferPrice(null);
    }

    setValue(localValue);
  };

  const handleNext = async () => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const response = await handleCreateEntrie();

      if (response) {
        setAPIResponse(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlur = (value) => {
    setSavedSuggestion(value);
    setDropDownShow(false);
  };

  if (loading && isBottom) return null;

  return (
    <div className={`${styles.main} ${loading ? null : styles.addMaxWidth}`}>
      {(() => {
        if (loading) {
          return (
            <>
              <h1
                className={`${typoStyles.h1} ${styles.heading}`}
              >{`One sec while we crunch some numbers...`}</h1>

              <div className={styles.loadingTextHolder}>
                <CircularProgress size="14px" />
                <p className={`${typoStyles.p} ${styles.loadingText}`}>
                  Connecting to municipal databases
                </p>
              </div>

              <LinearProgress
                className={styles.progressBar}
                variant="determinate"
                value={progress}
              />

              <div className={styles.loadingFooter}>
                <p className={`${typoStyles.p} ${styles.loadingFooterText}`}>
                  Your Property Valuation
                </p>

                <StarRatings
                  numberOfStars={5}
                  rating={4.9}
                  starRatedColor="#ff0083"
                  starDimension="20px"
                  starSpacing="4px"
                />
              </div>
            </>
          );
        }

        return (
          <>
            {!onlySearch ? (
              <>
                <h1 className={`${typoStyles.h1} ${styles.heading}`}>
                  America’s most loved Real estate company
                </h1>
                <p className={`${typoStyles.p} ${styles.description}`}>
                  Instant offer. Incredible service. Big heart.
                </p>
              </>
            ) : null}

            <div
              className={`${styles.mapBlock} ${
                longitudes.lat && longitudes.lng
                  ? `show-map ${styles.showMap}`
                  : null
              }`}
            >
              {longitudes.lat && longitudes.lng && (
                <Map lat={longitudes.lat} lng={longitudes.lng} />
              )}
            </div>

            <PlacesAutocomplete
              value={value}
              onChange={handleLocationChange}
              onSelect={handleSelect}
              searchOptions={{
                componentRestrictions: { country: "us" },
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div
                  className={`${styles.searchInputHolder} ${
                    longitudes.lat && longitudes.lng ? styles.isMapShown : null
                  }`}
                >
                  <div className={styles.inputSearch}>
                    <img
                      src="/images/mapPointer.svg"
                      className={styles.locationIcon}
                    />
                    <input
                      {...getInputProps({
                        placeholder: "What's your home address?",
                        className: styles.searchInput,
                      })}
                      onBlur={() => handleBlur(suggestions)}
                      onFocus={() => setDropDownShow(true)}
                    />
                  </div>

                  {loading && <span className="loader"></span>}
                  {suggestions.length > 0 && (
                    <div
                      className={`${styles.dropdownResultHolder} ${
                        (loading || suggestions || savedSuggestion) &&
                        dropDownShow
                          ? styles.isDropdownShown
                          : null
                      }`}
                    >
                      {(() => {
                        if (suggestions || savedSuggestion) {
                          if (
                            suggestions.length > 0 ||
                            savedSuggestion.length > 0
                          ) {
                            return (suggestions || savedSuggestion).map(
                              (suggestion, index) => {
                                return (
                                  <div
                                    key={index}
                                    {...getSuggestionItemProps(suggestion, {
                                      className: `${styles.dropdownItem} ${
                                        suggestion.active
                                          ? styles.dropdownActiveItem
                                          : null
                                      }`,
                                      onClick: () =>
                                        handleSelect(suggestion.description),
                                    })}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              }
                            );
                          }
                        }

                        return null;
                      })()}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>

            <div className={styles.buttonHolder}>
              <button
                disabled={!offerPrice || isZillowLoading}
                onClick={handleNext}
                className={`${styles.button} ${
                  isZillowLoading ? styles.buttonLoading : null
                }`}
              >
                {isZillowLoading ? (
                  <span className="loader white"></span>
                ) : (
                  "Get My Offer"
                )}
              </button>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default LocationSearch;
