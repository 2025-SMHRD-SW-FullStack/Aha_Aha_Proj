import React, { useEffect, useState } from 'react';
import { startSlides, sendChatMessage } from '../service/slidebotService';

const SlidebotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const init = async () => {
      try {
        const data = await startSlides(userId);
        const botMsg = {
          role: 'bot',
          text: data.response || data.reply || '슬라이드를 시작합니다.',
          image: data.image || null,
        };
        setMessages([botMsg]);
      } catch (err) {
        console.error('초기화 실패:', err);
        setMessages([{ role: 'bot', text: '초기화 중 오류가 발생했습니다.' }]);
      }
    };
    init();
  }, [userId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const data = await sendChatMessage({ userId, message: input });
      const botMsg = {
        role: 'bot',
        text: data.response || '응답을 처리할 수 없습니다.',
        image: data.image || null,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('응답 실패:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '❌ 서버 오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    }

    setInput('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>🤖 슬라이드봇</h2>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '1rem',
          minHeight: '300px',
          maxHeight: '500px',
          overflowY: 'auto',
          backgroundColor: '#fafafa',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === 'user' ? 'right' : 'left',
              marginBottom: '1.5rem',
            }}
          >
            <p>
              <strong>{msg.role === 'user' ? '🙋‍♂️나' : '🤖봇'}:</strong> {msg.text}
            </p>
            {msg.image && (
              <img
                src={msg.image}
                alt="슬라이드 이미지"
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  marginTop: '0.5rem',
                  border: '1px solid #ccc',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지를 입력하세요"
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default SlidebotPage;
