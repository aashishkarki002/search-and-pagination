import getApi from "@/utils/constant";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";

async function getDragons() {
  const { method, url } = getApi("getDragons");
  const res = await fetch(url, { method });
  if (!res.ok) throw new Error("Failed to fetch spells");
  const data = await res.json();
  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query?.toLowerCase() || "";
  const spellsData = await getDragons();

  const filteredSpells = spellsData.results.filter((spell: any) =>
    spell.name.toLowerCase().includes(query)
  );
  const postPerpage = 8;
  const lastIndex = currentPage * postPerpage;
  const firstIndex = lastIndex - postPerpage;

  const currentData = filteredSpells.slice(firstIndex, lastIndex);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Spells</h1>

      <form method="GET" className="flex gap-2 mb-4">
        <Input defaultValue={query} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      <ul className="grid grid-cols-4 gap-4 list-none p-0">
        {currentData.map((spell: any) => (
          <li
            key={spell.id || spell.name}
            className="bg-gray-100 rounded-md p-3 shadow text-center flex flex-col items-center"
          >
            <span className="font-semibold mb-1">{spell.name}</span>
            <span className="text-sm text-gray-500 mb-2">
              Level {spell.level}
            </span>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} query={query} />
    </div>
  );
}
