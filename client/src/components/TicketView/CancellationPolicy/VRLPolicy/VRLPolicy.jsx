export default function VRLPolicy({ cancellationPolicy }) {
  return (
    <>
      <li>
        <h3 className="pb-3">{"Cancellation Policy:"}</h3>
        <ul>
          {cancellationPolicy?.map((policy, index) => {
            const { FromMinutes, ToMinutes, DeductPercent, RefundPercent } =
              policy;

            const from = FromMinutes / 60;
            const to = ToMinutes / 60;
            const fromTime = ToMinutes === 0 ? "Before" : "Within";

            return (
              <li key={index}>
                <p>
                  {fromTime} {from} hour {ToMinutes !== 0 && `- ${to} hour`}:
                  Cancellation Rate: {DeductPercent}%, Refund Percent:{" "}
                  {RefundPercent}
                  %,
                </p>
              </li>
            );
          })}

          {/* Cancellation Remarks */}
          {cancellationPolicy && cancellationPolicy.length > 0 ? (
            <li>{cancellationPolicy[cancellationPolicy.length - 1].Remarks}</li>
          ) : (
            ""
          )}
        </ul>
      </li>
    </>
  );
}
