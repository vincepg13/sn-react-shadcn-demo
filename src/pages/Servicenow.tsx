import { useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { SnTable } from "@sn-react/shadcn-kit";

export default function Servicenow() {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [table, setTable] = useState(searchParams.get('table') || "problem");
  const [query, setQuery] = useState(searchParams.get('query') || "");

  useEffect(() => {
    const newTable = searchParams.get('table') || "problem";
    const newQuery = searchParams.get('query') || "";

    setTable(newTable);
    setQuery(newQuery);
  }, [searchParams]);

  return (
    <div className="mx-auto">
      <SnTable
        table={table}
        query={query}
        defaultPageSize={10}
      />
    </div>
  );
}
