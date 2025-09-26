export type LineItem = {
  id?: string;
  type: 'PART' | 'LABOR';
  description: string;
  qty: number;
  rate: number;
  taxPct: number; // e.g. 18 for 18%
};

export type Estimate = {
  estimateNo: string;
  date: string; // yyyy-mm-dd
  customer: {
    name: string;
    phone?: string;
  };
  vehicle: {
    make: string;
    model: string;
    year?: string;
    regNo?: string;
    colorCode?: string;
  };
  job: {
    paintType?: string;
    notes?: string;
    dueDate?: string;
  };
  items: LineItem[];
  currency: 'INR';
  discountPct?: number;
  shop: {
    name: string;
    address?: string;
    phone?: string;
    gstin?: string;
    logoUrl?: string;
  };
};
