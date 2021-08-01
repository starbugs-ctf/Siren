import { Router } from "blitz"
import { ArrowLeftIcon } from "@heroicons/react/solid"

export const BackButton = () => {
  return (
    <button className="back-button" onClick={() => Router.back()}>
      <ArrowLeftIcon className="w-8 h-8" />
    </button>
  )
}

export default BackButton
