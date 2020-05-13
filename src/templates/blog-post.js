import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Block from "../components/block"
import colorVar from "../styles/__basics/vars"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = Object.assign(
    data.markdownRemark,
    data.markdownRemark.fields,
    data.markdownRemark.frontmatter
  )
  const { previous, next } = pageContext
  const cover = post.coverURL ? post.coverURL.childImageSharp.resize : null

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

      {post.tocEnabled ? (
        post.tableOfContents ? (
          <div className="section">
            <h1>Table of content</h1>{" "}
            <div
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            ></div>
          </div>
        ) : null
      ) : null}
      <div
        className="section"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>

      <hr />
      <nav className="footer-links">
        <div className="left">
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </div>
        <div className="center">{post.frontmatter.title}</div>
        <div className="right">
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      fields {
        slug
      }
      frontmatter {
        category
        title
        tags
        description
        date(formatString: "HH:MM:SS DD MMMM, YYYY Z")
        tocEnabled
        coverURL {
          childImageSharp {
            resize(width: 720) {
              src
              width
              height
            }
          }
        }
      }
      html
      rawMarkdownBody
      timeToRead
      tableOfContents
    }
  }
`
