import { createContext, useState } from "react";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../api-calls";

const EntryContext = createContext({
  entries: [],
  createEntryGlobal: (company, product, quantity, etd, eta) => {},
  getEntriesGlobal: () => {},
  deleteEntryGlobal: (id) => {},
  updateEntryGlobal: (id, company, product, quantity, etd, eta) => {},
  refreshEntries: () => {},
});

export function EntryContextProvider(props) {
  const [entries, setEntries] = useState([]);

  async function createEntryGlobal(company, product, quantity, etd, eta) {
    try {
      await createEntry(company, product, quantity, etd, eta);
      const newEntries = await getEntriesGlobal();
      setEntries(newEntries);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEntriesGlobal() {
    const response = await getEntries();
    const content = await response.json();
    return content;
  }

  async function refreshEntries() {
    const response = await getEntries();
    const content = await response.json();
    setEntries(content);
  }

  async function deleteEntryGlobal(id) {
    try {
      await deleteEntry(id);
      const newEntries = await getEntriesGlobal();
      setEntries(newEntries);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateEntryGlobal(id, company, product, quantity, etd, eta) {
    try {
      await updateEntry(id, company, product, quantity, etd, eta);
      const newEntries = await getEntriesGlobal();
      setEntries(newEntries);
    } catch (error) {
      console.log(error);
    }
  }

  const context = {
    entries,
    createEntryGlobal,
    getEntriesGlobal,
    deleteEntryGlobal,
    updateEntryGlobal,
    refreshEntries,
  };
  return (
    <EntryContext.Provider value={context}>
      {props.children}
    </EntryContext.Provider>
  );
}

export default EntryContext;
