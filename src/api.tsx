import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${baseUrl}/dogs`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cannot fetch dogs");
      }
      return response.json();
    })
    .then((result: Dog[]) => result);
};

const postDog = (partialDog: Omit<Dog, "id">) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialDog),
  };
  return fetch(`${baseUrl}/dogs`, requestOptions);
};

const deleteDogRequest = (dogId: number) => {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(`${baseUrl}/dogs/${dogId}`, requestOptions);
};

const patchFavoriteForDog = (dogId: number, isFavorite: boolean) => {
  if (typeof dogId !== "number" || typeof isFavorite !== "boolean") {
    throw new Error(
      "Invalid input types. dogId should be a number, and isFavorite should be a boolean."
    );
  }
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite }), // Send the updated isFavorite value
  };
  return fetch(`${baseUrl}/dogs/${dogId}`, requestOptions);
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
