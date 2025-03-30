import * as userApi from "./api/user";
import * as contactApi from "./api/contact";
import { mockUser } from "./mocks/user";
import { mockContact } from "./mocks/contact";

describe("API", () => {
  beforeAll(async () => {
    const authData = await userApi.signIn({
      email: mockUser.email,
      password: mockUser.password,
    });

    localStorage.setItem("token", authData.token);
  });

  afterAll(async () => {
    await userApi.logout();
  });

  describe("User api", () => {
    test("should sign in correctly", async () => {
      const authData = await userApi.signIn({
        email: mockUser.email,
        password: mockUser.password,
      });

      expect(authData.user).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
        })
      );

      expect(authData.token).toBeDefined();
    });

    test("should get user profile info correctly", async () => {
      const user = await userApi.getMe();

      expect(user).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
        })
      );
    });

    test("should update authorized user info correctly", async () => {
      let user = await userApi.updateUser({ firstName: "Updated" });
      expect(user).toEqual(expect.objectContaining({ firstName: "Updated" }));

      // revert the change
      user = await userApi.updateUser({ firstName: mockUser.firstName });
      expect(user).toEqual(
        expect.objectContaining({ firstName: mockUser.firstName })
      );
    });
  });

  describe("Contact api", () => {
    let contactId;

    test("should create contact correctly", async () => {
      const contact = await contactApi.create(mockContact);
      contactId = contact._id;

      expect(contact).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: mockContact.firstName,
          lastName: mockContact.lastName,
          birthdate: mockContact.birthdate,
          email: mockContact.email,
          phone: mockContact.phone,
          street1: mockContact.street1,
          street2: mockContact.street2,
          city: mockContact.city,
          stateProvince: mockContact.stateProvince,
          postalCode: mockContact.postalCode,
          country: mockContact.country,
        })
      );
    });

    test("should get all contacts correctly", async () => {
      const contacts = await contactApi.getAll();

      expect(contacts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            firstName: mockContact.firstName,
            lastName: mockContact.lastName,
            birthdate: mockContact.birthdate,
            email: mockContact.email,
            phone: mockContact.phone,
            street1: mockContact.street1,
            street2: mockContact.street2,
            city: mockContact.city,
            stateProvince: mockContact.stateProvince,
            postalCode: mockContact.postalCode,
            country: mockContact.country,
          }),
        ])
      );
    });

    test("should get contact by id correctly", async () => {
      const contact = await contactApi.getById(contactId);

      expect(contact).toEqual(
        expect.objectContaining({
          _id: contactId,
          firstName: mockContact.firstName,
          lastName: mockContact.lastName,
          birthdate: mockContact.birthdate,
          email: mockContact.email,
          phone: mockContact.phone,
          street1: mockContact.street1,
          street2: mockContact.street2,
          city: mockContact.city,
          stateProvince: mockContact.stateProvince,
          postalCode: mockContact.postalCode,
          country: mockContact.country,
        })
      );
    });

    test("should update contact by id correctly", async () => {
      const contact = await contactApi.updateById(contactId, {
        firstName: "Updated",
      });

      expect(contact).toEqual(
        expect.objectContaining({
          _id: contactId,
          firstName: "Updated",
        })
      );
    });

    test("should delete contact by id correctly", async () => {
      const deletedContactResponse = await contactApi.deleteById(contactId);
      expect(deletedContactResponse).toBe("Contact deleted");

      const contacts = await contactApi.getAll();
      expect(contacts).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: contactId,
            firstName: "Updated",
          }),
        ])
      );
    });
  });
});
