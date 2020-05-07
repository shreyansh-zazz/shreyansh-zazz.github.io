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
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://notesss-cms.herokuapp.com`, // `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`block`, `tags`],
        singleTypes: [`about`],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `searchTags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          StrapiBlock: {
            title: (node) => node.title,
            searchTags: (node) => node.tags.map(({ name }) => name),
            tags: (node) => node.tags,
            slug: (node) => node.slug,
            description: (node) => node.description,
            category: (node) => node.category,
            created_at: (node) => node.created_at,
          },
        },
      },
    },
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
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
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
            serialize: ({ query: { site, allStrapiBlock } }) => {
              return allStrapiBlock.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  title: edge.node.title,
                  description: edge.node.description,
                  categories: [edge.node.category],
                  date: edge.node.created_at,
                  url:
                    site.siteMetadata.siteUrl +
                    edge.node.category +
                    "/" +
                    edge.node.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    edge.node.category +
                    "/" +
                    edge.node.slug,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.content,
                    },
                    {
                      "content:tags": edge.node.tags
                        .map(({ name }) => name)
                        .toString(),
                    },
                  ],
                })
              })
            },
            query: `
              {
                allStrapiBlock(sort: { fields: [created_at], order: DESC }) {
                  edges {
                    node {
                      title
                      description
                      content
                      category
                      tags {
                        name
                      }
                      updated_at
                      created_at
                      slug
                    }
                  }
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
