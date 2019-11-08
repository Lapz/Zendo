import { IStore, initializeStore, StoreProvider } from "../stores"
import React from "react"
import theme from "../theme/theme"
import App from "next/app"
import { getSnapshot } from "mobx-state-tree"
import { NextComponentType, NextPageContext } from "next"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"

interface IOwnProps {
  isServer: boolean
  initialState: IStore
}

export default class MyApp extends App<IOwnProps> {
  public static async getInitialProps({
    Component,
    ctx
  }: {
    Component: NextComponentType
    ctx: NextPageContext
  }) {
    const isServer = typeof window === "undefined"
    const store = initializeStore(isServer)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  private store: IStore

  constructor(props: any) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState) as IStore
  }

  public componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side")

    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles)
    }
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
