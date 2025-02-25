import { Button } from "@repo/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


interface Pizzas {
    id: number,
    pizza_img: string,
    pizza_name: string,
    pizza_price: number,
}

const fetch = async (): Promise<Pizzas[]> => {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/pizzas?limit=15`)
    return data.pizzas
}


export default function Pizza() {
    const { data: pizzas, isLoading, error } = useQuery({
        queryKey: ["pizzas"],
        queryFn: fetch
    })
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <div className="font-bold text-center text-4xl mb-8">All Pizzas</div>
            <div>
                <div className="pizzas flex flex-wrap justify-center gap-5 mb-5">
                    {pizzas?.map((pizz) => (
                        <div className="flex flex-col w-1/6">
                            <div className="image">
                                <img src={pizz.pizza_img} className="rounded-4xl" alt={pizz.pizza_name} />
                            </div>
                            <div className="pizzaName font-semibold ">{pizz.pizza_name}</div>
                            <div className="price font-bold ">Price: {pizz.pizza_price}</div>
                            <Button
                                className="text-white mt-2 w-[100px] cursor-pointer bg-[#F17228] border border-transparent hover:border-[#FF5900] hover:drop-shadow-[0px_4px_10px_#FFB20E] ">
                                Add To Cart</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
