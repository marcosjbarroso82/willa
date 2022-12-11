/*
Page to create a buyer contract to be sent to a seller with endpoint /api/contracts/create_buyer_contract/

*/

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



// component popup confirm submit
const ConfirmSubmit = (props) => {
    return (
        <div>
            <h1>Confirm Submit</h1>
            <p>Are you sure you want to submit this contract?</p>
            <button onClick={props.handleSubmit}>Yes</button>
            <button onClick={props.handleCancel}>No</button>
        </div>
    )
}



const CreateBuyerContract = () => {
    const [contract, setContract] = useState({})
    const [sellers, setSellers] = useState([])
    const [seller_id, setSellerId] = useState('')
    const [body, setBody] = useState('')
    const [seller_state, setSellerState] = useState('')
    const [buyer_state, setBuyerState] = useState('')

    // get Bearer token from local storage as authTokens -> access

    const token = JSON.parse(localStorage.getItem('authTokens'))['access']

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        axios.get('http://localhost:8000/api/models/users/', config)
            .then(res => {
                setSellers(res.data)
            })
            .catch(err => {
                console.log(err)
            }
            )
    }, [])

    const submitContract = () => {
        let config = {
            headers: {
                ' Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        axios.post('http://localhost:8000/api/models/contracts/create_buyer_contract/', { body, seller: seller_id }, config)
            .then(res => {
                setContract(res.data)
                // navigate to route /contracts/{contract.id}
                window.location.href = `/contracts/${res.data.id}`
                
            })
            .catch(err => {
                console.log(err)
            })
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        // confirm submit
        if (window.confirm('At this point Metamask would be asked to sign the contract. Are you sure you want to submit this contract?')) {
            // submit contract
            submitContract()
        }
    }

    

    return (
        <div>
 

            <h1>Create Buyer Contract</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <label>
                    Seller:
                    <select value={seller_id} onChange={(e) => setSellerId(e.target.value)}>
                        <option value="">Select a seller</option>
                        {sellers.map(seller => (
                            <option key={seller.id} value={seller.id}>{seller.username}</option>
                        ))}
                    </select>
                </label>

                
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreateBuyerContract