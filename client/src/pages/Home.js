import EntryContext from "../store/entry-context";
import { useContext, useEffect } from "react";
import Table from "../components/Table/Table";
import { COLUMNS } from "../components/Table/Columns";
import Nav from "../components/Nav";

const Home = () => {
  let entryContext = useContext(EntryContext);

  useEffect(() => {
    entryContext.refreshEntries();
  }, []);

  return (
    <div>
      <Nav />
      <Table columns={COLUMNS} data={entryContext.entries} />
    </div>
  );
};

export default Home;
