import React from "react"
import { Link } from "gatsby"

import "../styles/components/block.scss"

export default class Block extends React.Component {
  node
  index = null

  constructor(props) {
    super(props)

    this.node = Object.assign(
      props.node,
      props.node.frontmatter,
      props.node.fields
    )
    if (props.index >= 0)
      this.index = <div className="sn">{props.index + "."}</div>
  }

  getTypeColorClass() {
    switch (this.node.category) {
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
    return (
      <div className="block">
        {this.index}
        <div className="content">
          <Link className="title" to={this.node.slug}>
            {this.node.title}
          </Link>
          <p className="desc"> {this.node.description || this.node.excerpt}</p>
          <div className="meta">
            <span>
              <Link
                className={"category " + this.getTypeColorClass()}
                to={this.node.category}
              >
                {this.node.category}
              </Link>
              &nbsp;|&nbsp;
              {this.node.timeToRead}min &nbsp;|&nbsp;
              {this.node.date}
              &nbsp;|&nbsp;
            </span>
            <span>
              {this.node.tags?.map((name, i) => {
                var linkTag = (
                  <span>
                    ,&nbsp;
                    <Link className="tag" to={"tags/" + name}>
                      {name}
                    </Link>
                  </span>
                )
                if (!i)
                  linkTag = (
                    <span>
                      <Link className="tag" to={"tags/" + name}>
                        {name}
                      </Link>
                    </span>
                  )
                return linkTag
              })}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
