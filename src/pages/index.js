import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class Index extends React.Component {
  render() {
    var searchList = this.isSearching(this.props.location)

    const posts = searchList.results || this.props.data.allMarkdownRemark.edges
    return (
      <div>
        <SEO title="Root" pathname={this.props.location.pathname} />
        {(() => {
          if (searchList.query)
            return <h1>Search results for "{searchList.query}"</h1>
        })()}
        {posts.map((node, i) => {
          if (!searchList.results) node = node.node
          return <Block key={node.fields.slug} node={node} index={i}></Block>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { isPulished: { ne: false } } }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            description
            tags
            title
            category
          }
          fields {
            slug
          }
          excerpt(format: PLAIN)
          html
        }
      }
    }
  }
`
