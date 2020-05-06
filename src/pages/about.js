import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"

export default class About extends React.Component {
   render() {
    return (
      <div>
        <SEO title="About" pathname={this.props.location.pathname} />

        Coming Soon...
      </div>
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
  }
`
