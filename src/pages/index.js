import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class Index extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    const location = this.props.location
    console.log(this.props.data);
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Root" />
        {posts.map(({ node }) => {
          return <Block node={node}></Block>
        })}
      </Layout>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            type
            tags
          }
        }
      }
    }
    allStrapiBlock {
      edges {
        node {
          title
        }
      }
    }
  }
`
