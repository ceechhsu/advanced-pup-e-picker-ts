import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

type TDogProvider = {
  dogs: Dog[];
  activeDogs: Dog[];
  handleHeartClick: (dogId: number) => void;
  handleEmptyHeartClick: (dogId: number) => void;
  handleTrashIconClick: (dogId: number) => void;
  handlePostDog: (dog: Omit<Dog, "id">) => Promise<undefined>;
  getDogsForActiveTab: (dogs: Dog[], activeTab: ActiveTab) => Dog[];
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  allDogs: Dog[];
  setAllDogs: (allDogs: Dog[]) => void;
};

const DogsContext = createContext<TDogProvider>({} as TDogProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");

  const fetchData = async () => {
    try {
      const dogs: Dog[] = await Requests.getAllDogs();
      setAllDogs(dogs);
      return dogs;
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleTrashIconClick = (dogId: number) => {
    const prevDogs = [...allDogs];
    setAllDogs(prevDogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDogRequest(dogId).catch((error) => {
      console.error("Error updating dog:", error);
      setAllDogs(prevDogs); // Revert to the previous state on error
    });
  };

  const handleHeartClick = (dogId: number) => {
    const prevDogs = [...allDogs];
    setAllDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: false } : dog
      )
    );
    Requests.patchFavoriteForDog(dogId, false).catch((error) => {
      console.error("Error updating dog:", error);
      setAllDogs(prevDogs); // Revert to the previous state on error
    });
  };

  const handleEmptyHeartClick = (dogId: number) => {
    const prevDogs = [...allDogs];
    setAllDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: true } : dog
      )
    );
    Requests.patchFavoriteForDog(dogId, true).catch((error) => {
      console.error("Error updating dog:", error);
      setAllDogs(prevDogs); // Revert to the previous state on error
    });
  };

  // const handlePostDog = async (dog: Omit<Dog, "id">): Promise<undefined> => {
  //   // Find the greatest ID among existing dogs
  //   const greatestId = Math.max(...allDogs.map((dog) => dog.id), 0);

  //   // Create a new dog object with an optimistic ID
  //   const optimisticDog: Dog = {
  //     id: greatestId + 1,
  //     ...dog,
  //   };

  //   // Update the local state optimistically
  //   setAllDogs((prevDogs) => [...prevDogs, optimisticDog]);

  //   try {
  //     // Send the actual request to create the dog
  //     await Requests.postDog(dog);
  //   } catch (error) {
  //     // If there's an error, revert to the previous state
  //     setAllDogs((prevDogs) =>
  //       prevDogs.filter((dog) => dog.id !== optimisticDog.id)
  //     );
  //     console.error("Error posting dog:", error);
  //   }
  // };

  const handlePostDog = async (dog: Omit<Dog, "id">): Promise<undefined> => {
    try {
      await Requests.postDog(dog);
      await fetchData();
    } catch (error) {
      console.error("Error posting dog:", error);
    }
  };

  const getDogsForActiveTab = (dogs: Dog[], activeTab: ActiveTab): Dog[] => {
    switch (activeTab) {
      case "all-dogs":
        return dogs;
      case "favorite":
        return dogs.filter((dog) => dog.isFavorite);
      case "unfavorite":
        return dogs.filter((dog) => !dog.isFavorite);
      case "create-dog-form":
        return dogs;
    }
  };

  const activeDogs = getDogsForActiveTab(allDogs, activeTab);

  return (
    <DogsContext.Provider
      value={{
        dogs: allDogs,
        activeDogs,
        handleEmptyHeartClick,
        handleHeartClick,
        handleTrashIconClick,
        handlePostDog,
        getDogsForActiveTab,
        activeTab,
        setActiveTab,
        allDogs,
        setAllDogs,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
