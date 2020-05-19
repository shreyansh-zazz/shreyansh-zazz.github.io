import React from "react"
import SEO from "../components/seo"

// Components
import { Link, graphql } from "gatsby"
import "../styles/components/tag.scss"
import Block from "../components/block"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <div>
      <SEO title={tagHeader} pathname={location.pathname} />
      <div className="tag-heading">
        <Link className="all-tags-link" to="/tags">
          All tags
        </Link>
        <h1>{tagHeader}</h1>
      </div>
      {edges.map(({ node }, i) => {
        return <Block key={node.fields.slug} node={node} index={i} />
      })}
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
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, isPulished: { ne: false } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            category
            tags
            date(formatString: "DD/MM/YYYY")
          }
          fields {
            slug
          }
          timeToRead
          html
          rawMarkdownBody
          excerpt
        }
      }
      totalCount
    }
  }
`
