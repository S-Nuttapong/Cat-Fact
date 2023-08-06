import { useContext } from "react"
import { apiContext } from "./ApiProvider"

export const useApi = () => {
  const context = useContext(apiContext)
  if (!context) {
    throw new Error("useApi consumer must be wrapped by ApiProvider")
  }
  return context
}