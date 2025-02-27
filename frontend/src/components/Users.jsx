import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!filter.trim()) {
            setUsers([]);
            setFetched(false);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUsers(response.data.users);
                setFetched(true);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
                onChange={(e) => setFilter(e.target.value)} 
                type="text" 
                placeholder="Search users..." 
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>

        <div>
            {!fetched ? <p>Start typing to search for users...</p> : 
            users.length === 0 ? <p>No users found.</p> : 
            users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)} label={"Send Money"} />
        </div>
    </div>
}
