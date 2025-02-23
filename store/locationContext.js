import { createContext, useState } from "react";

export const LocationContext = createContext({
  locations: [],
  addLocations: (data) => {},
  deleteLocation: (id) => {},
});

const LocationContextProvider = ({ children }) => {
  const [locations, setLocation] = useState([]);

  const addLocations = (data) => {
    setLocation((prevLocation) => {
      const existingLocation = locations.find(
        (location) => location.address === data.address
      );

      if (!existingLocation) {
        return [
          ...prevLocation,
          {
            ...data,
          },
        ];
      } else {
        return [
          ...prevLocation,
          {
            ...data,
          },
        ];
      }
    });
  };

  const deleteLocation = (id) => {
    setLocation((prevItems) => prevItems.filter((data) => data.id !== id));
  };

  const value = {
    locations,
    addLocations,
    deleteLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
