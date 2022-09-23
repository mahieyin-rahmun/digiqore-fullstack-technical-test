import LanguageLevelTable from "@/components/table/LanguageLevelTable";
import useApi from "@/hooks/useApi";
import { TProgrammingLanguageLevelData } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function BasicTable() {
  const { data, error, loading, fetch } = useApi<{
    message: string;
    data: TProgrammingLanguageLevelData[];
  }>("/data", "GET");

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <LanguageLevelTable data={data?.data || []} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
