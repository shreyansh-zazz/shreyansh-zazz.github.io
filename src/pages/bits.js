import React from "react"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class Bits extends React.Component {
  render() {
    const posts = this.props.data.allStrapiBlock.edges
    return (
      <div>
        <SEO title="Root" />
        {posts.map(({ node }, i) => {
          const type = node.category
          return type.includes("bits") ? (
            <Block node={node} index={i}></Block>
          ) : null
        })}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allStrapiBlock(
      sort: { fields: [created_at], order: DESC }
      filter: { category: { eq: "bits" } }
    ) {
      edges {
        node {
          title
          description
          content
          category
          tags {
            name
          }
          updated_at
          created_at(formatString: "MMMM DD, YYYY")
          slug
        }
      }
    }
  }
`
