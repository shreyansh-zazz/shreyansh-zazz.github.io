import React from "react"
import SEO from "../components/seo"

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allStrapiBlock
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <div>
      <SEO title={tagHeader} />
      <div>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            return (
              <li key={node.slug}>
                <Link to={node.category + "/" + node.slug}>{node.title}</Link>
              </li>
            )
          })}
        </ul>
        {/*
                This links to a page that does not yet exist.
                You'll come back to it!
              */}
        <Link to="/tags">All tags</Link>
      </div>
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allStrapiBlock(
      limit: 2000
      sort: { fields: [created_at], order: DESC }
      filter: { tags: { elemMatch: { name: { in: [$tag] } } } }
    ) {
      totalCount
      edges {
        node {
          slug
          title
          category
        }
      }
    }
  }
`
