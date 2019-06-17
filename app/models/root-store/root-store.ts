import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { CircleUserModel, CircleUserSnapshot } from "../circle-user"

/**
 * An RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    circleUser: types.maybe(CircleUserModel),
  })
  .actions(self => ({
    setCircleUser(circleSnapshot: CircleUserSnapshot, accessToken: string) {
      self.circleUser = CircleUserModel.create({ ...circleSnapshot, accessToken })
    },
  }))

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
