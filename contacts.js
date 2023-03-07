const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join("db", "contacts.json");
/**
 * Read list of contacts
 * @returns {Promise<void>}
 */
async function listContacts() {
    try {
        const readResult = await fs.readFile(contactsPath);

        const listContacts = JSON.parse(readResult);

        console.table(listContacts)
        return listContacts
    } catch (error) {
        console.log(error.message);
    }
}
/**
 * get contact by ID
 * @param {string} contactId 
 * @returns { Promise < void>}
 */
async function getContactById(contactId) {
    try {
        const readResult = await fs.readFile(contactsPath);

        const listContacts = JSON.parse(readResult);
        const idx = listContacts.findIndex(({ id }) => id === contactId);
        const contact = listContacts[idx];

        console.log(contact)
    } catch (error) {
        console.log(error.message);
    }
}
/**
 * remove contact by ID
 * @param {string} contactId 
 * @returns { Promise < void>}
 */
async function removeContact(contactId) {
    try {
        const readResult = await fs.readFile(contactsPath);

        const listContacts = JSON.parse(readResult);
        const newContacts = listContacts.filter(({ id }) => id !== contactId);

        await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    } catch (error) {
        console.log(error.message);
    }
}
/**
 * add contact
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @returns { Promise < void>}
 */
async function addContact(name, email, phone) {
    try {
        const readResult = await fs.readFile(contactsPath);

        const listContacts = JSON.parse(readResult);
        const contact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };
        const newContacts = JSON.stringify([...listContacts, contact]);

        await fs.writeFile(contactsPath, newContacts);

    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
