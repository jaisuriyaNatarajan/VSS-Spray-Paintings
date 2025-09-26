import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Form, Field } from "react-final-form";
import { LineItems } from "./LineItems";
import { EstimatePreview } from "./EstimatePreview";
import { exportElementToPDF } from "../utils/pdf";
import { Estimate } from "../types";
import { theme } from "../theme";
import arrayMutators from "final-form-arrays";
import { getNextEstimateNo } from "../utils/estimateNo";
import VSSLogo from "../assets/logo";

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  display: grid;
  grid-template-columns: 580px 1fr;
  gap: 24px;
  padding: 24px;
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.panel};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 18px;
`;

const H = styled.h3`
  margin: 0 0 12px;
  font-size: 16px;
  color: #e6e6e6;
`;

const G = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  span.label {
    font-size: 12px;
    color: #a9b0c3;
    margin-bottom: 6px;
  }
  input,
  textarea {
    background: #121722;
    border: 1px solid #273046;
    color: #e6e6e6;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 13px;
    outline: none;
  }
  textarea {
    min-height: 80px;
  }
`;

const Full = styled(FieldWrap)`
  grid-column: 1 / -1;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  button {
    background: ${({ theme }) => theme.colors.accent};
    color: #0a0f18;
    border: 0;
    border-radius: 10px;
    padding: 10px 14px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const PreviewShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const initial: Estimate = {
  estimateNo: getNextEstimateNo(),
  date: new Date().toISOString().slice(0, 10),
  currency: "INR",
  customer: { name: "" },
  vehicle: { make: "", model: "", year: "", regNo: "", colorCode: "" },
  job: { paintType: "", notes: "", dueDate: "" },
  items: [],
  discountPct: 0,
  shop: {
    name: "VSS SPRAY PAINTING WOKS",
    address: "RBT Garden, Ponni weigh Bridge Service Road, Salem – 636 302",
    phone: "+91 9443340060 ",
    gstin: "33ASPPN4765Q1ZS",
    logoUrl: VSSLogo,
  },
};

export default function EstimateForm() {
  const previewRef = useRef<HTMLDivElement | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <Form<Estimate>
        onSubmit={() => {}}
        // Provide mutators directly from final-form-arrays so useForm().mutators works.
        mutators={{ ...arrayMutators }}
        initialValues={initial}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Page>
              <Panel>
                <H>Workshop</H>
                <G>
                  <Field name="shop.name">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Shop Name</span>
                        <input {...input} placeholder="Your workshop name" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="shop.phone">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Phone</span>
                        <input {...input} placeholder="+91 ..." />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="shop.address">
                    {({ input }) => (
                      <Full>
                        <span className="label">Address</span>
                        <input {...input} placeholder="Street, City" />
                      </Full>
                    )}
                  </Field>

                  <Field name="shop.gstin">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">GSTIN</span>
                        <input {...input} />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="shop.logoUrl">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Logo URL</span>
                        <input {...input} placeholder="https://..." />
                      </FieldWrap>
                    )}
                  </Field>
                </G>

                <H style={{ marginTop: 18 }}>Estimate</H>
                <G>
                  <Field name="estimateNo">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">No.</span>
                        <input {...input} />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="date">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Date</span>
                        <input {...input} type="date" />
                      </FieldWrap>
                    )}
                  </Field>
                </G>

                <H style={{ marginTop: 18 }}>Customer</H>
                <G>
                  <Field name="customer.name">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Name</span>
                        <input {...input} placeholder="Customer name" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="customer.phone">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Phone</span>
                        <input {...input} placeholder="+91 ..." />
                      </FieldWrap>
                    )}
                  </Field>
                </G>

                <H style={{ marginTop: 18 }}>Vehicle</H>
                <G>
                  <Field name="vehicle.make">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Make</span>
                        <input {...input} placeholder="Maruti" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="vehicle.model">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Model</span>
                        <input {...input} placeholder="Swift" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="vehicle.year">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Year</span>
                        <input {...input} placeholder="2019" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="vehicle.regNo">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Reg No</span>
                        <input {...input} placeholder="TN-xx-xx-xxxx" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="vehicle.colorCode">
                    {({ input }) => (
                      <Full>
                        <span className="label">Color Code</span>
                        <input {...input} placeholder="e.g., 06U/WA994L" />
                      </Full>
                    )}
                  </Field>
                </G>

                <H style={{ marginTop: 18 }}>Job</H>
                <G>
                  <Field name="job.paintType">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Paint Type</span>
                        <input {...input} placeholder="PPG / DuPont / Nippon" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="job.dueDate">
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Due Date</span>
                        <input {...input} type="date" />
                      </FieldWrap>
                    )}
                  </Field>

                  <Field name="job.notes">
                    {({ input }) => (
                      <Full>
                        <span className="label">Notes</span>
                        <textarea
                          {...input}
                          placeholder="Anything the customer should know..."
                        />
                      </Full>
                    )}
                  </Field>
                </G>

                <H style={{ marginTop: 18 }}>Items</H>
                <LineItems />

                <G style={{ marginTop: 12 }}>
                  <Field name="discountPct" parse={(v) => Number(v) || 0}>
                    {({ input }) => (
                      <FieldWrap>
                        <span className="label">Discount %</span>
                        <input {...input} type="number" min={0} max={100} />
                      </FieldWrap>
                    )}
                  </Field>
                </G>

                <Actions>
                  <button
                    type="button"
                    onClick={async () => {
                      const el = previewRef.current;
                      if (!el) return;
                      await exportElementToPDF(
                        el,
                        `${values.estimateNo || "estimate"}.pdf`
                      );
                    }}
                  >
                    Generate PDF
                  </button>
                </Actions>
              </Panel>

              <PreviewShell>
                <EstimatePreview data={values} forwardedRef={previewRef} />
              </PreviewShell>
            </Page>
          </form>
        )}
      />
    </ThemeProvider>
  );
}
