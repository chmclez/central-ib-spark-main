import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const BOT_NAME = 'SparkBot';
// Add your OpenAI API key below
const API_KEY = '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';

const loadMessages = (): ChatMessage[] => {
  try {
    const data = localStorage.getItem('chat_messages');
    return data ? JSON.parse(data) as ChatMessage[] : [];
  } catch {
    return [];
  }
};

const saveMessages = (messages: ChatMessage[]) => {
  try {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  } catch {
    // ignore
  }
};

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    saveMessages(messages);
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(m => [...m, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const replyContent = data.choices?.[0]?.message?.content || 'Sorry, I could not respond.';
      const reply: ChatMessage = { role: 'assistant', content: replyContent };
      setMessages(m => [...m, reply]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I had trouble responding.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!open && (
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border rounded shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <span className="font-medium">{BOT_NAME}</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto flex-1" style={{ maxHeight: '300px' }}>
            {messages.length === 0 && (
              <p className="text-sm text-gray-500">Hey there! I'm {BOT_NAME}. Ask me anything about IB, and I'll do my best to help.</p>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block px-2 py-1 rounded text-sm ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <p className="text-sm text-gray-500">{BOT_NAME} is typing...</p>}
            <div ref={endRef} />
          </div>
          <div className="p-2 border-t space-y-2">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="h-16"
            />
            <Button onClick={sendMessage} disabled={loading} className="w-full">Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;