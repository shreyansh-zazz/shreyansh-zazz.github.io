const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          limit: 1000
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
        tagsGroup: allMarkdownRemark(
          filter: { frontmatter: { isPulished: { ne: false } } }
        ) {
          group(field: frontmatter___tags) {
            totalCount
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
