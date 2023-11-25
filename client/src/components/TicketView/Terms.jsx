import "./Terms.scss";
import { useState, useEffect } from "react";

export default function Terms({ cancellationPolicy, isVrl }) {

  const decodeCancellationPolicy = () => {
    const policyParts = cancellationPolicy.split(';');
    return policyParts.map(part => {
      const [fromTime, toTime, cancellationRate, percentageOrAbsolute] = part.split(':');
      console.log("fff", typeof (fromTime));
      return (
        <li key={part}>
          <p>
            {fromTime.trim() === '0' ? 'Within' : 'Before'} {toTime === '-1' ? `${fromTime} hours` : `${toTime} hours`}:
            Cancellation Rate: {cancellationRate}%, Type: {percentageOrAbsolute === '0' ? 'Percentage' : 'Absolute'}
          </p>
        </li>
      );
    });
  };

  return (
    <div className="terms">
      <h2>Terms and Conditions</h2>
      <ul>
        <li>
          <p>
            Yesgobus Travellers can book bus tickets online at the lowest ticket
            fares. Travellers prefer to choose their favorite bus to reserve
            online bus booking. You’re at the right place to find a wide range
            of Private buses and SRTC (State Road Transport Corporation) buses
            are available for bus booking online on bus.
          </p>
        </li>
        <li>
          <p>
            Passengers should arrive at the 15 min before the scheduled time of
            departure.
          </p>
        </li>
        <li>
          <p>
            Yesgobus is not responsible for any accident or any passenger
            losses.
          </p>
        </li>
        <li>
          <p>
            Cancellation charges are applicable on the original fare but not available on discount.
          </p>
        </li>
        <li>
          <h3>{isVrl ? "" : "Cancellation Policy:"}</h3>
          <ul>
            {isVrl ? "" : decodeCancellationPolicy()}
          </ul>
        </li>
      </ul>
    </div>
  );
}
