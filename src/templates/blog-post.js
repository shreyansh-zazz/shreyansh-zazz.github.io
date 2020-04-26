import React from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import SEO from "../components/seo"
import Block from "../components/block"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.allStrapiBlock.edges[0].node
  const { previous, next } = pageContext

  return (
    <article className="block-detail">
      <SEO title={post.title} description={post.description} />

      <Block key={post.slug} node={post}></Block>

      <ReactMarkdown
        className="section"
        source={post.content}
        escapeHtml={false}
      />
      <hr />
      <nav className="footer-links">
        <div className="left">
        {previous && (
          <Link to={previous.category + "/" + previous.slug} rel="prev">
            ← {previous.title}
          </Link>
        )}
        </div>
        <div className="center">
          {post.title}
        </div>
        <div className="right">
        {next && (
          <Link to={next.category + "/" + next.slug} rel="next">
            {next.title} →
          </Link>
        )}
        </div>
      </nav>
    </article>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    allStrapiBlock(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          UID
          title
          description
          category
          tags {
            id
            name
          }
          content
          slug
          created_at(formatString: "DD/MM/YYYY HH:MM:SS Z")
        }
      }
    }
  }
`
