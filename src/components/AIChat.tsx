import { BubbleChat } from 'flowise-embed-react';
const AIChat = () => {
  return (
    <div className="w-full h-[600px]">
      <BubbleChat
        chatflowid="217dac7b-5d77-451f-9afa-495dd253c8b5"
        apiHost="https://cloud.flowiseai.com"
      />
    </div>
  );
};

export default AIChat;
