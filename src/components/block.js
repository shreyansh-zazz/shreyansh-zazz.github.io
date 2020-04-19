import React from "react"
import { Link } from "gatsby"

export default class Block extends React.Component {
  node

  constructor(props) {
    super(props)

    this.node = props.node
  }

  getTypeColorClass() {
    switch (this.node.frontmatter.type) {
      case "bits":
        return "bits"
      case "bytes":
        return "bytes"
      case "books":
        return "books"
      default:
        return null
    }
  }

  render() {
    const node = this.node
    const title = node.frontmatter.title || node.fields.slug
    const type = node.frontmatter.type
    const tags = node.frontmatter.tags
    return (
      <article
        className={["block", this.getTypeColorClass()].join(" ")}
        key={node.fields.slug}
      >
        <div className="block-content">
          <div className="date">
            <small>{node.frontmatter.date}</small>
          </div>
          <div className="content">
            <Link to={`/${type.toLowerCase()}/`} className="meta">
              {type}
            </Link>{" "}
            <i>{tags}</i>
            <div className="title">
              <Link to={node.fields.slug} className="heading">
                {title}
              </Link>
              {type.includes("bits") ? (
                <div className="description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    )
  }
}
