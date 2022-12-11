/* 
Page listing contracts from /api/contracts/ endpoint
*/

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


// component to render a list of messages received in props
const Messages = (props) => {
    const messages = props.messages
    const listMessages = messages.map((message) =>
        <li key={message.id}>{message.body}</li>
    )
    return (
        <ul>{listMessages}</ul>
    )
}


const BuyerContracts = () => {
    const [contract, setContract] = useState([])
    const [messages, setMessages] = useState([])
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


        // // http://localhost:8000/api/models/messages/?contract={contract.id}
        // axios.get('http://localhost:8000/api/models/messages/?{contract.id}', config)
        //     .then(res => {
        //         setMessages(res.data)
        //     }
        //     )
        //     .catch(err => {
        //         console.log(err)
        //     }
        // )

        
    }, [])

    return (
        <div>
            <h1>Contracts</h1>
            <ul>
                {contract.map(contract => (
                    <li key={contract.id}>
                        <Link to={`/contracts/${contract.id}`}>{contract.id} - {contract.body}</Link>
                    </li>
                    
                ))}
            </ul>
            <h2>Messages</h2>
            <Messages messages={messages}/> 
        </div>
    )
}

export default BuyerContracts