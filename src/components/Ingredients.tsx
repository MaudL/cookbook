import React, { useState, useMemo, useEffect } from "react";
import { Typography, IconButton, styled, Box } from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

interface Ingredient {
  quantity?: number;
  unit?: string;
  name: string;
}

function strToIngredient(ingredient: string): Ingredient | undefined {
  const regex = /^([0-9.]+)([a-zA-Zèàé]*) (.*)$/gi;

  if (regex.test(ingredient)) {
    // reset regex
    regex.lastIndex = 0;
    const args = regex.exec(ingredient);
    if (!args) {
      return undefined;
    }
    return {
      quantity: Number.parseFloat(args[1]),
      unit: args[2] || undefined,
      name: args[3],
    };
  } else {
    return { name: ingredient };
  }
}

const ServingsSelector = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: 150,
}));

const Unit = styled("span")({
  fontWeight: 500,
});

interface Props {
  ingredients: string[];
  servings: number;
  subRecipes?: {
    title?: string,
    ingredients?: string[]
  }[]
}

function formatNumber(number: number): string {
  const str = number.toString();
  if (str.indexOf(".") !== -1) {
    return number.toFixed(2);
  }
  return str;
}

export default function Ingredients({
  ingredients,
  servings: servingsProp,
  subRecipes
}: Props) {
  const [servings, setServings] = useState<number>(servingsProp);
  useEffect(() => {
    setServings(servingsProp);
  }, [servingsProp]);

  return (
    <div>
      <Typography variant="h6">Personnes :</Typography>
      <ServingsSelector>
        <IconButton
          aria-label="minus"
          onClick={() => {
            if (servings > 1) {
              setServings(servings - 1);
            }
          }}
        >
          <MinusIcon />
        </IconButton>
        <Typography>{servings}</Typography>
        <IconButton aria-label="plus" onClick={() => setServings(servings + 1)}>
          <PlusIcon />
        </IconButton>
      </ServingsSelector>
      <Typography variant="h6">Ingrédients :</Typography>
      <IngredientsList ingredients={ingredients} quantityFactor={servings / servingsProp} />
      {subRecipes?.map(subRecipe =>
        <Box mt={1}>
          <Typography variant="subtitle1">{subRecipe.title}</Typography>
          <IngredientsList ingredients={subRecipe.ingredients} quantityFactor={servings / servingsProp} />
        </Box>
      )}
    </div>
  );
}

interface IngredientsListProps {
  ingredients?: string[];
  quantityFactor: number
}

function IngredientsList({ ingredients: ingredientsProp, quantityFactor }: IngredientsListProps) {
  const parsedIngredients = useMemo(
    () => (ingredientsProp || []).map(strToIngredient).filter((x) => x) as Ingredient[],
    [ingredientsProp]
  );
  const ingredients = useMemo(() => {
    return parsedIngredients.map((i) => ({
      ...i,
      quantity: i.quantity && (i.quantity * quantityFactor),
    }));
  }, [parsedIngredients, quantityFactor]);

  return <>
    {ingredients.map((ingredient, index) => (
      <Typography key={index}>
        -{" "}
        {ingredient.quantity && (
          <Unit>
            {formatNumber(ingredient.quantity)}
            {ingredient.unit}{" "}
          </Unit>
        )}
        {ingredient.name}
      </Typography>
    ))}
  </>
}