import { createContext, useMemo, useState } from 'react';

import axios from 'axios';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [zillowAPIResponse, setZillowAPIResponse] = useState({})
  const [offerPrice, setOfferPrice] = useState(null)
  const [activeId, setActiveID] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(1);
  const [longitudes, setLongitude] = useState({});
  const [value, setValue] = useState("");
  const [isZillowLoading, setIsZillowLoading] = useState(false)

  const options = {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const handleZillowAPI = async (address) => {
    try {
      setIsZillowLoading(true)
      const response = await axios.get(`/api/zillowAPI?address=${address}`)

      if (response.data.results.length) {
        if (response.data.results[0] && response.data.results[0].zestimate) {
          setZillowAPIResponse(response.data.results[0])
          const offerZestimatePrice  = Number(response.data.results[0]?.zestimate) - 30000
          const price = offerZestimatePrice?.toLocaleString('en-US',options)
          setOfferPrice(price)
        } else {
          const firstZstimateResult = response.data.results.filter(item => item.zestimate);

          if (firstZstimateResult && firstZstimateResult[0]) {
            setZillowAPIResponse(firstZstimateResult[0])
            const offerZestimatePrice  = Number(firstZstimateResult[0]?.zestimate) - 30000
            const price = offerZestimatePrice?.toLocaleString('en-US',options)
            setOfferPrice(price)
          }
        } 
      } else {
        setOfferPrice(null);
      }
    } catch (err) {
      console.error(err)
      setOfferPrice(null);
    } finally {
      setIsZillowLoading(false)
    }
  }

  const handleCreateEntrie = async () => {
    try {
      const response = await axios.post("/api/createData", {
        zestimate: zillowAPIResponse.zestimate,
        offerZestimatePrice: offerPrice,
        address: selectedAddress
      })
      if(response.data){
        setActiveID(response.data.id)
      }
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateEntrie = async (formData) => {
    try {
      const response = await axios.put("/api/updateData", {id: activeId, data: formData})
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  const restartForm = () => {
    setZillowAPIResponse({})
    setOfferPrice(null)
    setSelectedAddress("")
    setLoading(false)
    setActiveStep(1)
    setLongitude({})
    setValue("")
  }

  const contaxtValue = useMemo(() => ({
    handleZillowAPI,
    zillowAPIResponse,
    setUserData,
    setZillowAPIResponse,
    offerPrice,
    setOfferPrice,
    userData,
    handleCreateEntrie,
    selectedAddress,
    setSelectedAddress,
    handleUpdateEntrie,
    loading,
    setLoading, 
    setActiveStep, 
    activeStep,
    longitudes,
    setLongitude, 
    restartForm,
    value,
    setValue,
    isZillowLoading,
    setIsZillowLoading
  }), [
    handleZillowAPI,
    zillowAPIResponse,
    setUserData,
    setZillowAPIResponse,
    offerPrice,
    setOfferPrice,
    userData,
    handleCreateEntrie,
    selectedAddress,
    setSelectedAddress,
    handleUpdateEntrie,
    loading,
    setLoading, 
    activeStep, 
    setActiveStep, 
    longitudes,
    setLongitude, 
    restartForm,
    value,
    setValue,
    isZillowLoading,
    setIsZillowLoading
  ]);

  return (
    <UserContext.Provider value={contaxtValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
