import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProv";
import NavLayout from "../layout/NavLayout";
import { API_URL } from "../auth/constants";

interface Tweet {
    _id: string;
    title: string;
    completed: boolean;
    idUser: string;
}

export default function Profile() {
    const auth = useAuth();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        loadTweets();
    }, []);

    async function loadTweets() {
        try {
            const response = await fetch(`${API_URL}/tweets`, {
                headers: {
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                }
            });

            if (response.ok) {
                const json = await response.json();
                setTweets(json);
            } else {
                console.error("Error fetching tweets");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTweet(id: string) {
        try {
            const response = await fetch(`${API_URL}/tweets/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                }
            });

            if (response.ok) {
                setTweets(tweets.filter(tweet => tweet._id !== id));
            } else {
                console.error("Error deleting tweet");
            }
        } catch (error) {
            console.error(error);
        }
    }

    function startEditing(tweet: Tweet) {
        setEditingTweetId(tweet._id);
        setNewTitle(tweet.title);
    }

    function cancelEditing() {
        setEditingTweetId(null);
        setNewTitle("");
    }

    async function updateTweet(id: string) {
        try {
            const response = await fetch(`${API_URL}/tweets/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (response.ok) {
                const updatedTweet = await response.json();
                setTweets(tweets.map(tweet => (tweet._id === id ? updatedTweet : tweet)));
                cancelEditing();
            } else {
                console.error("Error updating tweet");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <NavLayout>
            <h1 className="up">Profile</h1>
            <div className="additionalText">
                <div className="userInfo">
                    <i className="fas fa-user userIcon"></i>
                    <div className="userDetails">
                        <p>{auth.getUser()?.username ?? ""}</p>
                        <p>{auth.getUser()?.email ?? ""}</p>
                    </div>
                </div>
                <div className="white">
                    <p>Change Password</p>
                    <p>Options</p>
                    <p>Help</p>
                    <p>Terms and Conditions</p>
                    <p>About Us</p>
                </div>
            </div>
            <h2>My Tweets:</h2>
            <div className="tweetsContainer">
                {tweets.map(tweet => (
                    <div className="tweet" key={tweet._id}>
                        {editingTweetId === tweet._id ? (
                            <>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="tweet-edit-input"
                                />
                                <div className="button-container">
                                    <button className="tweet-button" onClick={() => updateTweet(tweet._id)}>Actualizar</button>
                                    <button className="tweet-button" onClick={cancelEditing}>Cancelar</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="userInfo">
                                    <i className="fas fa-user userIcon"></i>
                                    <div className="userDetails">
                                        <p>{auth.getUser()?.username ?? ""}</p>
                                        <p>{auth.getUser()?.email ?? ""}</p>
                                    </div>
                                </div>
                                <h2 className="tweet-title">{tweet.title}</h2>
                                
                                <div className="button-container">
                                    <button className="tweet-button" onClick={() => deleteTweet(tweet._id)}><i className="fa-solid fa-trash"></i></button>
                                    <button className="tweet-button" onClick={() => startEditing(tweet)}><i className="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </NavLayout>
    );
}