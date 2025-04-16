'use client'

import { useRef } from "react"
import { Provider } from "react-redux"
import { AppStore, makeStore } from "@/stores"

interface StoreProviderProps {
  children: React.ReactNode
}

function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {

    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export { StoreProvider }