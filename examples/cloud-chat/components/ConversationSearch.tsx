import { useCallback, useState } from "react";

import ConversationList from "@components/ConversationList";
import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import UserMap from "@components/UserMap";

import messages from "@state/messages";

export default function ConversationSearch() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(true);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleSearchingChange = useCallback((value) => {
    setSearching(value);
  }, []);

  const handleConversationClick = useCallback((item) => {
    messages.selectConversation(item);
    setSearching(false);
    setQuery("");
  }, []);

  const handleUserClick = useCallback((item) => {
    messages.selectUser(item);
    setSearching(false);
    setQuery("");
  }, []);

  return (
    <div className="p-2">
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        searching={searching}
        onSearchingChange={handleSearchingChange}
      />
      {searching && (
        <div className="mt-2">
          <UserMap />
          <SearchResults
            onConversationClick={handleConversationClick}
            onUserClick={handleUserClick}
          />
        </div>
      )}
      {!searching && <ConversationList />}
    </div>
  );
}
