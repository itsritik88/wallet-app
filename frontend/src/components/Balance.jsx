import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = ({ updateBalanceRef }) => {
    const [balance, setBalance] = useState(0);

    const fetchBalance = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    useEffect(() => {
        fetchBalance();
        if (updateBalanceRef) {
            updateBalanceRef.current = fetchBalance; // ✅ Save reference to fetchBalance
        }
    }, []);

    return (
        <div className="flex">
            <div className="font-bold text-lg">Your balance</div>
            <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
        </div>
    );
};

