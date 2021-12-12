import { EntityMetadataMap, EntityDataModuleConfig } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Concert: {},
};

const pluralNames = {
  Concert: "Concerts",
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
