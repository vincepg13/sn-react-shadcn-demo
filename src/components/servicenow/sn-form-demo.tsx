import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SnFormWrapper } from "sn-shadcn-kit";

export default function SnFormDemo() {
  const apis = {
    formData: import.meta.env.VITE_FORM_DATA_API,
    refDisplay: import.meta.env.VITE_REF_DISPLAY_API,
  };
  const testTable = `${import.meta.env.VITE_SCOPE_KEY}react_demo`;

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [table, setTable] = useState(searchParams.get("table") || testTable);
  const [guid, setGuid] = useState(searchParams.get("guid") || "-1");
  const [apiUrl, setApiUrl] = useState(`${apis.formData}/${table}/${guid}`);

  useEffect(() => {
    const newTable = searchParams.get("table") || testTable;
    const newGuid = searchParams.get("guid") || "-1";

    setTable(newTable);
    setGuid(newGuid);
    setApiUrl(`${apis.formData}/${newTable}/${newGuid}`);
  }, [apis.formData, searchParams, testTable]);

  function snSubmit(submissionGuid: string) {
    console.log("Guid changed from", guid, "to", submissionGuid);
    if (guid == "-1" && guid != submissionGuid) {
      console.log("REDIRECTION TO SUBMISSION GUID", submissionGuid);
      setGuid(submissionGuid);
      const newParams = new URLSearchParams(location.search);
      newParams.set("guid", submissionGuid);

      // Update the URL while preserving the current pathname
      navigate(
        {
          pathname: location.pathname,
          search: `?${newParams.toString()}`,
        },
        { replace: false }
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <SnFormWrapper
        apis={{ ...apis, formData: apiUrl }}
        table={table}
        guid={guid}
        snSubmit={snSubmit}
      />
    </div>
  );
}
