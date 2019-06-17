import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { omit } from "ramda"

/**
 * Model description here for TypeScript hints.
 */
export const CircleUserModel = types
  .model("CircleUser")
  .props({
    name: types.string,
    photo: types.maybe(types.string),
    accessToken: types.string,
  })
  .views(self => ({}))
  .actions(self => ({}))
  .postProcessSnapshot(omit(["accessToken"]))

type CircleUserType = Instance<typeof CircleUserModel>
export interface CircleUser extends CircleUserType {}
type CircleUserSnapshotType = SnapshotOut<typeof CircleUserModel>
export interface CircleUserSnapshot extends CircleUserSnapshotType {}
