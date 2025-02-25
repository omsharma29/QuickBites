import Banner from "../components/Banner"
import FlashBox from "../components/FlashBox"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HowItWorks from "../components/HowItWorks"
import Pizza from "../components/Pizza"

function Home() {
  return (
    <div className="">
    <Header/>
    <FlashBox/>
    <HowItWorks/>
    <Pizza/>
    <Banner/>
    <Footer/>
    </div>
  )
}

export default Home