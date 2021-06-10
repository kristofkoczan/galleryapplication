import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import store from './../../../../store';
import PICTURES from './../../../../database/PICTURES.json'

export default function Rating(props) {
    const [rate, setRate] = React.useState(0)
    let rated = false;
    let index = PICTURES.indexOf(props.picture);

    const handleClick = param => {
        PICTURES[index].rating.push({name: localStorage.getItem('username'), rating: rate});
        setRate(0)
    }
    
    PICTURES[index].rating.map(rates => rates.name === localStorage.getItem('username') ? rated = true : '');

    if(!rated){
        return (
            <div>
                <span onMouseEnter={() => setRate(1)}  onMouseLeave={() => setRate(0)} onClick={() => handleClick(1)}>
                    {rate > 0 ? <StarIcon className="icon"/> : <StarBorderIcon className="icon"/>}
                </span>
                <span onMouseEnter={() => setRate(2)}  onMouseLeave={() => setRate(0)} onClick={() => handleClick(2)}>
                    {rate > 1 ? <StarIcon className="icon"/> : <StarBorderIcon className="icon"/>}
                </span>
                <span onMouseEnter={() => setRate(3)}  onMouseLeave={() => setRate(0)} onClick={() => handleClick(3)}>
                    {rate > 2 ? <StarIcon className="icon"/> : <StarBorderIcon className="icon"/>}
                </span>
                <span onMouseEnter={() => setRate(4)}  onMouseLeave={() => setRate(0)} onClick={() => handleClick(4)}>
                    {rate > 3 ? <StarIcon className="icon"/> : <StarBorderIcon className="icon"/>}
                </span>
                <span onMouseEnter={() => setRate(5)}  onMouseLeave={() => setRate(0)} onClick={() => handleClick(5)}>
                    {rate > 4 ? <StarIcon className="icon"/> : <StarBorderIcon className="icon"/>}
                </span>
            </div>
        )
    }else{
        let rateArray = [];
        let temp = 0;
        PICTURES[index].rating.map(usersRate => (temp = temp + usersRate.rating));
        temp = temp  / PICTURES[index].rating.length;
        for(let i = 1; i<6; i++){
            if(i <= temp){
                rateArray.push(true)
            }else{
                rateArray.push(false)
            }
        }
        return (
            <div onMouseEnter={() => setRate(0)}>
                {rateArray.map(elem => elem ? ( <span>
                    <StarIcon className="icon"/>
                </span>) : ( <span>
                    <StarBorderIcon className="icon"/>
                </span>))}
               
            </div>
        )
    }

}
