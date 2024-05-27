import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProv";
import { API_URL } from "../auth/constants";
import NavLayout from "../layout/NavLayout";

interface Tweet {
    _id: string;
    title: string;
    completed: boolean;
    idUser: string;
}

export default function Home() {
    const auth = useAuth();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => { loadTweets(); }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (title.trim() === "") {
            // Si el título está vacío, no hacer nada
            return;
        }

        await createTweet(); // Llama a createTweet solo cuando se envía el formulario y el título no está vacío
    }

    async function createTweet() {
        try {
            const response = await fetch(`${API_URL}/tweets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                const json = await response.json();
                setTweets([json, ...tweets]);
                setTitle(""); // Limpia el input después de crear el tweet
            } else {
                // Mostrar error de conexión
                console.error("Error creating tweet:", response.statusText);
            }
        } catch (error) {
            // Manejar errores de fetch o conexión
            console.error("Error creating tweet:", error);
        }
    }

    async function loadTweets() {
        try {
            const response = await fetch(`${API_URL}/tweets`, {
                headers: {
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                },
            });

            if (response.ok) {
                const json = await response.json();
                setTweets(json);
            } else {
                // Mostrar error de conexión
                console.error("Error loading tweets:", response.statusText);
            }
        } catch (error) {
            // Manejar errores de fetch o conexión
            console.error("Error loading tweets:", error);
        }
    }

    return (
        <NavLayout>
            <h1 className="up">Welcome {auth.getUser()?.username ?? ""}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What are you thinking about"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <button type="submit"><i className="fa-solid fa-plus"></i></button>
            </form>
            
            <div className="tweetsContainer">
                {tweets.map((tweet) => (
                    <div className="tweet" key={tweet._id}>
                        <div className="userInfo">
                            <i className="fas fa-user userIcon"></i>
                            <div className="userDetails">
                                <p className="tweetUser">{auth.getUser()?.username ?? ""}</p>
                                <p className="tweetMail">{auth.getUser()?.email ?? ""}</p>
                            </div>
                        </div>
                        <h2 className="tweet-title">{tweet.title}</h2>
                    </div>
                ))}
            </div>
        </NavLayout>
    );
}