'use client';

import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import {
  EMI_TENURES,
  EMI_MIN_TICKET,
  allPrograms,
  formatINR,
  isEmiEligible,
} from '../data/certificationPrograms';

/**
 * What a programme fee costs per month at each tenure we offer.
 *
 * Nothing here is typed in. The programmes and their prices come from the
 * catalogue, the tenures from EMI_TENURES, the eligibility floor from
 * EMI_MIN_TICKET, and the monthly figure is price / tenure — the same
 * arithmetic monthlyEmi() runs at checkout. If a price moves, this chart
 * moves with it instead of quietly disagreeing with the page around it.
 *
 * The chart's point is that the bars shrink while the total does not: Axelis
 * charges nothing for spreading the payment. Whether the card issuer adds
 * interest is between the payer and the issuer, so the note says that rather
 * than implying a rate we do not set.
 *
 * It is a table, not a picture of one. Bars are drawn as widths on the cells,
 * so a screen reader reads real figures and the chart still works with CSS
 * off. That also means no axis can disagree with the numbers beside it.
 */

const PRESETS = allPrograms
  .filter((p) => isEmiEligible(p))
  .sort((a, b) => a.price - b.price)
  .slice(-3);

export default function EmiChart() {
  const [active, setActive] = useState(PRESETS.length - 1);
  if (!PRESETS.length) return null;

  const program = PRESETS[active] ?? PRESETS[0];
  const price = program.price;

  const rows = EMI_TENURES.map((months) => ({ months, monthly: Math.round(price / months) }));
  const max = Math.max(...rows.map((r) => r.monthly));
  const barWidth = scaleLinear().domain([0, max]).range([4, 100]);

  return (
    <figure className="emi-chart">
      <figcaption className="emi-head">
        <p className="label">Monthly outgo by tenure</p>
        <h3 className="emi-title">The instalment shrinks. The total does not.</h3>
      </figcaption>

      <div className="emi-tabs" role="tablist" aria-label="Choose a programme">
        {PRESETS.map((p, i) => (
          <button
            key={p.slug ?? p.title}
            id={`emi-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="emi-panel"
            onClick={() => setActive(i)}
            className={`emi-tab ${i === active ? 'is-active' : ''}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div id="emi-panel" role="tabpanel" aria-labelledby={`emi-tab-${active}`}>
        <table className="emi-table">
          <caption className="sr-only">
            Monthly instalment for {program.title} at {formatINR(price)}, across every tenure Axelis offers
          </caption>
          <thead>
            <tr>
              <th scope="col">Tenure</th>
              <th scope="col">Per month</th>
              <th scope="col" className="emi-total-head">Total to Axelis</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.months}>
                <th scope="row" className="emi-tenure">{r.months} months</th>
                <td className="emi-bar-cell">
                  <span className="emi-bar" style={{ width: `${barWidth(r.monthly)}%` }} aria-hidden="true" />
                  <span className="emi-value figure">{formatINR(r.monthly)}</span>
                </td>
                <td className="emi-total figure">{formatINR(price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="emi-note">
        Axelis adds nothing for paying monthly: every row above settles the same{' '}
        {formatINR(price)}. Your card issuer may charge its own interest on an EMI plan.
        That rate is set by them and shown by them before you confirm, so it is not ours
        to quote. Programmes priced {formatINR(EMI_MIN_TICKET)} and above are eligible.
      </p>
    </figure>
  );
}
