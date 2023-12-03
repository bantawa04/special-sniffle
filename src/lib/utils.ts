import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {BeerRequest, BeerResponse} from "@/interface";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertIngredientsToObject = (inputData: BeerRequest): BeerRequest => {
  if (inputData.ingredients && Array.isArray(inputData.ingredients)) {
    const ingredientsObject: { [key: string]: string } = {};


    inputData.ingredients.forEach(ingredient => {
      ingredientsObject[ingredient] = ingredient;
    });


    inputData.ingredients = ingredientsObject;
  }

  return inputData;
}
export const updateLocalStorage = (newData: BeerResponse) => {
  const existingDataString = localStorage.getItem('beerData');
  let existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
  existingData = existingData.concat(newData);

  localStorage.setItem('beerData', JSON.stringify(existingData));
};
