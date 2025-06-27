import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { SnFilter, SnTable } from "sn-shadcn-kit";

export default function SnTableDemo() {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [table, setTable] = useState(searchParams.get("table") || "problem");
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [filterQuery, setFilterQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const newTable = searchParams.get("table") || "problem";
    const newQuery = searchParams.get("query") || "";

    setTable(newTable);
    setQuery(newQuery);
    setFilterQuery(newQuery);
  }, [searchParams]);

  const handleQueryBuilt = useCallback((q: string) => {
    setFilterQuery(q);
  }, []);


  return (
    <div className="mx-auto flex flex-col gap-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>ServiceNow Data Table</AlertTitle>
        <AlertDescription>
          Below is an example of the SnTable component from sn-shadcn-kit. This connects directly to a ServiceNow
          instance to pull data given a table name and optionally a query or a specific view. You can change the
          parameters in the URL to fetch new data, or use the condition builder below to build a query.
        </AlertDescription>
      </Alert>
      <SnFilter table={table} encodedQuery={query} onQueryBuilt={handleQueryBuilt} />
      <SnTable table={table} query={filterQuery} defaultPageSize={10} />
    </div>
  );
}
