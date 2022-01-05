import React from 'react'

import { RecipePostTemplate } from '../../templates/recipe-post'

const RecipePostPreview = ({ entry, getAsset, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const ingredients = entry.getIn(['data', 'ingredients'])
  const subRecipes = entry.getIn(['data', 'subRecipes'])
  return (
    <RecipePostTemplate
      content={widgetFor('body')}
      title={entry.getIn(['data', 'title'])}
      duration={entry.getIn(['data', 'duration'])}
      servings={entry.getIn(['data', 'servings']) || 1}
      ingredients={ingredients ? ingredients.toJS() : []}
      subRecipes={subRecipes ? subRecipes.toJS() : []}
      image={getAsset(entry.getIn(['data', 'image']))?.url}
      tags={tags ? tags.toJS() : []}
      source={entry.getIn(['data', 'source'])}
    />
  )
}

export default RecipePostPreview
