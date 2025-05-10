import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { SnFormWrapper } from "sn-shadcn-kit";

export default function SnFormDemo() {
  const api = import.meta.env.VITE_FORM_DATA_API;
  const testTable = `${import.meta.env.VITE_SCOPE_KEY}react_demo`;

  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [table, setTable] = useState(searchParams.get("table") || testTable);
  const [guid, setGuid] = useState(searchParams.get("guid") || "-1");
  const [apiUrl, setApiUrl] = useState(`${api}/${table}/${guid}`);

  useEffect(() => {
    const newTable = searchParams.get("table") || testTable;
    const newGuid = searchParams.get("guid") || "-1";

    setTable(newTable);
    setGuid(newGuid);
    setApiUrl(`${api}/${newTable}/${newGuid}`);
  }, [api, searchParams, testTable]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <SnFormWrapper api={apiUrl} table={table} guid={guid} />
    </div>
  );
}
