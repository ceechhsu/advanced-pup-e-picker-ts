// Right now these dogs are constant, but in reality we should be getting these from our server

import { useDogs } from "../providers/DogsProvider";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const {
      activeDogs,
      handleTrashIconClick,
      handleHeartClick,
      handleEmptyHeartClick,
    } = useDogs();
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {activeDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => handleTrashIconClick(dog.id)}
            onHeartClick={() => handleHeartClick(dog.id)}
            onEmptyHeartClick={() => handleEmptyHeartClick(dog.id)}
            isLoading={false}
          />
        ))}
      </>
    );
  };
