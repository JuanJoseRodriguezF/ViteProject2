import { useState } from "react";
import { API_URL } from "../auth/constants";
import NavLayout from "../layout/NavLayout";
import { useAuth } from "../auth/AuthProv";

interface Tweet {
    _id: string;
    title: string;
    content: string;
}

export default function Profile() {
    const auth = useAuth();
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
    const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([]); // Estado para almacenar los tweets filtrados

    // Función para manejar el cambio en el input de búsqueda
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Función para manejar la solicitud de búsqueda
    const handleSearch = async () => {
        try {
            const response = await fetch(`${API_URL}/tweets?title=${encodeURIComponent(searchTerm)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFilteredTweets(data);
            } else {
                console.error("Error fetching tweets");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NavLayout>
            <h1 className="up">Search:</h1>
            <input type="text" value={searchTerm} onChange={handleInputChange} /> {/* Manejar el cambio en el input */}
            <button onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button> {/* Llamar a la función de búsqueda al hacer clic en el botón */}
            {/* Mostrar los tweets filtrados */}
            <div className="tweetsContainer">
                {filteredTweets.map((tweet) => (
                    <div className="tweet" key={tweet._id}>
                        <div className="userInfo">
                            <i className="fas fa-user userIcon"></i>
                            <div className="userDetails">
                                <p className="tweetUser">{auth.getUser()?.username ?? ""}</p>
                                <p>{auth.getUser()?.email ?? ""}</p>
                            </div>
                        </div>
                        <h2 className="tweet-title">{tweet.title}</h2>
                        <p className="tweet-content">{tweet.content}</p>
                    </div>
                ))}
            </div>
        </NavLayout>

    );
}