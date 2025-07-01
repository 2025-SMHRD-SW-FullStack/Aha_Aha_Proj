import { useState } from "react";
import {
  step1Recommend,
  step2Recommend,
  step3Guide,
  step4Translate,
} from "../service/chatbotApi";

const TestSteps = () => {
  const [log, setLog] = useState([]);
  const token = localStorage.getItem("accessToken");
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userId = payload.sub;  // FastAPI 토큰 검증에서 기대하는 값
  
  const item = "화장품";
  const country = "미국";
  const platform = "amazon";

  const appendLog = (label, data) => {
    setLog((prev) => [...prev, `📌 [${label}]\n${JSON.stringify(data, null, 2)}`]);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">🧪 Step 테스트</h2>
      <div className="flex gap-2 mb-4">
        <button onClick={async () => {
          const res = await step1Recommend({ userId, item });
          appendLog("Step1", res);
        }} className="bg-blue-500 text-white px-4 py-2 rounded">Step1</button>

        <button onClick={async () => {
          const res = await step2Recommend({ userId, country });
          appendLog("Step2", res);
        }} className="bg-green-500 text-white px-4 py-2 rounded">Step2</button>

        <button onClick={async () => {
          const res = await step3Guide({ userId, platform, message: "다음" });
          appendLog("Step3", res);
        }} className="bg-yellow-500 text-white px-4 py-2 rounded">Step3</button>

        <button onClick={async () => {
          const res = await step4Translate({ userId, title: "한국 화장품", content: "피부에 좋은 한국산 스킨케어 제품입니다." });
          appendLog("Step4", res);
        }} className="bg-purple-500 text-white px-4 py-2 rounded">Step4</button>
      </div>

      <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded h-[400px] overflow-y-auto">
        {log.map((entry, idx) => (
          <div key={idx} className="mb-4">{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default TestSteps;
