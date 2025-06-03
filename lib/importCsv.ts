import Papa from "papaparse";
import { checkResponse } from "./fetcher";

export async function processCsv(file: File, onProgress: (percent: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const rows: any[] = [];
    let totalRows = 0;
    let processedRows = 0;

    // 1. Pré-contagem de linhas
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const rawRows = results.data as any[];
        totalRows = rawRows.length;

        const processRows = async () => {
          for (const row of rawRows) {
            const url = row["URL"];
            if (url) {
              const result = await checkResponse(url);
              row["Platform Identified"] = result;
            }

            processedRows++;
            const percent = Math.round((processedRows / totalRows) * 100);
            onProgress(percent);
          }

          const updatedCsv = Papa.unparse(rawRows);
          resolve(updatedCsv);
        };

        processRows();
      },
      error: (err: any) => {
        reject(err);
      },
    });
  });
}
