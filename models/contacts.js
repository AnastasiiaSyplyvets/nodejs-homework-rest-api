const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data.toString());

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const searchedContact = contacts.find((c) => c.id === contactId);
    return searchedContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      // id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) return null;

  contacts[index] = { contactId, ...body };
  console.log("Updated contacts:", contacts[index]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
