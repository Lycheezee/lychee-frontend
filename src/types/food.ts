import { Nutrition } from "./nutritions";

export type IFood = {
  name: string;
  descriptions: string;
  images: string[];
  nutritions: Nutrition;
};
