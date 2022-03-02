// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bodyBgColor: string;
    listBgColor: string;
    accentColor: string;
    plusColor: string;
    minusColor: string;
  }
}
