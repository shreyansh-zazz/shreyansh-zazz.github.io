import React from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown/with-html"

import SEO from "../components/seo"
import Block from "../components/block"
import colorVar from "../styles/__basics/vars"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.allStrapiBlock.edges[0].node
  const { previous, next } = pageContext
  const cover = post.cover ? post.cover.childImageSharp.resize : null

  return (
    <article className="block-detail">
      <SEO
        title={post.title}
        description={post.description}
        setThemeColor={`${colorVar["$" + post.category + "Color"]}`}
        pathname={location.pathname}
        image={cover}
      />

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
        <div className="center">{post.title}</div>
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
          cover {
            childImageSharp {
              resize(width: 720) {
                src
                width
                height
              }
            }
          }
          created_at(formatString: "DD/MM/YYYY HH:MM:SS Z")
        }
      }
    }
  }
`
