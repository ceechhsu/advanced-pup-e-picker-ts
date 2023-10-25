import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { useDogs } from "../providers/DogsProvider";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { handlePostDog, allDogs, setAllDogs } = useDogs();
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogForm, setDogForm] = useState<Omit<Dog, "id">>({
      name: "",
      image: selectedImage,
      description: "",
      isFavorite: false,
    });

    const clearDogForm = () => {
      setDogForm({
        name: "",
        image: selectedImage,
        description: "",
        isFavorite: false,
      });
    };

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;
      setDogForm({ ...dogForm, [name]: value });
    };

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { value } = event.target;
      setDogForm({
        ...dogForm,
        image: value, // Update the image property with the selected value
      });
    };

    const handleOnSubmit = () => {
      // Save the current allDogs state
      const prevDogs: Dog[] = [...allDogs];

      // Create a new dog object with an optimistic ID
      const greatestId = Math.max(...allDogs.map((dog) => dog.id), 0);
      const optimisticDog: Dog = {
        id: greatestId + 1,
        ...dogForm,
      };

      // Cast optimisticDog to Dog[]
      const newDogs = [optimisticDog, ...prevDogs] as Dog[];

      // Update the state with the newDogs array
      setAllDogs(newDogs);

      // Call the API to create the dog
      handlePostDog(dogForm)
        .then(() => {
          // If successful, toast message and clear form - the state is already updated
          toast.success("Dog Created");
          clearDogForm();
        })
        .catch((error) => {
          // If there's an error, revert to the previous state
          setAllDogs(prevDogs);
          console.error("Error posting dog:", error);
        });
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={dogForm.name}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="dog-description"
          cols={80}
          rows={10}
          value={dogForm.description}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="dog-type"
          onChange={handleSelectChange}
          value={dogForm.image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
