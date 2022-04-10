import { proxy } from "valtio";

import events from "@events/hub";

import auth from "./auth";
import users from "./users";

class Messages {
  messages = [];
  conversations = [];
  typing = false;
  message = "";
  interval;

  selectedConversation;
  selectedConversationId;
  selectedUserId;
  selectedUserName;

  typingConversationId;
  typingTimeout;

  selectConversation({ convId }) {
    if (convId !== this.selectedConversationId) {
      this.messages = [];
      this.selectedConversationId = convId;
      this.selectedConversation = this.conversations.find(
        (item) => item.value.convId === convId
      );
      this.selectedUserId = undefined;
      this.selectedUserName = undefined;

      this.conversations = this.conversations.filter(
        (c) => c.value.convId !== "new-conversation"
      );
      this.fetch();
    }
    events.emit("conversation.selected", [this.selectedConversationId]);
  }

  async findUserConversation(id) {
    return this.conversations.find((c) => c.value.userIds?.includes(id));
  }

  async selectUser({ id, name }) {
    const existing = await this.findUserConversation(id);
    if (existing) {
      this.selectConversation(existing.value);
      return;
    }

    this.selectedConversationId = "new-conversation";
    this.selectedConversation = {
      key: "new-conversation",
      value: {
        title: name,
        convId: "new-conversation",
        last: "New conversation",
      },
    };

    this.selectedUserId = id;
    this.selectedUserName = name;
    this.messages = [];

    const conversations = this.conversations.filter(
      (c) => c.value.convId !== "new-conversation"
    );

    this.conversations = [this.selectedConversation, ...conversations];

    events.emit("conversation.selected", [this.selectedConversationId]);
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(this.fetch.bind(this), 5000);
      this.fetch();
    }

    return () => {
      this.stop();
    };
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  async updateTyping() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    if (
      this.typingConversationId &&
      this.typingConversationId !== this.selectedConversationId
    ) {
      await this.putTypingState(this.typingConversationId, false);
      this.typingConversationId = undefined;
    }

    if (
      this.selectedConversationId &&
      this.selectedConversationId !== "new-conversation" &&
      !this.typingConversationId
    ) {
      this.typingConversationId = this.selectedConversationId;
      await this.putTypingState(this.typingConversationId, true);
    }
    this.typingTimeout = setTimeout(this.clearTyping.bind(this), 5000);
  }

  async clearTyping() {
    await this.putTypingState(this.typingConversationId, false);
    this.typingConversationId = undefined;
  }

  async putTypingState(convId, typing) {
    await fetch("/typing", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        convId,
        typing,
      }),
    });
  }

  async getConversations() {
    const response = await fetch("/conversations");
    return response.json();
  }

  async getMessages(convId) {
    if (!convId || convId === "new-conversation") {
      return { items: [] };
    }
    const response = await fetch(`/messages?convId=${convId}`);
    return response.json();
  }

  async fetch() {
    const conversationId = this.selectedConversationId;
    if (!conversationId) {
      this.messages = [];
    }

    const [messages, conversations] = await Promise.all([
      this.getMessages(conversationId),
      this.getConversations(),
    ]);

    this.messages = messages.items;
    this.conversations = conversations.items;

    this.selectedConversation =
      this.selectedConversationId &&
      this.conversations.find(
        (conv) => conv.value.convId === this.selectedConversationId
      );

    if (this.selectedUserId) {
      this.selectedConversationId = "new-conversation";
      this.selectedConversation = {
        key: "new-conversation",
        value: {
          title: this.selectedUserName,
          convId: "new-conversation",
          last: "New conversation",
        },
      };
      this.conversations = [this.selectedConversation, ...this.conversations];
    }

    if (
      !this.selectedUserId &&
      !this.selectedConversationId &&
      this.conversations[0]
    ) {
      this.selectedConversationId = this.conversations[0].value.convId;
      await this.fetch();
    }
  }

  async createConversation() {
    const response = await fetch("/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userIds: [this.selectedUserId, auth.user.id],
      }),
    });

    const { convId } = await response.json();

    return convId;
  }

  async send() {
    if (!this.message) {
      return;
    }

    const text = this.message;
    this.message = "";

    if (this.selectedConversationId === "new-conversation") {
      this.selectedConversationId = await this.createConversation();
    }

    await fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        convId: this.selectedConversationId,
        text,
      }),
    });

    this.selectedUserId = undefined;

    await Promise.all([this.fetch(), this.clearTyping()]);
  }

  async getUsers(userIds) {
    return await Promise.all(userIds.map((id) => users.getUser(id)));
  }
}

export default proxy(new Messages());
