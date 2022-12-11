/* 
Page displaying contract detailed fetched  from /api/contracts/{:id/} endpoint
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


const ContractPage = (props) => {
    const [contract, setContract] = useState([])
    const [messages, setMessages] = useState([])


    // get Bearer token from local storage as authTokens -> access

    const token = JSON.parse(localStorage.getItem('authTokens'))['access']

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }


        axios.get(`http://localhost:8000/api/models/contracts/${props.match.params.id}/`, config)
            .then(res => {
                setContract(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:8000/api/models/messages/?contract=${props.match.params.id}`, config)
            .then(res => {
                setMessages(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            }
        )
    }
    , [])

    return (
        <div>
            <h1>Contract</h1>
            <ul>
                <li>{contract.id} - {contract.body}</li>
                <li>{contract.buyer_state}</li>
                <li>
                    {/* ajax button to set buyer_state to 'accepted' */}
                    <button onClick={() => {
                        let config = {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }

                        }
                        axios.patch(`http://localhost:8000/api/models/contracts/${props.match.params.id}/`, {buyer_state: 'accepted'}, config)
                            .then(res => {
                                setContract(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}>Accept</button>

                </li>
                <li>
                    {/* ajax button to set buyer_state to 'rejected' */}
                    <button onClick={() => {
                        let config = {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }

                        }
                        axios.patch(`http://localhost:8000/api/models/contracts/${props.match.params.id}/`, {buyer_state: 'rejected'}, config)
                            .then(res => {
                                setContract(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    }>Reject</button>
                </li>
                <li>{contract.body}</li>
            </ul>
            <h2>Messages</h2>
            <Messages messages={messages} />
            {/* send message form */}
            <form onSubmit={(e) => {
                e.preventDefault()
                let config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }

                }
                axios.post(`http://localhost:8000/api/models/messages/`, 
                    {
                        contract: props.match.params.id,
                        body: e.target.message.value,
                        sender: contract.buyer,
                        receiver: contract.seller
                    
                    }, config)
                    .then(res => {
                        setMessages([...messages, res.data])
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }}>
                <input type="text" name="message" />
                <input type="submit" value="Send" />
            </form>
            <Link to="/contracts">Back</Link>

        </div>
    )
}

export default ContractPage