import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import "../styles/index.scss"
import "../styles/components/block.scss"

export default class About extends React.Component {
  render() {
    return (
      <div className="block-detail">
        <SEO title="About" pathname={this.props.location.pathname} />

        <p>
          My name is Shreyansh Mehta and I practice programming. I am a{" "}
          <a
            class="u-dot"
            href="https://en.wikipedia.org/wiki/Software_development"
            target="_blank"
            rel="noopener noreferrer"
          >
            Software Developer
          </a>{" "}
          based in{" "}
          <a
            class="u-dot"
            href="https://goo.gl/maps/wi4qXcow2B9FcNe1A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bengaluru, India
          </a>
          , currently enrolled in{" "}
          <a
            class="u-dot"
            href="https://www.sap.com/india/about/careers/university-programs/students/vocational-training.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scholar Programme
          </a>{" "}
          <a
            class="u-dot"
            href="https://www.sap.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @SAP
          </a>
          . This place is where I share whatever I find, work on, or learn.
        </p>
        <p>
          Visit these links for more details: &nbsp;
          <a
            className="u-dot"
            href="https://res.cloudinary.com/notesss/image/upload/v1593021798/Shreyansh_Kumar_Mehta_Resume_12-06-2020-14-37-06_qgzgy4.pdf"
          >
            resume
          </a>
          &nbsp;|&nbsp;
          <Link className="u-dot" to="/tags/portfolio">
            portfolio
          </Link>
          &nbsp;|&nbsp;
          <Link className="u-dot" to="/tags/project">
            project
          </Link>
          &nbsp;|&nbsp;
          <Link className="u-dot" to="/tags/ui/ux">
            ui/ux
          </Link>
        </p>
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
