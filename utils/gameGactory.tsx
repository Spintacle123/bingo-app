export const b: Array<number> = [0,5,10,15,20];
export const i: Array<number> = [1,6,11,16,21];
export const n: Array<number> = [2,7,12,17,22];
export const g: Array<number> = [3,8,13,18,23];
export const o: Array<number> = [4,9,14,19,24];

export const findArray = (arr: Array<number>, x: number) => {
    return arr.find((val) => {
        return val == x;
    });
}

export const PATTERNS = {
    SQUARE: [0,4,20,24]
}
export const ACTIONS = {
    NEW_CARD: 'new-card',
    UPDATE_INDEX: 'update-index',
    ADD_POINT: 'add-point',
    INCREASE_POINT: 'increase-point'
}


export const reducer = (card: State, actions: Action): State => {
    switch(actions.type){
        case ACTIONS.NEW_CARD:
            return [...card, newCard(actions.payload.numbers,actions.payload.balls)]
        case ACTIONS.UPDATE_INDEX:
            return card.map((item: any)=>{
                if(item.id == actions.payload.id){
                    return {...item, cardBallIndex: actions.payload.cardIndex};
                }
                return item;
            })
        case ACTIONS.ADD_POINT:
            return card.map((item: any)=>{
                if(item.id == actions.payload.id){
                    return {...item, patterns: actions.payload.patterns}
                }
                return item;
            })
        case ACTIONS.INCREASE_POINT:
            return card.map((item: any)=>{
                if(item.id == actions.payload.id){
                    return {...item, points: actions.payload.points}
                }
                return item;
            })
    };
}

export const newBall = (cell: number, index: number) => {
    return {
        id: new Date().valueOf(),
        cellNo: cell,
        indexNo: index
    }
}

export const newCard = (num: Array<number>, balls: Array<number>) =>{
    return {
        id: new Date().valueOf(),
        cardNo: num,
        cardBallIndex: balls,
        patterns: [],
        points: 0
    }
}

export const findIfExist = (patterns: Array<object>, name: string) => {
    console.log(patterns)
    console.log(name)
    let exist = false;
    patterns.find((o: any) => {
        if (o.name == name) {
            exist = true;
            return true;
        }
    });

    return exist;
}

export const checkForPatterns = (index: Array<number>) => {
    // if(index.includes(PATTERNS.SQUARE[0]) && index.includes(PATTERNS.SQUARE[2]) && index.includes(PATTERNS.SQUARE[3]) && index.includes(PATTERNS.SQUARE[4])){
    //     return {name:'left',point: 50};
    // }
    if(index.includes(PATTERNS.SQUARE[0]) && index.includes(PATTERNS.SQUARE[1]) && index.includes(PATTERNS.SQUARE[2]) && index.includes(PATTERNS.SQUARE[3])){
        return {name:'left',point: 50};
    }
    else{
        return 0;
    }
}

export const checkCardForMatches = (cardNo: any, ball: number) => {
    let data;
    cardNo?.map((cell: number, index: number)=>{
        if(cell == ball){
            data = {cell: cell, indexNo:index}
        }
    })
    return data;
}





// TO GENERATE NEW CARD
const getRandomInRange = (min: number, max: number) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateNumber = () => {
    let nums = [] as Array<number>, newNumber: number, x: number;
    
    for(x = 0; x < 25; x++){
        if(findArray(b,x) || x == 0){
            newNumber = getRandomInRange(1, 15);
            if(nums.includes(newNumber)){
                newNumber = getRandomInRange(1, 15);
            }
            nums.push(newNumber)
        }else if(findArray(i,x)){
            newNumber = getRandomInRange(16, 30);
            if(nums.includes(newNumber)){
                newNumber = getRandomInRange(16, 30);
            }
            nums.push(newNumber)
        }else if(findArray(n,x)){
            if(x == 12){
                newNumber = 0;
            }
            newNumber = getRandomInRange(31, 45);
            if(nums.includes(newNumber)){
                newNumber = getRandomInRange(31, 45);
            }
            nums.push(newNumber)
        }else if(findArray(g,x)){
            newNumber = getRandomInRange(45, 60);
            if(nums.includes(newNumber)){
                newNumber = getRandomInRange(45, 60);
            }
            nums.push(newNumber)
        }else if(findArray(o,x)){
            newNumber = getRandomInRange(61, 75);
            if(nums.includes(newNumber)){
                newNumber = getRandomInRange(61, 75);
            }
            nums.push(newNumber)
        }
        else{
            nums.push(0)
        }
    }
 
    return nums;
}