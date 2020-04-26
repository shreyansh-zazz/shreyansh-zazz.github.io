import React from "react"
import { Link } from "gatsby"

import "../styles/components/block.scss"

export default class Block extends React.Component {
  node
  index = null

  constructor(props) {
    super(props)

    this.node = props.node
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
          <Link
            className="title"
            to={this.node.category + "/" + this.node.slug}
          >
            {this.node.title}
          </Link>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: this.node.description }}
          ></p>
          <p className="meta">
            <Link
              className={"category " + this.getTypeColorClass()}
              to={this.node.category + "/" + this.node.slug}
            >
              {this.node.category}
            </Link>
            &nbsp;|&nbsp;
            {this.node.tags?.map(({ name }, i) => {
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
            &nbsp;|&nbsp;
            {this.node.created_at}
          </p>
        </div>
      </div>
    )
  }
}
