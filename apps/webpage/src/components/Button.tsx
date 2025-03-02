import { Button as ShadButton} from "@repo/ui/button"
import { User } from "lucide-react"


export default function Button() {


  return (
    <ShadButton 
      className="shadow-lg cursor-pointer text-[#FFB20E] hover:bg-[#FFB20E] hover:text-white drop-shadow-[0px_4px_10px_#FFB20E]"
    >
      <User/>
      <span>Logout</span>
    </ShadButton>
  )
}
