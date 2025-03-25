export interface IFile {
  type: string;
  [key: string]: { url: string; } | string;
}