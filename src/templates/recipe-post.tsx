import BackIcon from '@heroicons/react/solid/ChevronLeftIcon'
import { graphql, Link } from 'gatsby'
import React, { ReactNode, FunctionComponent } from 'react'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import Ingredients from '../components/Ingredients'
import Tag from '../components/Tag'

interface RecipePostTemplateProps {
  content: string | ReactNode
  title: string
  duration: string
  servings: number
  ingredients: string[]
  subRecipes?: {
    title?: string
    ingredients?: string[]
  }[]
  image?: string
  tags: string[]
  contentComponent?: FunctionComponent<{ content: any }>
  helmet?: ReactNode
}

export const RecipePostTemplate = ({
  content,
  contentComponent,
  title,
  duration,
  servings,
  ingredients,
  subRecipes,
  image,
  tags,
  helmet,
}: RecipePostTemplateProps) => {
  const RecipeContent = contentComponent || Content

  return (
    <div className="flex flex-col md:flex-row">
      {helmet || ''}
      <div className="left-panel md:min-w-[300px] md:max-w-[300px] md:h-screen p-8 bg-purple-700 text-white text-xl space-y-4">
        <Link to="/">
          <BackIcon className="h-5 w-5 inline" /> Retour
        </Link>
        {image && (
          <div
            className="h-80 md:h-48 bg-center bg-cover"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        {duration && (
          <p>
            <span className="font-bold">Durée :</span> {duration}
          </p>
        )}
        <Ingredients ingredients={ingredients} servings={servings} subRecipes={subRecipes} />
      </div>

      <div className="p-8 h-screen md:overflow-y-auto">
        <p className="text-6xl mb-1">{title}</p>
        <div className="spacing-x-2 mb-4">
          {tags.map(tag => (
            <Tag key={tag} name={tag} />
          ))}
        </div>

        <RecipeContent content={content} />
      </div>
    </div>
  )
}

export default function RecipePost({ data }: Props) {
  const { markdownRemark: recipe } = data

  return (
    <RecipePostTemplate
      content={recipe.html}
      contentComponent={HTMLContent}
      helmet={
        <Helmet>
          <title>{recipe.frontmatter.title}</title>
        </Helmet>
      }
      duration={recipe.frontmatter.duration}
      servings={recipe.frontmatter.servings}
      ingredients={recipe.frontmatter.ingredients}
      image={recipe.frontmatter.image?.childImageSharp.fluid.src}
      tags={recipe.frontmatter.tags}
      title={recipe.frontmatter.title}
    />
  )
}

interface Props {
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        duration: string
        servings: number
        ingredients: string[]
        image: {
          childImageSharp: { fluid: { src: string } }
        }
        tags: string[]
      }
    }
  }
}

export const pageQuery = graphql`
  query RecipePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        duration
        servings
        ingredients
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`
