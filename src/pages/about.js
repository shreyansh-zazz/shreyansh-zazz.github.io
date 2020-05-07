import React from "react"
import { graphql, Link } from "gatsby"
import ReactMarkdown from "react-markdown/with-html"

import SEO from "../components/seo"
import "../styles/index.scss"
import "../styles/components/block.scss"

export default class About extends React.Component {
  render() {
    let about = this.props.data.strapiAbout
    return (
      <div className="block-detail">
        <SEO title="About" pathname={this.props.location.pathname} />

        <ReactMarkdown source={about.about} escapeHtml={false} />

        <a className="u-dot" href={about.resume.url}>
          resume
        </a>
        {about.tags.map(({ name }) => {
          return (
            <span>
              &nbsp;|&nbsp;
              <Link className="u-dot" to={`/tags/${name}/`}>
                {name}
              </Link>
            </span>
          )
        })}
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
    strapiAbout {
      about
      email
      updated_at(formatString: "DD/MM/YYYY HH:MM:SS Z")
      name
      resume {
        url
        updated_at
      }
      tags {
        name
      }
    }
  }
`
