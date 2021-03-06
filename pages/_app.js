import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Web3ReactProvider } from "@web3-react/core";
import { UserProvider } from "components/UserContext";
import PageChange from "components/PageChange/PageChange.js";
import { Web3Provider } from "@ethersproject/providers";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ToastContainer } from "react-toastify";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/nextjs-argon-dashboard-pro.scss?v1.1.0";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "../theme";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(<PageChange path={url} />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {}
  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  getLibrary = (provider) => {
    return new Web3Provider(provider);
  };

  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Singularity DAO</title>
        </Head>
        <script
          type="text/javascript"
          src="https://singularitynet.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/sb53l8/b/2/bc54840da492f9ca037209037ef0522a/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-GB&collectorId=cf55b16d"
        ></script>
        <ThemeProvider>
          <Web3ReactProvider getLibrary={this.getLibrary}>
            <UserProvider>
              <Layout>
                <ApolloProvider client={client}>
                  <Component {...pageProps} />
                  <ToastContainer
                    position="top-right"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    draggable={false}
                    pauseOnVisibilityChange
                    closeOnClick
                    pauseOnHover
                  />
                </ApolloProvider>
              </Layout>
            </UserProvider>
          </Web3ReactProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
