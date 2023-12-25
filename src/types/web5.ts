import { Protocol } from "@web5/api";

export type ProtocolType = {
  schema?: string;
  dataFormats?: string[];
};

export type ProtocolTypes = {
  [key: string]: ProtocolType;
};

export type ProtocolDefinition = Protocol["definition"];

export enum DateSort {
  CreatedAscending = "createdAscending",
  CreatedDescending = "createdDescending",
  PublishedAscending = "publishedAscending",
  PublishedDescending = "publishedDescending",
}
