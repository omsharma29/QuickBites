import { Button as ShadButton} from "@repo/ui/button"
import { User } from "lucide-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@repo/Store"
import { logoutUser } from "@repo/store"

export default function Button() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
