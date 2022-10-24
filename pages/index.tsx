import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'
import { FiBell, FiSettings, FiLayers } from "react-icons/fi";
import Image from 'next/image';
import Card from '../components/card';
import dp from '../public/assets/img/dp.jpg';
import bcoin from '../public/assets/img/bcoins.png';
import p1 from '../public/assets/img/patterns/p-1.jpg';
import p2 from '../public/assets/img/patterns/p-2.jpg';
import p3 from '../public/assets/img/patterns/p-3.jpg';
import p4 from '../public/assets/img/patterns/p-4.jpg';
import p5 from '../public/assets/img/patterns/p-5.jpg';
import p6 from '../public/assets/img/patterns/p-6.jpg';
import p7 from '../public/assets/img/patterns/p-7.jpg';
import p9 from '../public/assets/img/patterns/p-9.jpg';
import logo from '../public/assets/img/albingo.png';
import { useEffect, useReducer, useRef, useState } from 'react';
import { reducer, ACTIONS, generateNumber, checkCardForMatches, checkForPatterns, findIfExist } from '../utils/gameGactory';

const Home: NextPage = () => {
  const { socket } = useSockets();
  const [cards, dispatch] = useReducer(reducer, [])
  const [currentBall, setCurrentBall] = useState(0);
  const [bingoBall, setBingoBall] = useState([] as Array<number>)
  const interval = useRef(null)
  const [counter, setCounter] = useState(0)


  const styles = {
    flexPatterns: "flex gap-3 text-sm items-center"
  }

  const getRandomNumber = () => {
    let rand = Math.floor(Math.random() * 75)
    setCurrentBall(rand)
    return rand;
  }

  const getCardNumbers = () =>{
    dispatch({type: ACTIONS.NEW_CARD, payload:{numbers:generateNumber(), balls: []}})
  }

  const startRollNumber = () => {
      interval.current = setInterval(() => {
        setBingoBall(current => [...current, getRandomNumber()]);
      }, 1000);
  };

  if(bingoBall.length >= 49){
    clearInterval(interval.current);
  }

  useEffect(()=>{
    startRollNumber()
    return () => clearInterval(interval.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    cards.map((card: any, index: number)=>{
      let newBalls = card.cardBallIndex;
      let newPatterns = card.patterns
      if(checkForPatterns(card.cardBallIndex) != 0){
        const foundPattern = checkForPatterns(card.cardBallIndex)
        if(newPatterns.length == 0){
          newPatterns.push(foundPattern)
          let point = card.points + foundPattern.point;
          dispatch({type: ACTIONS.INCREASE_POINT, payload: {points: point , id: card.id}})
          dispatch({type: ACTIONS.ADD_POINT, payload: {patterns: newPatterns, id: card.id}})
        }else{
          if(!findIfExist(newPatterns, foundPattern.name)){
            newPatterns.push(foundPattern)
            let point = card.points + foundPattern.point;
            dispatch({type: ACTIONS.INCREASE_POINT, payload: {points: point , id: card.id}})
            dispatch({type: ACTIONS.ADD_POINT, payload: {patterns: newPatterns, id: card.id}})
          }
        }
      }
      if(checkCardForMatches(card.cardNo, currentBall) != undefined){
        const {cell, indexNo} = checkCardForMatches(card.cardNo, currentBall)
        newBalls.push(indexNo)
        dispatch({type:ACTIONS.UPDATE_INDEX, payload: {cardIndex: newBalls, id: card.id}})
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bingoBall])

  const colors = ['bg-blue-400', 'bg-orange-400', 'bg-red-400', 'bg-green-400']

  return (
    <div className='w-full h-screen bg-theme-blue flex font-outfitRegular'>
      <aside className='w-[15%] bg-white flex flex-col justify-start items-start py-10'>
        <div className='profile flex flex-col justify-center items-center w-full pb-5'>
          <Image className='rounded-full shadow-lg' 
            width={90}
            height={90}
            src={dp}
            alt='default profile'>
          </Image>
          <p className='mt-2'>Mr. NobodyButtMe</p>
          <span className='text-gray-400 text-sm'>jtggtg15@gmail.com</span>
        </div>
        <div className='wallet flex justify-center items-center w-full border-t-2 border-b-2'>
          <Image src={bcoin} alt='bcoin' width={20} height={20}></Image>
          <p className='font-outfitBold text-sm px-2 py-2 text-blue-600'><span className=' text-gray-700'>Balance: </span> Php. 1,512.12</p>
        </div>
        <div className='patterns p-5 w-full grid grid-2 gap-5 px-10'>
          <h2 className=' font-bold text-sm py-3 col-span-2 text-center'>EXTRA PATTERNS</h2>
          <div className={styles.flexPatterns}>
            <Image src={p1} height={30} width={30} alt="pattern"></Image>
            <p>50</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p2} height={30} width={30} alt="pattern"></Image>
            <p>65</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p3} height={30} width={30} alt="pattern"></Image>
            <p>70</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p4} height={30} width={30} alt="pattern"></Image>
            <p>105</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p5} height={30} width={30} alt="pattern"></Image>
            <p>120</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p6} height={30} width={30} alt="pattern"></Image>
            <p>150</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p7} height={30} width={30} alt="pattern"></Image>
            <p>201</p>
          </div>
          <div className={styles.flexPatterns}>
            <Image src={p9} height={30} width={30} alt="pattern"></Image>
            <p>250</p>
          </div>
        </div>
      </aside>
      <main className='w-[85%] bg-gray-100 overflow-x-hidden'>
        <nav className='flex flex-col justify-between w-[100%] h-max gap-1 '>
          <div className='flex justify-between items-center gap-4 w-full p-4'>
            <Image src={logo} alt="albingo" width={170} height={30}></Image>
            <div className='flex justify-between gap-4 items-center'>
              <FiBell className='text-gray-600'/>
              <FiSettings className='text-gray-600' />
              <button className='rounded-full text-sm text-white bg-orange-500 py-1 px-5'> Connect to Wallet</button>
            </div>
          </div>
          <div className='flex gap-2 items-center flex-start bg-gray-200 h-[4em] px-7'>
            <p className='text-blue-600 font-outfitSemiBold'>Pick No: ({bingoBall.length}/49)</p>
            <div className='flex gap-2 items-center justify-end flex-row-reverse max-w-[1000px] transition-all   flex-nowrap'>
              {
                bingoBall.map((ball, i)=>{
                  return <div key={i} className='h-[2em] w-[2em] bg-white border-2 border-orange-200 rounded-full transition-all flex  justify-center items-center shadow-md animate-bubble-up min-h-[2em] min-w-[2em]'>{ball}</div>
                })
              }
            </div>
          </div>
        </nav>
        <section className='flex flex-col p-6 w-full'>
          <div className='flex justify-between items-center'>
            <p className=' font-outfitSemiBold text-xl pb-5'>Top Players Card</p>
            <button className='rounded-lg text-sm text-white bg-blue-500 py-1 px-2 flex items-center gap-2' onClick={()=>getCardNumbers()}>
              <FiLayers /> + New Card
            </button>
          </div>
          <div className='flex gap-2 flex-wrap'>
            {
              cards.map((card: Array<number>, i:number)=>{
                return <Card key={i} numbers={card.cardNo} ball={bingoBall} points={card.points}/>
              })
            }
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
