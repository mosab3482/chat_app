import { Search } from "lucide-react";
import { useConversationsContext } from "../../contexts/ConversationsContext";

const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm } = useConversationsContext();
    return <div className="p-4 relative bg-gradient-to-r from-violet-600 to-purple-700">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 size-4 text-white/70"/>
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full text-sm bg-white/20 text-white placeholder-white/60 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
    </div>
}

export default SearchBar;