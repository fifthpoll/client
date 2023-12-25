export type UnionToTuple<U> = U extends any ? [U] : never;
export type UnionToArray<U> = U extends any ? U[] : never;

export enum DateSort {
  CreatedAscending = "createdAscending",
  CreatedDescending = "createdDescending",
  PublishedAscending = "publishedAscending",
  PublishedDescending = "publishedDescending",
}
