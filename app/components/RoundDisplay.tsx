import { useQuery } from "blitz"
import { format } from "date-fns"
import getAllRoundRanges from "app/queries/getAllRoundRanges"
import { getRoundDuration } from "app/roundUtil"
import { DATE_FORMAT } from "app/timeUtil"

type RoundDisplayProps = {
  round: number
}

export const RoundDisplay = (props: RoundDisplayProps) => {
  const [roundRanges] = useQuery(getAllRoundRanges, null)
  const roundDuration = getRoundDuration(roundRanges, props.round)

  return (
    <div className="round-display">
      <h1>Round {props.round}</h1>
      <p>From: {format(roundDuration.start, DATE_FORMAT)}</p>
      <p>To: {format(roundDuration.end, DATE_FORMAT)}</p>
    </div>
  )
}
