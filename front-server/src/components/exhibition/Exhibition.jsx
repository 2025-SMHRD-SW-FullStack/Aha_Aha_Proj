import { useEffect, useState } from "react";
import axios from "../../config/axiosInstance";

const Exhibition = () => {
  const [domesticPosts, setDomesticPosts] = useState([]);
  const [foreignPosts, setForeignPosts] = useState([]);
  const [tab, setTab] = useState("domestic");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/exhibition/mine/${userId}`);
        setDomesticPosts(res.data.domestic);
        setForeignPosts(res.data.foreign);
      } catch (err) {
        console.error("전시관 데이터 불러오기 실패", err);
        alert("전시관 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const postsToShow = tab === "domestic" ? domesticPosts : foreignPosts;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 내 전시관</h1>

      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "domestic" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("domestic")}
        >
          국내 게시판
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "foreign" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("foreign")}
        >
          해외 전시관
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : postsToShow.length === 0 ? (
        <p className="text-gray-500">게시글이 없습니다.</p>
      ) : (
        <div className="grid gap-4">
          {postsToShow.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line mt-2">{post.content}</p>
              <p className="text-xs text-gray-400 mt-1">📅 {post.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exhibition;
