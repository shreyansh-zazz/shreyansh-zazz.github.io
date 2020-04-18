import React from "react"
import classNames from "classnames"
import { Link } from "gatsby"

class Block extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const node = this.props.node
    const title = node.frontmatter.title || node.fields.slug
    const type = node.frontmatter.type
    return (
      <article
        className={classNames({
          block: true,
          bits: type.includes("bits"),
          bytes: type.includes("bytes"),
          books: type.includes("books"),
        })}
        key={node.fields.slug}
      >
        <div className="block-content">
          <div className="date">
            <small>{node.frontmatter.date}</small>
          </div>
          <div className="content">
            <Link to={`/${type.toLowerCase()}/`} className="meta">
              {type}
            </Link>
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

export default Block
