import axios from 'axios'
import {React, useContext, useRef, useState} from 'react'
import {ClientContext} from '../App'

export default function Dashboard() {

    const symbol = useRef()
    const [content, setContent] = useState()

    const client = useContext(ClientContext)

    function handleSendButtonAction(){
        const symbolVal = symbol.current.value

        client.getDetails(symbolVal)
            .then((resp) => setContent(resp.data))
            .catch((error) => console.log('Error during fetching details'))

    }

    return (
        <div>
            <input ref={symbol} type="text"></input>
            <button onClick={handleSendButtonAction}>send</button>
            {
                content
                    ? (
                        <>
                            <br/><br/><br/>
                            <div>{`Name: ${content.name}`}</div>
                            <hr/>
                            <div>{`Symbol: ${content.symbol}`}</div>
                            <hr/>
                            <div>{`Ceo: ${content.ceo}`}</div>
                            <hr/>
                            <div>{`Website: ${content.url}`}</div>
                            <hr/>
                            <div>{`Description: ${content.description}`}</div>
                        </>
                    )
                    : (
                        <div></div>
                    )
            }
        </div>
    )
}
