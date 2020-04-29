import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"
import colorVars from "../styles/__basics/vars.js"

export default class Bytes extends React.Component {
  render() {
    const posts = this.props.data.allStrapiBlock.edges
    return (
      <div>
        <SEO
          title="Root"
          setThemeColor={colorVars.$bytesColor}
          pathname={this.props.location.pathname}
        />
        {posts.map(({ node }, i) => {
          const type = node.category
          return type.includes("bytes") ? (
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
      filter: { category: { eq: "bytes" } }
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
          created_at(formatString: "DD/MM/YYYY")
          slug
        }
      }
    }
  }
`
