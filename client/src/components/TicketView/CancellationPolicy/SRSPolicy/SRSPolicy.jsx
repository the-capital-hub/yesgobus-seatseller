export default function SRSPolicy({ cancellationPolicy }) {
  let dataArray = cancellationPolicy.split(",");
  return (
    <div>
      <li>
        <h3 className="pb-3">{"Cancellation Policy:"}</h3>
        <ul>
          {dataArray.map((item, index) => {
            let [time, deductPercent] = item.split("|");
            time = time.split("-").join(" - ");
            deductPercent = +deductPercent;

            return (
              <li key={`${index}`}>
                {index !== dataArray.length - 1 ? (
                  isNaN(deductPercent) ? (
                    <p>
                      Within {time} hours: {item.split("|")[1]}
                    </p>
                  ) : (
                    <p>
                      Within {time} hours: Cancellation Rate: {deductPercent}%,
                      Refund Percent: {100 - deductPercent}%
                    </p>
                  )
                ) : (
                  <p>
                    Before {time.split("-")[0].trim()} hours: Cancellation Rate:{" "}
                    {deductPercent}%, Refund Percent: {100 - deductPercent}%
                  </p>
                )}
                {/* <p>{JSON.stringify(item)}</p> */}
              </li>
            );
          })}
        </ul>
      </li>
    </div>
  );
}
