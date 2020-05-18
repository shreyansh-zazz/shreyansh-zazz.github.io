import React from "react"

import Header from "./header"
import "../styles/components/layout.scss"

const Layout = ({ location, title, children }) => {
  return (
    <div className="container">
      <Header title={title} location={location} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
