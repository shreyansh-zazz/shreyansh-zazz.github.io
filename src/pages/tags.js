import React from "react"
import PropTypes from "prop-types"

import SEO from "../components/seo"
import { Link, graphql } from "gatsby"

import "../styles/components/tag.scss"
import colorVars from "../styles/__basics/vars.js"

export default class Tags extends React.Component {
  render() {
    const group = this.props.data.allStrapiBlock.group

    return (
      <div>
        <SEO
          title="Tags"
          setThemeColor={colorVars.$tagColor}
          pathname={this.props.location.pathname}
        />
        <div className="tags">
          <h1>Tags</h1>
          {group.map((tag) => (
            <Link className="tag" to={`/tags/${tag.fieldValue}/`}>
              {tag.fieldValue}({tag.totalCount})
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allStrapiBlock(limit: 2000) {
      group(field: tags___name) {
        fieldValue
        totalCount
      }
    }
  }
`
