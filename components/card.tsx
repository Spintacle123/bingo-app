import type { NextPage } from 'next'
import { useEffect, useReducer, useState } from 'react'
import { FiStar } from "react-icons/fi";
import { ACTIONS, reducer } from '../utils/gameGactory';

interface Props {
    numbers: Array<number>,
    ball: Array<number>,
    points: number
}

const Card: NextPage<Props> = (props) => {
    const { numbers, ball, points } = props;
    const [cardNumber, setCardNumber] = useState<Array<number>>([])

    const styles = {
        cells: "h-[2em] w-[2em] border-1 flex items-center justify-centerh-[2em] w-[2em] border-r-2 border-b-2 flex items-center justify-center",
        titleCell: "flex justify-center items-center"
    }

    const inBalls = (x: number, index: number) => {
        if(ball.includes(x)){
            // dispatch({type:ACTIONS.UPDATE_INDEX, payload: {cell:x, index:index}})
            return true;
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg  border-t-2 border-l-2 shadow-lg bg-blue-400 text-white">
                <div className={styles.titleCell}>B</div>
                <div className={styles.titleCell}>I</div>
                <div className={styles.titleCell}>N</div>
                <div className={styles.titleCell}>G</div>
                <div className={styles.titleCell}>O</div>
            </div>
            <div className="grid grid-cols-5 rounded-md border-t-2 border-l-2 shadow-lg bg-white">
                {
                    numbers?.map((no, i) =>{
                        return (
                            i != 12 ? 
                            <div key={i} className={`${styles.cells} ${inBalls(no, i) ? "bg-orange-400 text-white rounded-lg": ""}`}>
                                <p>{no}</p></div> : 
                            <div key={i} className={`${styles.cells} bg-blue-400 text-white`}>
                                <FiStar />
                            </div> 
                        );
                    })
                }
            </div> 
            <div className='flex justify-between items-center bg-gray-400 rounded-bl-lg rounded-br-lg h-[1.2em] px-2'>
                {
                    points != 0 &&
                    <>
                        <p className='text-[0.7em] text-gray-100'>Win Points:</p>
                        <p className='text-[0.7em] text-gray-200 font-outfitBold'>{points}</p>
                    </>
                }
            </div>
        </div>
      
    );
}

export default Card
