import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)


    return (
        <div>
            <p>You are logged to the home page!</p>

            <ul>
                {/* Buyer Contract Page */}
                <li>
                    <a href="/buyer-contracts">Buyer Contracts</a>
                </li>
                {/* Seller Contract Page */}
                <li>
                    <a href="/seller-contracts">Seller Contracts</a>
                </li>
                {/* Create Contract Page */}
                <li>
                    <a href="/create-buyer-contract">Create Buyer Contract</a>
                </li>
                {/* Logout */}
                <li>
                    <button onClick={logoutUser}>Logout</button>
                </li>
            </ul>

        </div>
    )
}

export default HomePage
