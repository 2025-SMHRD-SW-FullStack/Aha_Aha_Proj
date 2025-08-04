import React, { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './Chatbot.module.css';
import { sendChatToBot } from '../../service/chatbotApi';
import { step5PostTranslation } from '../../service/step5PostTranslate';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ImageModal from './ImageModal';
import chatbotImg from '/src/assets/images/chatbot.png';
import { createDomesticPost } from '../../service/domesticPostApi';
import { createForeignPost } from '../../service/foreignPostApi';


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

  const chatBodyRef = useRef(null); // 자동 스크롤

  // [추가] 로딩 플레이스홀더 메시지의 인덱스를 저장할 ref
  const loadingRef = useRef(null);

  // ✅ 메시지가 변경될 때마다 아래로 스크롤
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

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

    // [추가] 입력값 즉시 클리어
    setInput('');

    // 사용자 메시지 추가
    addMessage('user', input);

    // [추가] "잠시만 기다려주세요" 플레이스홀더 추가 및 인덱스 저장
    setMessages(prev => {
      loadingRef.current = prev.length;
      return [
        ...prev,
        { role: 'bot', content: '잠시만 기다려주세요', type: 'loading' }
      ];
    });

    
    try {
      // 1) Step 5,6 처리
      if (step === 5) {
        await handleStep5(input);
        // setInput('');
        return;
      }
  
      if (step === 6) {
        handleStep6(input);
        // setInput('');
        return;
      }

      // 2) AI 호출
      const res = await sendChatToBot({ userId, platform, message: input });

      if (!res) {
        addMessage('bot', '❌ 서버에서 응답을 받지 못했습니다. 다시 시도해주세요.');
        return;
      }

      console.log('백엔드 응답:', res);

      // 3) 응답 메시지 배열 준비
      const botMsgs = [];
      if (Array.isArray(res.messages)) {
        res.messages.forEach(m => botMsgs.push({ role: m.role, content: m.content, type: m.type }));
      }
      if (res.response) {
        botMsgs.push({ role: 'bot', content: res.response });
      }
      if (res.image) {
        botMsgs.push({ role: 'bot', content: res.image, type: 'image' });
      }

      // 🔄[추가] 플레이스홀더 위치에 실제 메시지로 **통째로 교체**
      setMessages(prev => {
        const before = prev.slice(0, loadingRef.current);
        const after  = prev.slice(loadingRef.current + 1);
        return [...before, ...botMsgs, ...after];
      });

      const { step: newStep, context } = res;
      console.log('context:', context);


      // if (context?.item) setItem(context.item);
      // if (context?.country) setCountry(context.country);
      // if (context?.platform) setPlatform(context.platform);
      // if (context?.title) setTitle(context.title);
      // if (context?.content) setContent(context.content);

      if (context?.item) setItem(context.item);
      if (context?.country) setCountry(context.country);
      if (context?.platform) setPlatform(context.platform);
      if (context?.post_title_kr) setTitle(context.post_title_kr);
      if (context?.post_content_kr) setContent(context.post_content_kr);
      if (context?.translated_title) setTranslatedTitle(context.translated_title);
      if (context?.translated_content) setTranslatedContent(context.translated_content);

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
      // 🔄[추가] 에러 시 플레이스홀더 제거
      setMessages(prev => prev.filter((_, i) => i !== loadingRef.current));
      addMessage('bot', `❌ 오류: ${err.response?.data?.detail || err.message}`);
    }
    setInput('');
  };


  // 📤 Step5: 게시글 등록
  const handleStep5 = async (msg) => {
    let target = '';

    console.log('Step5 게시글 등록 데이터:', {
      userId,
      title,
      content,
      translatedTitle,
      translatedContent,
      target,
    });
    const answer = msg.trim();
    // let target = '';

    if (answer === '1') target = 'domestic';
    else if (answer === '2') target = 'foreign';
    else if (answer === '3') target = 'both';
    else {
      addMessage('bot', '❌ 게시를 취소했습니다. 챗봇을 종료합니다.');
      setStep(0);
      return;
    }

    // 공통 데이터 객체 (번역 결과를 postData에 반영)
    const postData = {
      userId,
      title,
      content,
      img: '',
      url: '',
      platform,
      yourPrice: '',
    }

    try {
      await step5PostTranslation({
        userId,
        platform,
        title,
        content,
        translatedTitle,
        translatedContent,
        target,
      });

      if (target === 'domestic' || target === 'both') {
        await createDomesticPost(postData);
      }
      if (target === 'foreign' || target === 'both') {
        await createForeignPost(postData);
      }

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
      <div className={styles.chatHeader}>
        <img className={styles.chatbotImgBox} src={chatbotImg} alt="챗봇 이미지" /><span>GlobalGo AI 수출 도우미</span>
      </div>

      <div className={styles.guideBox}>
        <h3 style={{marginBottom: '10px'}}>챗봇 이용 가이드</h3>
        <strong className={styles.stepBox}>1단계</strong><span className={styles.stepSpanBox}>품목 입력</span>
        <strong className={styles.stepBox}>2단계</strong><span className={styles.stepSpanBox}>국가 선택</span>
        <strong className={styles.stepBox}>3단계</strong><span className={styles.stepSpanBox}>이커머스 선택 </span>
        <strong className={styles.stepBox}>4단계</strong><span className={styles.stepSpanBox}>판매 등록 가이드</span>
        <strong className={styles.stepBox}>5단계</strong><span className={styles.stepSpanBox}>번역 기능</span>
        <strong className={styles.stepBox}>6단계</strong><span className={styles.stepSpanBox}>판매 글 게시</span>
        {/* <strong className={styles.stepBox}>4단계</strong><span className={styles.stepSpanBox}>판매 등록 가이드 (명령어 : 다음, 슬라이드 종료)</span>
        <strong className={styles.stepBox}>5단계</strong><span className={styles.stepSpanBox}>번역 기능 ex)제목: 비누팝니다 , 내용: 비누팔아요~)</span>
        <strong className={styles.stepBox}>6단계</strong><span className={styles.stepSpanBox}>판매 글 게시(국내/해외/둘다)</span> */}
      </div>
      
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
            {/* ✅ 이미지 타입이고, content가 유효할 때만 렌더링 */}
            {msg.type === 'image' && msg.content ? (
              <img
                src={msg.content}
                alt="slide"
                className={styles.chatImage}
                onClick={() => setModalImage(msg.content)}
              />
            ) : (
            <>
                { /* 로딩 중일 때만 이 p 가 나타나고, 아니면 Markdown 만 렌더링 */ }
                {msg.type === 'loading' ? (
                  <p className={msg.type === 'loading' ? styles.loading : ''}>
                    {msg.content}
                    <span className={styles.dots}>
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </p>
                ) : (
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
                )}
                {/* <Markdown remarkPlugins={[remarkGfm]} components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        style={{ maxWidth: '100%', cursor: 'pointer' }}
                        onClick={() => setModalImage(props.src)}
                        alt={props.alt || 'image'}
                      />
                    ),
              <>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: () => null, // ✅ 마크다운 내 이미지 태그 무시해서 중복 방지
                  }}
                >
                  {msg.content}
                </Markdown> */}

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
        <textarea
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          className={styles.input}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              // Shift 없이 Enter만 눌렀을 때는 submit
              e.preventDefault();
              handleSubmit(e);
            }
            // Shift+Enter면 그냥 줄 바꿈
          }}
            />
        <button 
          type="submit" 
          className={styles.button}
        >전송</button>
      </form>
    </div>
  );
};

export default Chatbot;
