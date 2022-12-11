/* 
Page listing contracts from /api/contracts/ endpoint
*/

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SellerContracts = () => {
    const [contracts, setContracts] = useState([])
    // get Bearer token from local storage as authTokens -> access

    const token = JSON.parse(localStorage.getItem('authTokens'))['access']


    useEffect(() => {
        // get Bearer token from local storage
        // const token = localStorage.getItem('token')
        // request with Bearer token
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }


        axios.get('http://localhost:8000/api/models/contracts/get_seller_contracts/', config)
            .then(res => {
                setContracts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1>Contracts</h1>
            <ul>
                {contracts.map(contract => (
                    <li key={contract.id}>
                        <Link to={`/contracts/${contract.id}`}>{contract.id} - {contract.body}</Link>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}

export default SellerContracts