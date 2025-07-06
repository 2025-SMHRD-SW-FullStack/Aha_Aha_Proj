import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './Chatbot.module.css';
import { sendChatToBot } from '../../service/chatbotApi';
import { step5PostTranslation } from '../../service/step5PostTranslate';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ImageModal from './ImageModal';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(1);
  const [item, setItem] = useState('');
  const [country, setCountry] = useState('');
  const [platform, setPlatform] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [userId, setUserId] = useState(null);

  const [modalImage, setModalImage] = useState(null);

  // 🔐 JWT 토큰에서 userId 추출
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
    } else {
      try {
        const payload = jwtDecode(token);
        setUserId(payload.sub);
      } catch (err) {
        alert('토큰 파싱에 실패했습니다.');
        window.location.href = '/login';
      }
    }
  }, []);

  // 🔹 첫 질문 출력
  useEffect(() => {
    if (userId) {
      addMessage('bot', '🧠 어떤 품목을 수출하고 싶으신가요?');
    }
  }, [userId]);

  const addMessage = (role, content, type = 'text') => {
    setMessages((prev) => [...prev, { role, content, type }]);
  };

  // 📩 사용자 메시지 전송
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!input.trim()) return;

    // 사용자 메시지 추가
    addMessage('user', input);

    if (step === 5) {
      await handleStep5(input);
      setInput('');
      return;
    }

    if (step === 6) {
      handleStep6(input);
      setInput('');
      return;
    }

    try {
      const res = await sendChatToBot({ userId, message: input });

      if (!res) {
        addMessage('bot', '❌ 서버에서 응답을 받지 못했습니다. 다시 시도해주세요.');
        return;
      }

      console.log('백엔드 응답:', res);

      if (res.messages && Array.isArray(res.messages)) {
        res.messages.forEach((msg) => {
          addMessage(msg.role, msg.content, msg.type);
        });
      }

      if (res.response) {
        addMessage('bot', res.response);
      }

      if (res.image) {
        addMessage('bot', res.image, 'image');
      }

      const { step: newStep, context } = res;
      console.log('context:', context);


      if (context?.item) setItem(context.item);
      if (context?.country) setCountry(context.country);
      if (context?.platform) setPlatform(context.platform);
      if (context?.title) setTitle(context.title);
      if (context?.content) setContent(context.content);

      if (newStep === 4) {
        addMessage('bot', '📝 판매글 제목과 내용을 입력해주세요. 예: 제목 | 내용');
      }

      if (newStep === 5) {
        addMessage('bot', '📢 게시할까요?\n1️⃣ 국내\n2️⃣ 해외\n3️⃣ 둘 다\n❌ 아니요');
      }

      if (newStep === 6) {
        addMessage('bot', '📍 전시관으로 이동할까요?\n1️⃣ 네\n❌ 아니요');
      }

      setStep(newStep || 1);
    } catch (err) {
      console.error('❌ 오류:', err);
      addMessage('bot', `❌ 오류: ${err.response?.data?.detail || err.message}`);
    }

    setInput('');
  };


  // 📤 Step5: 게시글 등록
  const handleStep5 = async (msg) => {
    console.log('Step5 게시글 등록 데이터:', {
      userId,
      title,
      content,
      translatedTitle,
      translatedContent,
      target,
    });
    const answer = msg.trim();
    let target = '';

    if (answer === '1') target = 'domestic';
    else if (answer === '2') target = 'foreign';
    else if (answer === '3') target = 'both';
    else {
      addMessage('bot', '❌ 게시를 취소했습니다. 챗봇을 종료합니다.');
      setStep(0);
      return;
    }

    try {
      await step5PostTranslation({
        userId,
        title,
        content,
        translatedTitle,
        translatedContent,
        target,
      });

      addMessage('bot', '✅ 게시 완료! 감사합니다.');
      addMessage('bot', '📍 전시관으로 이동할까요?\n1️⃣ 네\n❌ 아니요');
      setStep(6);
    } catch (err) {
      addMessage('bot', `❌ 게시 실패: ${err.response?.data?.detail || err.message}`);
    }
  };

  // 🚪 Step6: 전시관 이동 여부
  const handleStep6 = (msg) => {
    const answer = msg.trim();
    if (answer === '1') {
      window.location.href = '/exhibition';
    } else {
      addMessage('bot', '👋 챗봇을 종료합니다.');
      setStep(0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>🧠 GlobalGo AI 수출 도우미</div>

      <div className={styles.chatBody}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
            {msg.type === 'image' ? (
              <img
                src={`${msg.content}`}
                alt="slide"
                className={styles.chatImage}
                onClick={() => setModalImage(msg.content)}
              />
            ) : (
            <>
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        style={{ maxWidth: '100%', cursor: 'pointer' }}
                        onClick={() => setModalImage(props.src)}
                        alt={props.alt || 'image'}
                      />
                    ),
                  }}
                >
                  {msg.content}
                </Markdown>

                {modalImage && (
                  <ImageModal
                    src={modalImage}
                    onClose={() => setModalImage(null)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <form className={styles.chatFooter} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>전송</button>
      </form>
    </div>
  );
};

export default Chatbot;
