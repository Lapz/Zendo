import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from "mobx-state-tree"

import makeInspectable from "mobx-devtools-mst"

import { createContext, useContext } from "react"

let store: IStore = null as any

export const Store = types.model({
  lastUpdate: types.Date
})

export type IStore = Instance<typeof Store>

export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export const storeContext = createContext<IStore | null>(null)

export const StoreProvider: React.FC<{}> = ({ children }) => {
  const storeInstance = store

  return (
    <storeContext.Provider value={storeInstance}>
      {children}
    </storeContext.Provider>
  )
}

export const useStore = () => {
  const storeInstance = useContext(storeContext)

  if (!storeInstance) {
    throw new Error("useStore must be used within a StoreProvider.")
  }

  makeInspectable(storeInstance)

  return storeInstance
}

export const initializeStore = (isServer: boolean, snapshot = null) => {
  if (isServer) {
    store = Store.create({
      lastUpdate: Date.now()
    })
  }

  if (store === null) {
    store = Store.create({
      lastUpdate: Date.now()
    })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}
