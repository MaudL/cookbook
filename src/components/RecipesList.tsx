import { Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import Tag from '../components/Tag'

interface Props {
  recipes: Array<{
    id: string
    image?: IGatsbyImageData
    title: string
    tags: string[]
    url: string
  }>
  selectedTags: string[]
}

export default function RecipesList({ recipes, selectedTags }: Props) {
  if (recipes.length === 0) {
    return (
      <div className="-translate-y-10vh h-48 md:mx-8 p-2 md:p-4 rounded-md bg-white border border-gray-300 flex justify-center items-center">
        <p>Aucune recette trouvée.</p>
      </div>
    )
  }

  return (
    <div className="-translate-y-10vh md:mx-8 p-2 md:p-4 rounded-md bg-white border border-gray-300 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          to={recipe.url}
          className="border border-gray-300 rounded-md overflow-hidden hover:border-2 hover:-m-[1px]"
        >
          {recipe.image ? (
            <GatsbyImage className="h-48 border-b" image={recipe.image} alt={recipe.title} />
          ) : (
            <div className="h-48 border-b bg-gray-300" />
          )}
          <div className="p-2">
            <p className="text-xl pb-2 overflow-hidden whitespace-nowrap text-ellipsis">
              {recipe.title}
            </p>
            <div className="gap-1 flex flew-wrap">
              {recipe.tags.map((tag) => (
                <Tag key={tag} name={tag} selected={selectedTags.includes(tag)} />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
