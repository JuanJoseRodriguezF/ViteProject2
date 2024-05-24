import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProv";
import { API_URL } from "../auth/constants";
import NavLayout from "../layout/NavLayout";

interface Tweet{
    _id: string;
    title: string;
    completed: boolean;
    idUser: string;
}

export default function Home() {
    const auth = useAuth();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {loadTweets()}, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createTweet(); // Llama a createTweet solo cuando se envía el formulario
    }

    async function createTweet(){
        try {
            const response = await fetch(`${API_URL}/tweets`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify({
                    title,
                }),
            });

            if(response.ok){
                const json = await response.json();
                setTweets([json, ...tweets]);
                setTitle(""); // Limpia el input después de crear el tweet
            } else {
                // Mostrar error de conexión
            }
            const data = await response.json();
            setTweets(data);
        } catch (error) {
            // Manejar errores de fetch o conexión
        }
    }

    async function loadTweets(){
        try {
            const response = await fetch(`${API_URL}/tweets`, {
                headers: {
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                },
            });

            if(response.ok){
                const json = await response.json();
                setTweets(json);
            } else {
                // Mostrar error de conexión
            }
            const data = await response.json();
            setTweets(data);
        } catch (error) {
            // Manejar errores de fetch o conexión
        }
    }

    return (
        <NavLayout>
            <h1>Bienvenid@ {auth.getUser()?.username ?? ""}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What are you thinking about" onChange={(e) => setTitle(e.target.value)} value={title} />
                <button type="submit">Create</button> {/* Cambia type="button" a type="submit" */}
            </form>
            {tweets.map((tweet) => (<div key={tweet._id}>{tweet.title}</div>))}
        </NavLayout>
    );
}