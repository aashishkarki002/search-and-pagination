import getApi from "@/utils/constant";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Select from "@/components/Select";
async function getDragons() {
  const { method, url } = getApi("getDragons");
  const res = await fetch(url, { method });
  if (!res.ok) throw new Error("Failed to fetch spells");
  const data = await res.json();
  return data;
}

export default async function Home(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toLowerCase() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const spellsData = await getDragons();
  const itemsperpage = Number(searchParams?.size) || 10;

  const lastIndex = currentPage * itemsperpage;
  const firstIndex = lastIndex - itemsperpage;

  const filteredSpells = spellsData.results.filter((spell: any) =>
    spell.name.toLowerCase().includes(query)
  );
  const totalPages = Math.ceil(filteredSpells.length / itemsperpage);
  const filtered = filteredSpells.slice(firstIndex, lastIndex);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Spells</h1>

      <form method="GET" className="flex gap-2 mb-4">
        <Input defaultValue={query} />
        <Select itemsperpage={itemsperpage}></Select>
      </form>

      <ul className="grid grid-cols-4 gap-4 list-none p-0">
        {filtered.map((spell: any) => (
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
      <Pagination totalPages={totalPages} />
    </div>
  );
}
