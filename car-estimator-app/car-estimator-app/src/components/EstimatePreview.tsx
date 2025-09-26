import React from "react";
import styled from "styled-components";
import { Estimate } from "../types";
import { fmt, sumItems, lineTotal, lineTax } from "../utils/currency";

const Wrapper = styled.div`
  width: 794px; /* ~A4 width at 96dpi */
  background: #10131a;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 24px;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    "Helvetica Neue", Arial;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const Brand = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  img {
    height: 40px;
    border-radius: 8px;
  }
  .name {
    font-size: 20px;
    font-weight: 700;
  }
  .sub {
    color: ${({ theme }) => theme.colors.subtle};
    font-size: 12px;
  }
`;
const Title = styled.div`
  text-align: right;
  .label {
    color: ${({ theme }) => theme.colors.subtle};
    font-size: 12px;
  }
  .value {
    font-size: 14px;
  }
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.panel};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 14px;
  margin: 12px 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 8px;
  font-size: 13px;
  .label {
    color: ${({ theme }) => theme.colors.subtle};
    font-size: 12px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 10px;
  }
  th {
    text-align: left;
    color: ${({ theme }) => theme.colors.subtle};
    font-weight: 600;
  }
  td.qty,
  td.rate,
  td.tax,
  td.total {
    text-align: right;
    white-space: nowrap;
  }
`;

const Totals = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 12px;
  .box {
    background: ${({ theme }) => theme.colors.panel};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    padding: 12px;
  }
  .right {
    justify-self: end;
    width: 100%;
  }
  .line {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    .k {
      color: ${({ theme }) => theme.colors.subtle};
    }
    .v {
      font-weight: 600;
    }
  }
  .grand {
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
    padding-top: 8px;
    margin-top: 8px;
    .v {
      color: ${({ theme }) => theme.colors.accent};
      font-size: 16px;
    }
  }
`;

// NEW: Footer
const Footer = styled.div`
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtle};

  .left {
    white-space: pre-line;
  }
  .right {
    display: grid;
    gap: 8px;
  }
  .sig {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 16px;
  }
  .line {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    height: 24px;
    width: 60%;
  }
`;

// (Optional) ensure there is **no extra bottom padding** beyond this footer
const EndSpacer = styled.div`
  height: 0;
`;

type Props = { data: Estimate; forwardedRef?: React.Ref<HTMLDivElement> };

export const EstimatePreview: React.FC<Props> = ({ data, forwardedRef }) => {
  const { subtotal, tax, grand } = sumItems(data.items);
  const discount = ((data.discountPct || 0) / 100) * grand;
  const grandAfterDiscount = grand - discount;

  return (
    <Wrapper ref={forwardedRef as any}>
      <Header>
        <Brand>
          {data.shop.logoUrl ? (
            <img src={data.shop.logoUrl} alt="logo" />
          ) : null}
          <div>
            <div className="name">{data.shop.name || "Your Workshop"}</div>
            <div className="sub">
              {data.shop.address || ""}{" "}
              {data.shop.phone ? `• ${data.shop.phone}` : ""}{" "}
              {data.shop.gstin ? `• GSTIN: ${data.shop.gstin}` : ""}
            </div>
          </div>
        </Brand>
        <Title>
          <div className="label">Estimate No</div>
          <div className="value">{data.estimateNo}</div>
          <div className="label" style={{ marginTop: 8 }}>
            Date
          </div>
          <div className="value">{data.date}</div>
        </Title>
      </Header>

      <Section>
        <Row>
          <div>
            <span className="label">Customer</span>
            <span>{data.customer.name || "-"}</span>
            <span className="label">Phone</span>
            <span>{data.customer.phone || "-"}</span>
          </div>
          <div>
            <span className="label">Vehicle</span>
            <span>
              {[data.vehicle.make, data.vehicle.model, data.vehicle.year]
                .filter(Boolean)
                .join(" ") || "-"}
            </span>
            <span className="label">Reg • Color</span>
            <span>
              {[data.vehicle.regNo, data.vehicle.colorCode]
                .filter(Boolean)
                .join(" • ") || "-"}
            </span>
          </div>
        </Row>
      </Section>

      <Section>
        <Row>
          <div>
            <span className="label">Paint Type</span>
            <span>{data.job.paintType || "-"}</span>
          </div>
          <div>
            <span className="label">Due Date</span>
            <span>{data.job.dueDate || "-"}</span>
          </div>
        </Row>
        {data.job.notes ? (
          <div style={{ marginTop: 10 }}>
            <div className="label">Notes</div>
            <div>{data.job.notes}</div>
          </div>
        ) : null}
      </Section>

      <Section>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 90 }}>Type</th>
              <th>Description</th>
              <th className="qty" style={{ width: 70 }}>
                Qty
              </th>
              <th className="rate" style={{ width: 100 }}>
                Rate
              </th>
              <th className="tax" style={{ width: 80 }}>
                Tax %
              </th>
              <th className="total" style={{ width: 110 }}>
                Line Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((it, i) => {
              const sub = lineTotal(it.qty || 0, it.rate || 0);
              const tx = lineTax(sub, it.taxPct || 0);
              return (
                <tr key={i}>
                  <td>{it.type}</td>
                  <td>{it.description}</td>
                  <td className="qty">{it.qty}</td>
                  <td className="rate">{fmt(it.rate, data.currency)}</td>
                  <td className="tax">{(it.taxPct || 0).toFixed(0)}%</td>
                  <td className="total">{fmt(sub + tx, data.currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Section>

      <Totals>
        <div className="box">
          <div style={{ fontSize: 12, color: "#9aa3b2" }}>
            * This is an estimate. Final invoice may vary due to additional
            parts, labor, or color matching adjustments.
          </div>
        </div>
        <div className="box right">
          <div className="line">
            <div className="k">Subtotal</div>
            <div className="v">{fmt(subtotal, data.currency)}</div>
          </div>
          <div className="line">
            <div className="k">Tax</div>
            <div className="v">{fmt(tax, data.currency)}</div>
          </div>
          {data.discountPct ? (
            <div className="line">
              <div className="k">Discount ({data.discountPct}%)</div>
              <div className="v">- {fmt(discount, data.currency)}</div>
            </div>
          ) : null}
          <div className="line grand">
            <div className="k">Grand Total</div>
            <div className="v">{fmt(grandAfterDiscount, data.currency)}</div>
          </div>
        </div>
      </Totals>

      {/* NEW Footer */}
      <Footer>
        <div className="left">
          Thank you for choosing {data.shop.name || "our workshop"}.{"\n"}Please
          review this estimate carefully. Prices are valid for 7 days.
          {"\n"}Paint shade may vary slightly due to age/fade of existing
          panels.
        </div>
        <div className="right">
          <div className="sig">
            <div>Customer Signature</div>
            <div className="line" />
          </div>
          <div className="sig">
            <div>Authorized By</div>
            <div className="line" />
          </div>
          <div style={{ textAlign: "right", fontSize: 11, color: "#8f97aa" }}>
            Powered by VSS Estimate • {new Date().toLocaleDateString()}
          </div>
        </div>
      </Footer>

      <EndSpacer />
    </Wrapper>
  );
};
