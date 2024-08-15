import React from 'react';

const MessageDisplay = ({ messages }) => {
  return (
    <div>
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
