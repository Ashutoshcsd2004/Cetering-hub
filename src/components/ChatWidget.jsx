import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can we help you today?', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, isBot: false }]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Thank you for your message. Our support team will respond shortly.', 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden"
          >
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold">Haluwai Support</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-orange-700 h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    msg.isBot ? 'bg-white border text-gray-800' : 'bg-orange-600 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
              <Input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="text-sm"
              />
              <Button type="submit" size="icon" className="bg-orange-600 hover:bg-orange-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-orange-600 text-white shadow-lg flex items-center justify-center hover:bg-orange-700 transition-colors"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>
    </div>
  );
};

export default ChatWidget;