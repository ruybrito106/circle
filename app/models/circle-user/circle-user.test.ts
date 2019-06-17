import { CircleUserModel, CircleUser } from "./circle-user"

test("can be created", () => {
  const instance: CircleUser = CircleUserModel.create({})

  expect(instance).toBeTruthy()
})