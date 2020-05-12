module.exports = {
  siteMetadata: {
    title: `Notesss`,
    author: `Shreyansh Zazz`,
    description: `Yet another blog on tech`,
    siteUrl: `https://notesss.com/`,
    social: {
      twitter: `shreyansh-zazz`,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "gatsby-remark-code-title",
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `searchTags`, `description`, `excerpt`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            description: (node) => node.frontmatter.description,
            searchTags: (node) => node.frontmatter.tags,
            frontmatter: (node) => node.frontmatter,
            fields: (node) => node.fields,
            excerpt: (node) => node.excerpt,
            html: (node) => node.html,
            rawMarkdownBody: (node) => node.rawMarkdownBody,
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-165261651-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  categories: [edge.node.frontmatter.category],
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: edge.node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.rawMarkdownBody,
                    },
                    {
                      "content:tags": edge.node.frontmatter.tags.toString(),
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
                  edges {
                    node {
                      frontmatter {
                        title
                        description
                        category
                        tags
                        date(formatString: "DD/MM/YYYY")
                      }
                      timeToRead
                      html
                      rawMarkdownBody
                      excerpt
                      fields {
                        slug
                      }
                    }
                  }
                  totalCount
                }
              }
            `,
            output: "/rss.xml",
            title: "Yet another blog on tech",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `notesss`,
        short_name: `notesss`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `content/assets/icon.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
