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

        createTweet();
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
            }else{
                //mostrar error de conexion
            }

            const data = await response.json();
            setTweets(data);
        } catch (error) {
            
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
            }else{
                //mostrar error de conexion
            }

            const data = await response.json();
            setTweets(data);
        } catch (error) {
            
        }
    }
    return (
        <NavLayout>
            <h1>Bienvenid@ {auth.getUser()?.username ?? ""}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What are you thinking about" onChange={(e) => setTitle(e.target.value)} value={title} />
                <button type="button">Edit</button>
                <button type="button">Remove</button>
            </form>
            {tweets.map((tweet) => (<div key={tweet._id}>{tweet.title}</div>))}
        </NavLayout>
    );
}