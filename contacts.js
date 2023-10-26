// ----------1st option----------------//

// const { randomUUID } = require("crypto");
// const fs = require("fs/promises");
// const path = require("path");

// const contactsPath = path.join(__dirname, "db/contacts.json");

// const writeContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
//   return JSON.parse(await fs.readFile(contactsPath));
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(index, 1);
//   await writeContactts(contacts);
//   return result;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: randomUUID(),
//     name,
//     email,
//     phone,
//   };

//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };

//----------2nd option----------------//

// const fs = require("fs");
// const path = require("path");

// const contactsPath = path.join(__dirname, "db", "contacts.json");

// function listContacts() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(contactsPath, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       const contacts = JSON.parse(data);
//       resolve(contacts);
//     });
//   });
// }

// function getContactById(contactId) {
//   return listContacts().then((contacts) => {
//     return contacts.find((contact) => contact.id === contactId);
//   });
// }

// function removeContact(contactId) {
//   return listContacts().then((contacts) => {
//     const updatedContacts = contacts.filter(
//       (contact) => contact.id !== contactId
//     );
//     return saveContacts(updatedContacts);
//   });
// }

// function addContact(name, email, phone) {
//   return listContacts().then((contacts) => {
//     const newContact = {
//       id: Date.now(),
//       name,
//       email,
//       phone,
//     };
//     const updatedContacts = [...contacts, newContact];
//     return saveContacts(updatedContacts);
//   });
// }

// function saveContacts(contacts) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve("Contact saved successfully.");
//     });
//   });
// }

// module.exports = { listContacts, getContactById, removeContact, addContact };

//----------3rd option----------------//

import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const UpdatedContacts = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(UpdatedContacts, null, 2),
      "utf-8"
    );

    const deletedContact =
      data.find((contact) => contactId === contact.id) || null;

    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });

    return newContact;
  } catch (error) {
    console.log(error.red);
  }
}
