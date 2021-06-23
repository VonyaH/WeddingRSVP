import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export const RsvpForm = () => {
    const [code, setCode] = useState('');
    const [statusError, setStatusError] = useState('');
    let history = useHistory();

    const checkReservation = (e: any) => {
        e.preventDefault();
        if (code !== '') {
            axios.get(`api/guest/${code}`).then(res => {
                const { data } = res
                if (data.length > 0) {
                    setStatusError('');
                    return history.push(`/invited/${code}`);
                } else {
                    return setStatusError('Hmm.. we don\'t recognize this code.');
                }
            }).catch(()=> {
                return setStatusError('Hmm.. we don\'t recognize this code.');
            });
        } else {
            return setStatusError('Sorry, do you have a code?');
        }
    };

    return (
        <div className="rsvp">
                <div className="rsvp-card">
                    <div className="intro-box">
                        RSVP for the wedding of Hepburn + Cox.
                    </div>
                    <div className="rsvp-form">
                        <form onSubmit={checkReservation} className='rsvp-form'>
                            <label htmlFor="findRSVP" className='form-label'>Enter your invitation code</label><br />
                            <input type="text" id='findRSVP' className='textfield'name='code' onChange={(e: any)=> { setCode(e.target.value)}}/>
                                {statusError!=='' && <div className='form-error'>{statusError}</div>}
                            <input type="submit" value="Check code" className='btn btn-rsvp'/>
                        </form>
                    </div>
                </div>
        </div>
    )
}