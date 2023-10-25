# Pup-E-Picker PART DEUX

In this assignment we will be re-building our dog-favoriting app called Pup- E-Picker. Don't even try this assignment till you've done the first one please 🙏.

Since you know how the app should look and feel let's highlight the differences between this app and the last one.

1. This app will be built using ONLY functional components and hooks
   a. This means you will not be using any class components
2. Updating and deleting a dog will need to be done optimistically
   a. This means that you will need to update the state of the app before the server responds
   b. If the server responds with an error, you will need to revert the state of the app to what it was before the update
3. You will need to use the context API to share state between components

For a demo of how the app should look and feel please visit [This Deployed Version of The App](https://optimitistic-pup-e-picker-deployed-bsa263act-devslopes1.vercel.app/functional)

## Learning Objectives

In order to complete this assignment, a student should be able to...

- use array states to store data from a server
- make `GET` requests to a server to retrieve data
- make `POST` requests to a server to create data
- make `DELETE` requests to a server to delete data
- make `PATCH` requests to a server to update data
- use `onSubmit` handlers to make form submissions
- using helper functions to clean up your fetch calls
- pass down state setters in order to change the state of a parent component
- set up application state correctly
- use loading states to prevent errors and make user experience better
- use `useEffect` to trigger code when a component mounts in a functional component
- use a controlled form to submit data to the server
- use `children` to create a Layout Component
- use `react-hot-toast` to create toast notifications
- use a Context Provider to share state between components without props drilling
- optimistically make changes to state before the server responds for a better user experience

## Setup

To get this project setup, you should:

- Run `npm i` to install all dependencies
- Run `npm run dev` to run the project
- Run `npm run serve` to run the server
- Run `npm run seed` to seed the server
- Run `npm run serve:slow` to run the server with a delay on all requests
  - This is useful for testing loading states

## Standard Requirements

- [ ] Setup eslint
- [ ] Pass all linting checks

- To check if linting passes, run `npm run lint`

- [ ] Format code with prettier
- [ ] State should not be duplicated
- [ ] Variables should be named logically
- [ ] No unnecessary console logs
- [ ] No commented out blocks of code (Code comments are fine)
- [ ] Setup a github repository with your submission as the `main` branch, you will submit a link to this for grading (NOT A ZIP FILE)

## Typescript Specific Requirements

- [ ] pass **ALL** type checks
  - Check by running `npm run typecheck`
- [ ] DON'T USE `any`.... OR ELSE
- [ ] Keep your types clean and in a logical location
- [ ] Prop Types for components should be collocated with their components
- [ ] Shared types should live in a file that says `types` somewhere in it's name
  - [ ] example: `types.ts` should work fine
- [ ] Unshared types should live in the component they are used in

## Showing the Correct Component

- [ ] place `Dogs` inside of the `.content-container` div of the `Section` component **using React Children**
- [ ] place `CreateDogForm` inside of the `.content-container` div of the `Section` component **using React Children**
- [ ] you can track the state of what tab is active in your provider

## Navigation

You should use conditional rendering to show different components inside of the `Section` components using react children. The specifications are as follows...

### when no tab is active

- [ ] show the `Dogs` component
- [ ] the dogs we can see should be ALL OF THE DOGS FETCHED

### when the `favorited` tab is active

- [ ] shows the `Dogs` component
- [ ] the dogs we can see should be ONLY THE DOGS WHERE `isFavorite` IS TRUE

### when the `unfavorited` tab is active

- [ ] should show the `Dogs` component
- [ ] the selected dogs should be ONLY THE DOGS WHERE `isFavorite` IS FALSE

### when the create dog tab is active

- [ ] should show the `CreateDogForm` component
- [ ] should not show the `Dogs` component

### Tabs

- [ ] Should be black when active (You can add the `active` class to it to style an active tab correctly)
- [ ] Should be white when inactive
- [ ] Only zero - one tab should be active at a time
- [ ] Clicking on a tab should make it active and make all other tabs inactive
- [ ] Clicking an Active Tab should make it inactive

## Interacting With the API

- [ ] When the component loads, you should fetch all of the dogs from the server and store them in state
- [ ] When you click on a gray heart, it should turn red and the dog's `isFavorite` property should be set to `true` in the database
- [ ] When you click on a red heart, it should turn gray and the dog's `isFavorite` property should be set to `false` in the database
- [ ] When you click on the trash icon, it should delete the dog from the database and show the updated list of dogs
- [ ] When you create a dog, it should be added to the database

## Organizing your fetch calls

- [x] You should have a file called `api.ts` with a request object that contains all of your fetching functions
  - You can completely rip this file from your previous submission if you would like

## Interacting With Fetch Calls

- [ ] When the component loads, you should fetch all of the dogs from the server and store them in state
- [ ] That state should be used to render all the appropriate `DogCards` on the page
- [ ] Dogs where isFavorite is true should have a red heart
- [ ] Dogs where isFavorite is false should have a gray heart
- [ ] Clicking a gray heart on a dog should turn it red and update the database to set `isFavorite` to `true`
- [ ] Clicking a red heart on a dog should turn it gray and update the database to set `isFavorite` to `false`
- [ ] Clicking the trash icon on a dog should delete it from the database and update the list of dogs on the page
- [ ] Creating a dog should add it to the database and update the list of dogs on the page

## Loading States

If the data is still loading then...

- [ ] All inputs should be disabled
- [ ] Buttons should be disabled

## What happens when you submit the form

- [ ] When you submit the form, it should create a new dog in the database
- [ ] If you navigate to the `all` tab, you should see the new dog in the list of dogs
- [ ] If you navigate to the `favorited` tab, you should NOT see the new dog in the list of dogs
- [ ] If you navigate to the `unfavorited` tab, you should see the new dog in the list of dogs
- [ ] After the submission the form should be cleared, and the select should return to the default
- [ ] After submitting a toast notification from `react-hot-toast` should appear saying "Dog Created"

## Performance

- [ ] Clicking a heart or trash icon should trigger QUICKLY and not cause any loading UI.
- [ ] The create dog form should still submit pessimistically and provide a toast that it is done afterwards
- [ ] The create dog form should also be disabled according to the loading state of the fetch call
