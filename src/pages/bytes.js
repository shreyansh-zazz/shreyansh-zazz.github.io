import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"
import colorVars from "../styles/__basics/vars.js"

export default class Bytes extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const cover = this.props.data.imageSharp
      ? this.props.data.imageSharp.resize
      : null
    return (
      <div>
        <SEO
          title="Bytes"
          setThemeColor={colorVars.$bytesColor}
          pathname={this.props.location.pathname}
          image={cover}
        />
        {posts.map(({ node }, i) => {
          return <Block node={node} index={i}></Block>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: {
        frontmatter: { category: { eq: "bytes" }, isPulished: { ne: false } }
      }
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
    imageSharp(original: { src: { regex: "/bytes/" } }) {
      resize(width: 720) {
        height
        width
        src
      }
    }
  }
`
