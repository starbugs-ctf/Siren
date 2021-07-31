import { useQuery } from "blitz"
import getAllRoundRanges from "app/queries/getAllRoundRanges"
import getRoundDuration from "app/queries/getRoundDuration"
import { format } from "date-fns"

type RoundDisplayProps = {
  round: number
}

const DATE_FORMAT = "MMM dd HH:mm:ss"

export const RoundDisplay = (props: RoundDisplayProps) => {
  const [roundRanges] = useQuery(getAllRoundRanges, null)
  const [roundDuration] = useQuery(
    getRoundDuration,
    { roundId: props.round, roundRanges },
    { enabled: roundRanges !== undefined }
  )

  return (
    <div className="round-display">
      <h1>Round {props.round}</h1>
      {roundDuration ? (
        <>
          <p>From: {format(roundDuration.start, DATE_FORMAT)}</p>
          <p>To: {format(roundDuration.end, DATE_FORMAT)}</p>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
