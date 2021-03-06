import React from "react"
import PropTypes from "prop-types"

import SEO from "../components/seo"
import { Link, graphql } from "gatsby"

import "../styles/components/tag.scss"
import colorVars from "../styles/__basics/vars.js"

export default class Tags extends React.Component {
  render() {
    const group = this.props.data.allMarkdownRemark.group

    return (
      <div>
        <SEO
          title="Tags"
          setThemeColor={colorVars.$tagColor}
          pathname={this.props.location.pathname}
        />
        <div className="tags">
          <h1>Tags</h1>
          <div className="tags-container">
            {group.map((tag) => (
              <Link className="tag" to={`/tags/${tag.fieldValue}/`}>
                {tag.fieldValue}({tag.totalCount})
              </Link>
            ))}
          </div>
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
    allMarkdownRemark(filter: { frontmatter: { isPulished: { ne: false } } }) {
      group(field: frontmatter___tags) {
        totalCount
        fieldValue
      }
    }
  }
`
