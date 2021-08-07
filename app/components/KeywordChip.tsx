import { ReactNode } from "react"

export type KeywordChipProps = {
  text: string
  icon?: ReactNode
}

export const KeywordChip = (props: KeywordChipProps) => {
  const GREEN_KEYWORDS = ["OKAY", "CORRECT", "ENABLED", "SAFE"]
  const RED_KEYWORDS = [
    "RUNTIME_ERROR",
    "TIMEOUT",
    "WRONG",
    "EXPIRED",
    "UNKNOWN_ERROR",
    "DISABLED",
    "NO_FLAG",
    "VULN",
  ]
  const BLUE_KEYWORDS = ["DUPLICATE", "SKIPPED"]

  const upperText = props.text.toUpperCase()

  if (GREEN_KEYWORDS.find((elem) => elem === upperText) !== undefined) {
    return (
      <span className="chip chip-green">
        {props.text}
        {props.icon}
      </span>
    )
  } else if (RED_KEYWORDS.find((elem) => elem === upperText) !== undefined) {
    return (
      <span className="chip chip-red">
        {props.text}
        {props.icon}
      </span>
    )
  } else if (BLUE_KEYWORDS.find((elem) => elem === upperText) !== undefined) {
    return (
      <span className="chip chip-blue">
        {props.text}
        {props.icon}
      </span>
    )
  } else {
    return (
      <span className="chip">
        {props.text}
        {props.icon}
      </span>
    )
  }
}

export default KeywordChip
