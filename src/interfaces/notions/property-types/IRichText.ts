export interface IRichText {
  type: string;
  text: {
    content: string;
  },
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  },
  plain_text: string;
  href?: string;
}