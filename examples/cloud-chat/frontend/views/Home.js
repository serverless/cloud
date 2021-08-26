import { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";

import MessageInput from "@components/MessageInput";
import Messages from "@components/Messages";
import TopNavbar from "@components/TopNavbar";
import ConversationSearch from "@components/ConversationSearch";

import Main from "@layout/Main";
import Sidebar from "@layout/Sidebar";
import FullPageView from "@layout/FullPageView";

import messages from "@state/messages";

import viewState from "@state/view";
import events from "@events/hub";

export default function Home() {
  useEffect(() => messages.start(), []);

  const view = useSnapshot(viewState);
  const { selectedConversation } = useSnapshot(messages);

  const handleConversationSelected = useCallback(() => {
    viewState.current = "conversation";
  }, []);

  useEffect(() => {
    events.on("conversation.selected", handleConversationSelected);
    return () => {
      events.off("conversation.selected", handleConversationSelected);
    };
  }, [handleConversationSelected]);

  return (
    <FullPageView>
      <Sidebar selected={view.current === "search"}>
        <ConversationSearch />
      </Sidebar>
      <Main className="d-flex flex-column" selected={view.current !== "search"}>
        <TopNavbar />
        <Messages className="flex-grow-1" />
        <MessageInput typing={selectedConversation?.value.typing} />
      </Main>
    </FullPageView>
  );
}
