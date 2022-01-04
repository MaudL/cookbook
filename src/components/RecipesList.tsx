import React from 'react'

import Tag from '../components/Tag'

interface Props {
  recipes: Array<{
    id: string
    image: string
    title: string
    tags: string[]
    url: string
  }>
  selectedTags: string[]
}

export default function RecipesList({ recipes, selectedTags }: Props) {
  if (recipes.length === 0) {
    return (
      <div className="-translate-y-10vh h-48 md:mx-8 p-2 md:p-4 rounded-md bg-white border border-gray-200 flex justify-center items-center">
        <p>Aucune recette trouvée.</p>
      </div>
    )
  }

  return (
    <div className="-translate-y-10vh md:mx-8 p-2 md:p-4 rounded-md bg-white border border-gray-200 grid gap-4 md:grid-cols-3">
      {recipes.map(recipe => (
        <a key={recipe.id} href={recipe.url}>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div
              className="h-48 bg-center bg-cover"
              style={{ backgroundImage: `url(${recipe.image})` }}
            />
            <div className="p-2">
              <p className="text-xl pb-2">{recipe.title}</p>
              <div className="space-x-1 flex flew-wrap">
                {recipe.tags.map(tag => (
                  <Tag key={tag} name={tag} selected={selectedTags.includes(tag)} />
                ))}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
