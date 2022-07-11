import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../css/Lucky.css'
import {Wheel} from 'react-custom-roulette'

const Lucky = ({user}) => {
    const [hidden, setHidden] = useState(true)
    const [ticket, setTicket] = useState()
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/store/lucky/${user}`).then(res => {
            setTicket(res.data[0].number)
        })
       
    },[user])

    const data  = [
        {option: 'item 0', style: {backgroundColor: '#7e19a5', textColor: '#fff'}},
        {option: 'item 1', style: {backgroundColor: '#4d9247', textColor: '#fff'}},
        {option: 'item 2', style: {backgroundColor: '#c61b33', textColor: '#fff'}},
        {option: 'item 3', style: {backgroundColor: '#7e19a5', textColor: '#fff'}},
        {option: 'item 4', style: {backgroundColor: '#4d9247', textColor: '#fff'}},
        {option: 'item 5', style: {backgroundColor: '#c61b33', textColor: '#fff'}},
    ]
    const handleSpinClick = () =>{
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        if(ticket >= 1){
            setMustSpin(true)
        }
    }
    const handleHidden = () => { 
        setHidden(false);
        setTimeout(() => {
            setHidden(true)
        }, 2000)
    }
    const reduceTicket = () => {
        axios.put(`http://localhost:5000/store/lucky`,{userid: user, number: ticket - 1}).then(res => {
            console.log('Reduce success')
        })
        setTicket(prev => (prev - 1))
    }
    return(
        <div className='lucky'>
            <div className='lucky-nav'>
                <Link to={'/store'} className="store"><i className="fa-solid fa-chevron-left"></i> Store</Link>
                <div className='ticket'>Ticket: {ticket} <i className="fa-solid fa-ticket"></i></div>
            </div>
            <h1 className='lucky-header'>WHEEL OF FORTUNE</h1>
            <div className='lucky-wheel'>
                <Wheel
                    mustStartSpinning = {mustSpin}
                    prizeNumber = {prizeNumber}
                    data = {data}
                    outerBorderColor = {'#aa1fa6'}
                    outerBorderWidth = {12}
                    innerBorderColor = {'#efd06a'}
                    innerBorderWidth= {5}
                    radiusLineWidth = {5}
                    radiusLineColor = {'#efd06a'}
                    perpendicularText = {false}
                    fontSize = {20}
                    onStopSpinning = {() => {
                        setMustSpin(false)
                        handleHidden()
                        reduceTicket()
                    }}
                    spinDuration = {0.5}
                />
                <button onClick={handleSpinClick}>Spin</button>
            </div>
            <div className={`prize ${hidden? 'hidden' : ''}`}>
                <span className='prize-header'>Congratulations!!!</span>
                <span className='prize-desc'> You wont {data[prizeNumber].option}</span>
            </div>
        </div>
    )
}
export default Lucky