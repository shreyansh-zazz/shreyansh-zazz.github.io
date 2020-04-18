import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

class Books extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    const location = this.props.location
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Root" />
        {posts.map(({ node }) => {
          const type = node.frontmatter.type
          return type.includes("books") ? <Block node={node}></Block> : null
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
          }
        }
      }
    }
  }
`

export default Books
