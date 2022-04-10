import { useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import messages from "@state/messages";
import events from "@events/hub";
import TypingBubble from "@components/TypingBubble";

export default function MessageInput({ typing }) {
  const { message } = useSnapshot(messages);
  const input = useRef<HTMLInputElement>();

  const handleSubmit = useCallback((event) => {
    (async () => {
      event.preventDefault();
      event.stopPropagation();
      messages.send();
    })();
  }, []);

  const handleConversationSelected = useCallback(() => {
    setTimeout(() => input.current && input.current.focus(), 100);
  }, []);

  const handleChange = useCallback((event) => {
    messages.message = event.target.value;
    messages.updateTyping();
  }, []);

  useEffect(() => {
    events.on("conversation.selected", handleConversationSelected);
    return () => {
      events.off("conversation.selected", handleConversationSelected);
    };
  }, [handleConversationSelected]);

  return (
    <form onSubmit={handleSubmit} className="position-absolute bottom-0 w-100">
      <style jsx>{`
        * {
          background-color: rgba(255, 255, 255, 0.6);
        }
      `}</style>

      <div className="p-2">
        {typing && <TypingBubble />}
        <input
          ref={input}
          className="text-muted rounded-pill form-control"
          type="text"
          value={message}
          placeholder="Message"
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
