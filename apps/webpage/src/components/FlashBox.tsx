import { useQuery } from "@tanstack/react-query";
import axios from "axios"

interface Pizza {
    id: number;
    pizza_name: string; // Correcting based on your API
    pizza_img: string;  // Correcting based on your API
}

const fetchPizzas = async (): Promise<Pizza[]> => {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/pizzas?limit=5`)

    return data.pizzas;
}

const rated = [{ "i": "Best Rates" }, { "i": "Cheapest Price" }, { "i": "Top Choice" }, { "i": "Best Deals" }, { "i": "New Arrival" }]

function FlashBox() {
    const { data: pizzas, isLoading, error } = useQuery({
        queryKey: ["pizzas", 4],
        queryFn: fetchPizzas,
    })
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("Fetched pizzas:", pizzas)
    return (
        <div className="flex  mt-16 justify-center gap-10">
            {(pizzas ?? []).map((pizza, index) => (
                <div key={pizza.id} className="pizza-box text-center">
                    {/* Pizza Image */}
                    <div className="image">
                        <img src={pizza.pizza_img}
                            className="rounded-2xl  drop-shadow-[0px_4px_10px_#FFB20E] border-2 border-transparent hover:border-black  mb-4"
                            alt={pizza.pizza_name} />
                    </div>

                    {/* Pizza Name */}
                    <div className="pizzaName font-bold">{pizza.pizza_name}</div>

                    {rated[index] && (
                        <div className="rated mt-1 mb-5 bg-red-500 text-white font-stretch-semi-condensed rounded-4xl">{Object.values(rated[index])[0]}</div>
                    )}
                </div>
            ))}
        </div>

    )
}

export default FlashBox