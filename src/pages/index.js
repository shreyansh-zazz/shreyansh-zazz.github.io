import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class Index extends React.Component {
  render() {
    const posts = this.props.data.allStrapiBlock.edges
    return (
      <div>
        <SEO title="Root" />
        {posts.map(({ node }, i) => {
          return <Block key={node.slug} node={node} index={i}></Block>
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
    allStrapiBlock(sort: { fields: [created_at], order: DESC }) {
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
