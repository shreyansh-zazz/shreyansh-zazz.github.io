import React from "react"
import {
  FaCog,
  FaSearch,
  FaGithub,
  FaDribbble,
  FaPinterest,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"
import { Link } from "gatsby"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConnectLinks: false,
    }

    this.toggleShowConnectLinks = this.toggleShowConnectLinks.bind(this)
  }

  toggleShowConnectLinks(e) {
    this.setState((state) => ({
      showConnectLinks: !state.showConnectLinks,
    }))
  }

  render() {
    return (
      <header className="header">
        <div className="site-logo">{this.props.title}</div>
        <div className="useful-links">
          <Link to="/" className="link" activeClassName="active">
            Root
          </Link>
          <div className="separator">|</div>
          <Link to="/bits/" className="link" activeClassName="active">
            Bits
          </Link>
          <div className="separator">|</div>
          <Link to="/bytes/" className="link" activeClassName="active">
            Bytes
          </Link>
          <div className="separator">|</div>
          <Link to="/books/" className="link" activeClassName="active">
            Books
          </Link>
          <div className="separator">|</div>
          <Link to="/tags/" className="link" activeClassName="active">
            Tags
          </Link>
        </div>
        <div className="pref-links">
          <div className="search-bar">
            <input type="text" placeholder="Search it out" />
            <div className="icon-link search-btn">
              <FaSearch />
            </div>
          </div>
          <div className="pref-link-wrap">
            <Link to="/about/" className="link" activeClassName="active">
              About
            </Link>
            <div className="separator">|</div>
            <div
              role="navigation"
              className={
                this.state.showConnectLinks ? "connect active" : "connect"
              }
              onClick={this.toggleShowConnectLinks}
            >
              Connect
              <div
                className={
                  this.state.showConnectLinks
                    ? "connect-link-wrap display-b"
                    : "connect-link-wrap"
                }
              >
                <div className="connect-links">
                  <a
                    className="connect-link github"
                    _target="_blank"
                    href="https://github.com/shreyansh-zazz"
                  >
                    <FaGithub className="icon" />
                    <div className="handler">@shreyansh-zazz</div>
                  </a>
                  <a
                    className="connect-link dribbble"
                    _target="_blank"
                    href="https://github.com/shreyansh-zazz"
                  >
                    <FaDribbble className="icon" />
                    <div className="handler">@shreyansh_zazz</div>
                  </a>
                  <a
                    className="connect-link pinterest"
                    _target="_blank"
                    href="https://in.pinterest.com/shreyanshzazz/"
                  >
                    <FaPinterest className="icon" />
                    <div className="handler">@shreyanshzazz</div>
                  </a>
                  <a
                    className="connect-link twitter"
                    _target="_blank"
                    href="https://twitter.com/shreyansh_zazz"
                  >
                    <FaTwitter className="icon" />
                    <div className="handler">@shreyansh_zazz</div>
                  </a>
                  <a
                    className="connect-link linkedin"
                    _target="_blank"
                    href="https://www.linkedin.com/in/shreyansh-zazz/"
                  >
                    <FaLinkedin className="icon" />
                    <div className="handler">@shreyansh-zazz</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="separator">|</div>
            <div className="icon-link">
              <FaCog />
            </div>
          </div>
        </div>
      </header>
    )
  }
}
