import React from "react";
import { Field, useForm, FormSpy } from "react-final-form";
import styled from "styled-components";
import { fmt } from "../utils/currency";

const Toolbar = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0 16px;
  button {
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    color: #fff;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

/* FITS ~520px PANEL EXACTLY
   Columns:
   1) Type      70px
   2) Desc      flexible (min 120px)
   3) Qty       56px
   4) Rate      84px
   5) Tax %     56px
   6) Total     max-content (shrinks to content)
   7) Action    max-content (button width)
*/
const GridCols = `
  grid-template-columns:
    70px
    minmax(120px, 1fr)
    56px
    84px
    56px
    max-content
    max-content;
`;

const Header = styled.div`
  display: grid;
  ${GridCols}
  gap: 8px;
  padding: 0 0 8px;
  color: ${({ theme }) => theme.colors.subtle};
  font-size: 12px;
`;

const Row = styled.div`
  display: grid;
  ${GridCols}
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  /* Ensure last two columns never wrap to the next line */
  & > .total,
  & > .action {
    justify-self: end;
    white-space: nowrap;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  background: #121722;
  border: 1px solid #273046;
  color: #e6e6e6;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  height: 36px;
  background: #121722;
  border: 1px solid #273046;
  color: #e6e6e6;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 13px;
  outline: none;
`;

const TotalCell = styled.div`
  text-align: right;
  font-weight: 600;
`;

const RemoveBtn = styled.button`
  background: #2c3344;
  color: #fff;
  border: 0;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  height: 36px;
`;

export function LineItems() {
  const form = useForm();

  const pushItem = (payload: any) => {
    if (!form.mutators?.push) return;
    form.mutators.push("items", payload);
  };
  const removeAt = (index: number) => {
    if (!form.mutators?.remove) return;
    form.mutators.remove("items", index);
  };

  return (
    <>
      <Toolbar>
        <button
          type="button"
          onClick={() =>
            pushItem({
              type: "LABOR",
              description: "",
              qty: 1,
              rate: 0,
              taxPct: 18,
            })
          }
        >
          + Add Labor
        </button>
        <button
          type="button"
          onClick={() =>
            pushItem({
              type: "PART",
              description: "",
              qty: 1,
              rate: 0,
              taxPct: 18,
            })
          }
        >
          + Add Part
        </button>
      </Toolbar>

      <Header>
        <div>Type</div>
        <div>Description</div>
        <div>Qty</div>
        <div>Rate</div>
        <div>Tax %</div>
        <div>Total</div>
        <div>Action</div>
      </Header>

      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          const items: any[] = values?.items ?? [];
          return (
            <>
              {items.map((it, idx) => {
                const qty = Number(it?.qty) || 0;
                const rate = Number(it?.rate) || 0;
                const taxPct = Number(it?.taxPct) || 0;
                const subtotal = qty * rate;
                const tax = (subtotal * taxPct) / 100;
                const total = subtotal + tax;

                return (
                  <Row key={idx}>
                    <Field name={`items[${idx}].type`} component="select">
                      {({ input }) => (
                        <Select {...input}>
                          <option value="LABOR">LABOR</option>
                          <option value="PART">PART</option>
                        </Select>
                      )}
                    </Field>

                    <Field name={`items[${idx}].description`}>
                      {({ input }) => (
                        <Input
                          {...input}
                          placeholder="e.g., Front bumper repaint"
                        />
                      )}
                    </Field>

                    <Field
                      name={`items[${idx}].qty`}
                      parse={(v) => Number(v) || 0}
                    >
                      {({ input }) => (
                        <Input type="number" {...input} min={0} step={1} />
                      )}
                    </Field>

                    <Field
                      name={`items[${idx}].rate`}
                      parse={(v) => Number(v) || 0}
                    >
                      {({ input }) => (
                        <Input type="number" {...input} min={0} step="0.01" />
                      )}
                    </Field>

                    <Field
                      name={`items[${idx}].taxPct`}
                      parse={(v) => Number(v) || 0}
                    >
                      {({ input }) => (
                        <Input
                          type="number"
                          {...input}
                          min={0}
                          max={50}
                          step={1}
                        />
                      )}
                    </Field>

                    <TotalCell className="total">{fmt(total, "INR")}</TotalCell>

                    <div className="action">
                      <RemoveBtn type="button" onClick={() => removeAt(idx)}>
                        Remove
                      </RemoveBtn>
                    </div>
                  </Row>
                );
              })}
            </>
          );
        }}
      </FormSpy>
    </>
  );
}
