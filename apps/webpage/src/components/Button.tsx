import { Button as ShadButton} from "@repo/ui/button"
import {User} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Button() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove email from localStorage
    window.location.reload(); // Refresh the page to update UI
  };

  return (
    <ShadButton 
      onClick={handleLogout}
      className="shadow-lg cursor-pointer text-[#FFB20E] hover:bg-[#FFB20E] hover:text-white drop-shadow-[0px_4px_10px_#FFB20E]"
    >
      <User/>
      <span>Logout</span>
    </ShadButton>
  )
}
