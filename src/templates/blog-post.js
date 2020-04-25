import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.allStrapiBlock.edges[0].node
  const { previous, next } = pageContext

  return (
    <div>
      <SEO title={post.title} description={post.description} />
      <article>
        <header>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              display: `block`,
            }}
          >
            {post.created_at}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.category + "/" + previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.category + "/" + next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
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
          created_at
        }
      }
    }
  }
`
