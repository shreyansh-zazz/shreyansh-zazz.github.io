import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class Index extends React.Component {
  render() {
    var searchList = this.isSearching(this.props.location)

    const posts = searchList.results || this.props.data.allStrapiBlock.edges

    return (
      <div>
        <SEO title="Root" />
        {(() => {
          if (searchList.query)
            return <h1>Search results for "{searchList.query}"</h1>
        })()}
        {posts.map((node, i) => {
          if (!searchList.results) node = node.node
          return <Block key={node.slug} node={node} index={i}></Block>
        })}
      </div>
    )
  }

  isSearching(location) {
    if (location && location.state)
      if (location.state.query)
        return {
          query: location.state.query,
          results: location.state.results,
        }
    return {
      query: false,
      results: false,
    }
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
