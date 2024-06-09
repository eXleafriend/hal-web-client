import { createContext } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HrefContext = createContext({ setHref: (_href: string) => {} })
