import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useParams, useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/es';


export default function BetDetails() {
    const storedToken = localStorage.getItem('authToken')
    const {id} = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [bet, setBet] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/bets/${id}`)
            setBet(response.data.data)
          } catch (error) {
            console.error(error);
          }
        }
        getData();
    }, [id]);

    const handleChange = (e) => {
          setBet(prev => {
            return {
              ...prev,
              [e.target.name]: e.target.value
            }
          })
    }

    const handleDate = (e) => {
      setBet(prev => {
        return {
          ...prev,
          dateLottery: e._d
        }
      })
    }

    const handleDelete = async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/bets/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          toast.success('Bet deleted')
          navigate("/listado-apuestas-primitiva/");
        } catch (error) {
          console.error(error);
        }
    };  

    const disableDays = current => {
      return current.day() !== 0 && current.day() !== 2 && current.day() !== 3 && current.day() !== 5;
    }

    const submit = () => {
        confirmAlert({
          title: 'Confirmación',
          message: '¿Deseas borrar esta apuesta?',
          buttons: [
            {
              label: 'Sí',
              onClick: () => handleDelete()
            },
            {
              label: 'No',
            }
          ]
        });
      }

    
    const checkValidations = (e) => {
        e.preventDefault()
        const numbersLotery = [bet.num0, bet.num1, bet.num2, bet.num3, bet.num4, bet.num5].sort(function (a, b) { return a - b; });
        const unicos = numbersLotery.filter(function (numero, index, array) {
          return array.indexOf(numero) === index;
        })
            if (unicos.length !== numbersLotery.length) {
              setErrorMessage("Hay números repetidos");
            } 
            else if (unicos.length === numbersLotery.length) {
              setErrorMessage(undefined)
              handleSubmit();
            }
    }  

    const handleSubmit = async (e) => {
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/bets/${id}`, bet, { headers: { Authorization: `Bearer ${storedToken}` } });
          toast.success('Item edit succesfully!');
          navigate(`/listado-apuestas-primitiva`);
        } catch (error) {
          setErrorMessage(error.response.data.error)
        }
      };
  
    return (      
                <div className='bet-details-view'>
                        { bet && (
                               <div className='signup-page padding2h5w'>
                                    <div className='background-top-edit radius15px'>
                                    </div>
                               <div className="title-page"> 
                                 <h1>Editar apuesta</h1>  
                               </div>
    
                              <form onSubmit={checkValidations} className="bet-form padding2x2">
                                  <div className='data-bet'>
                                      <label>Fecha sorteo<span className="note"> (lunes, jueves y sábados)</span></label>
                                      <DatePicker
                                        timeFormat={false}
                                        onChange={handleDate}
                                        isValidDate={disableDays}
                                        name="dateLottery"
                                        input={true}
                                        dateFormat="L"
                                        value={bet.dateLottery}
                                        className="date-picker"
                                        type="String"
                                      />
                                    </div>
                                 
                                  <div className='select-numbers'>
                                      <label>Números sorteo <span className="note">(del 01 al 49)</span></label>
                                          <div>    
                                              <input type="number" name="num0" placeholder="1 a 49" value={bet.num0} min='1' max='49' onChange={handleChange} />
                                              <input type="number" name="num1" placeholder="1 a 49" value={bet.num1} min='1' max='49' onChange={handleChange} />
                                              <input type="number" name="num2" placeholder="1 a 49" value={bet.num2} min='1' max='49' onChange={handleChange} />
                                              <input type="number" name="num3" placeholder="1 a 49" value={bet.num3} min='1' max='49' onChange={handleChange} />
                                              <input type="number" name="num4" placeholder="1 a 49" value={bet.num4} min='1' max='49' onChange={handleChange} />
                                              <input type="number" name="num5" placeholder="1 a 49" value={bet.num5} min='1' max='49' onChange={handleChange} />
                                          </div>
                                  </div>
                                  <div className='reintegro-num'>
                                          <label>Reintegro <span className="note">(del 0 al 09)</span></label>
                                          <div>
                                              <input type="number" name="numReint" placeholder="0 to 9" value={bet.numReint} min='0' max='9' onChange={handleChange} />
                                          </div>

                                  </div>
                                          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                                          <button type="submit" className="bt-submit radius25px">Guardar cambios</button>  <button onClick={submit}> Borrar</button>
                              </form>
                                   
                        </div>
  
                        )}
             </div>
    )
}
 
