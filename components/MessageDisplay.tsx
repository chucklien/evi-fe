import React from 'react';

interface Message {
  type: string;
  message: {
    role: string;
    content: string;
  };
  // Add other fields if necessary
}

interface Props {
  messages: Message[];
  className?: string;
}

const MessageDisplay = ({ messages, className }: Props) => {
  return (
    <div className={className}>
      {messages.map((message, index) => {
        if (message.type === 'user_message') {
          return (
            <div key={index}>
              <strong>Client:</strong> {message.message.content}
            </div>
          );
        } else if (message.type === 'assistant_message') {
          return (
            <div key={index}>
              <strong>Helper:</strong> {message.message.content}
            </div>
          );
        }
        return null; // Ignore other message types
      })}
    </div>
  );
};

export default MessageDisplay;
