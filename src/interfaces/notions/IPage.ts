import { IFile } from "./property-types";
import { IParent } from "./IParent";
import { IPartialUser } from "./IPartialUser";
import { IProperty } from "./IProperty";

export interface IPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: IPartialUser;
  last_edited_by: IPartialUser;
  archived: boolean;
  in_trash: boolean;
  icon: IFile;
  cover: IFile;
  properties: {
    [key: string]: IProperty
  };
  parent: IParent;
  url: string;
  public_url: string;
}