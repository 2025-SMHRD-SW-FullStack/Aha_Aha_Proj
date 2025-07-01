import { useState, useEffect, useRef } from "react";
import axios from "../config/axiosInstance";

const SlideChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 수출 가이드 챗봇입니다. 궁금한 점을 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("/slidebot/chat", {
        userId: "test-user", // 실제 인증된 userId로 교체
        message: input,
      });

      const { response: botText, image } = response.data;
      const botMessage = { sender: "bot", text: botText, image };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: `⚠️ 오류: ${error.message}` };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">🧭 수출 슬라이드 챗봇</h2>
      <div className="border rounded p-4 h-[500px] overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200" : "bg-green-200"}`}>
              <p>{msg.text}</p>
              {msg.image && <img src={msg.image} alt="slide" className="mt-2 max-w-full" />}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          전송
        </button>
      </div>
    </div>
  );
};

export default SlideChatBot;
