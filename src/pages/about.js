import React from "react"
import { graphql } from "gatsby"
import axios from "axios"

import SEO from "../components/seo"
import "../styles/index.scss"
import Block from "../components/block"

export default class About extends React.Component {
  state = {
    isLoading: true,
    activities: {},
  }

  componentDidMount() {
    this.getRefinedData()
  }

  async getRefinedData() {
    let activities = await this.fetchActivities()
    this.setState({
      activities: activities.data.map((data) => {
        if (data.type == "PushEvent" || "PullRequestEvent" || "IssuesEvent")
          return {
            id: data.id,
            eventType: data.type,
            created_at: data.created_at,
            payload: data.payload,
          }
        else return false
      }),
    })
  }

  fetchActivities() {
    return new Promise((resolve, reject) => {
      let githubActivity = axios.get(
        "https://api.github.com/users/shreyansh-zazz/events/public?page=1&per_page=10"
      )
      resolve(githubActivity)
    })
  }

  render() {
    return (
      <div>
        <SEO title="About" pathname={this.props.location.pathname} />

        {this.state.isLoading ? <h1>Coming soon...</h1> : null}
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
