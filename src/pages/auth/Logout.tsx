
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    toast.success("সফলভাবে লগআউট হয়েছে");
  };

  return (
  <button
  onClick={handleLogout}
      className="
      cursor-pointer
    flex items-center gap-1.5
    px-3 py-4 sm:py-2
    text-sm sm:text-xs font-bold
    text-red-600
    bg-white
    border border-red-100
    rounded-md
    shadow-sm
    hover:bg-red-50 hover:shadow
    transition-all
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span className="mt-1">
  লগআউট</span>
</button>

  );
};
export default Logout