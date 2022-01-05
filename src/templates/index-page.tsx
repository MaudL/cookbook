import Fuse from 'fuse.js'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useState, useMemo } from 'react'
import Helmet from 'react-helmet'

import Footer from '../components/Footer'
import Hero from '../components/Hero'

import RecipesList from '../components/RecipesList'

const fuseOptions = {
  limit: 10,
  keys: ['title'],
  isCaseSensitive: false,
  includeMatches: true,
}

export interface Recipe {
  id: string
  title: string
  tags: string[]
  image?: IGatsbyImageData
  url: string
}

export default function IndexPage({ data }: Props) {
  const [searchString, setSearchString] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const recipes: Recipe[] = data.allMarkdownRemark.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.frontmatter.title,
    tags: edge.node.frontmatter.tags,
    image: edge.node.frontmatter.image?.childImageSharp.gatsbyImageData,
    url: edge.node.fields.slug,
  }))

  const tags = useMemo(() => {
    if (!recipes) {
      return undefined
    }
    const tags = recipes.reduce((acc, recipe) => {
      recipe.tags.forEach((t) => acc.add(t))
      return acc
    }, new Set<string>())
    return [...tags].sort()
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    if (!searchString && selectedTags.length === 0) {
      return recipes
    }
    let filteredBySearchString: Recipe[] = recipes
    if (searchString) {
      const fuse = new Fuse(recipes, fuseOptions)
      const results = fuse.search(searchString)
      filteredBySearchString = results.map(({ item }) => item)
    }

    if (selectedTags.length > 0) {
      return filteredBySearchString.filter(
        (r) =>
          r.tags.filter((t) => selectedTags.some((st) => st === t)).length === selectedTags.length,
      )
    } else {
      return filteredBySearchString
    }
  }, [recipes, searchString, selectedTags])

  return (
    <>
      <Helmet>
        <title>{data.markdownRemark.frontmatter.title}</title>
      </Helmet>

      <Hero
        title={data.markdownRemark.frontmatter.title}
        tags={tags || []}
        onSearchChange={setSearchString}
        onTagsChange={setSelectedTags}
      />

      <RecipesList recipes={filteredRecipes} selectedTags={selectedTags} />

      <Footer />
    </>
  )
}

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            tags: string[]
            image?: {
              childImageSharp: {
                gatsbyImageData: IGatsbyImageData
              }
            }
          }
        }
      }>
    }
  }
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "recipe-post" } } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
