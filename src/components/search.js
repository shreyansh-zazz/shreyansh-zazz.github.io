import React from "react"
import { FaSearch } from "react-icons/fa"
import { StaticQuery, navigate } from "gatsby"
import { Index } from "elasticlunr"

export default class Search extends React.Component {
  searchIndex

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SearchIndex {
            siteSearchIndex {
              index
            }
          }
        `}
        render={(data) => {
          this.searchIndex = data.siteSearchIndex.index
          return (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search it out"
                onChange={this.search}
              />
              <div className="icon-link search-btn">
                <FaSearch />
              </div>
            </div>
          )
        }}
      />
    )
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.searchIndex)

  search = (evt) => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    navigate("/", {
      state: {
        query,
        results: this.index
          .search(query, { expand: true })
          .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      },
    })
  }
}
