// src/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      panel: string;
      text: string;
      subtle: string;
      primary: string;
      accent: string;
      border: string;
      danger: string;
    };
    radii: {
      md: string;
    };
    shadows: {
      sm: string;
    };
  }
}
