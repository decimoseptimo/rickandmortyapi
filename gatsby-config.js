module.exports = {
  siteMetadata: {
    title: `The Rick and Morty API`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "RickAndMorty",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "ram",
        // Url to query from
        url: "https://rickandmortyapi.com/graphql",
      },
    },
    //Using this plugin as a shortcut to achieve the modal effect.
    //set overlayClassName & reactModalcontent to avoid a lot of boilerplate default styles
    //TODO: replace temp fork, see: https://github.com/lsirivong/gatsby-plugin-modal-routing/pull/60
    {
      resolve: `gatsby-plugin-modal-routing-3`,
      options: {
        // A selector to set react-modal's app root to, default is `#___gatsby`
        // See http://reactcommunity.org/react-modal/accessibility/#app-element
        appElement: "#___gatsby",

        // Object of props that will be passed to the react-modal container
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: {
          overlayClassName: "reactModaloverlay",
          className: "reactModalcontent",
        },
      },
    },
  ],
}
