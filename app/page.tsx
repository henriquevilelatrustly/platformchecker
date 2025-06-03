"use client";
import Link from "next/link";
import { useState } from "react";
import { checkResponse } from "@/lib/fetcher";
import { ResponseMatchType } from "@/lib/rules";
import { processCsv } from "@/lib/importCsv";

export default function Home() {
  const [searchUrl, setSearchUrl] = useState("");
  const [result, setResult] = useState<ResponseMatchType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvProcessed, setCsvProcessed] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGetUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUrl(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    const response = await checkResponse(searchUrl);
    setResult(response);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvLoading(true);
    setCsvProcessed(false);
    setProgress(0);

    try {
      const updatedCsv = await processCsv(file, (percent) => {
        setProgress(percent);
      });

      const blob = new Blob([updatedCsv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", "processed_urls.csv");
      link.click();
      URL.revokeObjectURL(url);

      setCsvProcessed(true);
      setTimeout(() => setCsvProcessed(false), 4000);
    } catch (error) {
      console.error("Erro ao processar CSV:", error);
    }

    setCsvLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 text-lg row-start-2 items-start sm:items-start w-full">
        <div className="flex flex-col w-full gap-4">
          <p className="">Insert the Url to be checked:</p>
          <div className="flex flex-row gap-4">
            <input
              className=" border-2 border-white w-full p-2"
              onChange={(e) => handleGetUrl(e)}
              value={searchUrl}
              placeholder="https://insert-the-url-to-be-tested"
            />
            <button
              onClick={() => {
                handleClick();
              }}
              className="border font-bold rounded-md px-4 py-2 bg-green-800 cursor-pointer hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out"
            >
              Check
            </button>
          </div>
          <div>
            <p className="text-xl">{loading ? "Analisando..." : ""}</p>
            <span>Result: </span>
            {result != ResponseMatchType.Unknown ? (
              <span className="text-green-500 font-bold">{result}</span>
            ) : (
              <span className="text-red-500 font-bold">Not a known platform</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6 border-t border-white pt-6 w-full">
          <label className="font-semibold">Import CSV with URLs:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-white bg-gray-800 border border-white rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-700 hover:file:bg-green-600"
          />
          {csvLoading && (
            <div className="mt-2 w-full">
              <p className="text-yellow-300 text-sm mb-1">Analyzing CSV... ({progress}%)</p>
              <div className="w-full h-2 bg-gray-600 rounded">
                <div
                  className="h-2 bg-green-500 rounded transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {!csvLoading && csvProcessed && (
            <p className="text-green-400 font-bold text-sm mt-2">CSV successfully processed and downloaded!</p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
