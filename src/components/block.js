import React from "react"
import { Link } from "gatsby"
import {ReactHelmet} from "react-helmet"

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

    this.getAd = this.getAd.bind(this)
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

  getAd() {
    if (this.index / 4 == 0) {
      return (
        <div>
          <ins
            class="adsbygoogle"
            style={{display: 'block'}}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-3+1f-3d+2z"
            data-ad-client="ca-pub-2540012146090441"
            data-ad-slot="9686879338"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        <div className="block">
          {this.index}
          <div className="content">
            <Link className="title" to={this.node.slug}>
              {this.node.title}
            </Link>
            <p className="desc">
              {" "}
              {this.node.description || this.node.excerpt}
            </p>
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
        {this.getAd()}
      </>
    )
  }
}
