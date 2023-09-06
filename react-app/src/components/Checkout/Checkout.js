import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { placeOrderThunk } from "../../store/orders";
import "./Checkout.css";

function Checkout() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();


  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [addressError, setAddressError] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')


  const handleZipCode = e => {
    if (e.target.value.length <= 5 && /^[0-9]*$/.test(e.target.value)) setZip(e.target.value)
  }

  const handleAddress = e => {
    if (e.target.value.length <= 1000) setAddress(e.target.value)
  }

  const handleCity = e => {
    if (e.target.value.length <= 50) setCity(e.target.value)
  }

  const STATES = {
    AK: 'Alaska',
    AL: 'Alabama',
    AR: 'Arkansas',
    AZ: 'Arizona',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    IA: 'Iowa',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    MA: 'Massachusetts',
    MD: 'Maryland',
    ME: 'Maine',
    MI: 'Michigan',
    MN: 'Minnesota',
    MO: 'Missouri',
    MT: 'Montana',
    NC: 'North Carolina',
    ND: 'North Dakota',
    NE: 'Nebraska',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NV: 'Nevada',
    NY: 'New York',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VA: 'Virginia',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    WA: 'Washington',
    WI: 'Wisconsin',
    WV: 'West Virginia',
    WY: 'Wyoming',
  }
  useEffect(() => {

    if (!address.length) setAddressError('Street Address is required')
    else setAddressError('')

    if (zip.length !== 5) setZipCodeError(' Zip code is invalid')
    else setZipCodeError('')

    if (!city.length) setCityError('City is required')
    else setCityError('')

    if (!state.length) setStateError('State is required')
    else setStateError('')

  }, [address, zip, city, state])


  const handleSubmit = async (e) => {
    e.preventDefault();
    let fullAddress = address + ',' + city + ',' + state + ' ' + zip
    // console.log('full_address is ------>', fullAddress)
    const formData = {
      shipping_address: fullAddress,
    };


    const data = await dispatch(placeOrderThunk(formData));
    history.push(`/order/confirm`);

    // history.push(`/orders`);

  }

  return (
    <>

      <div className="checkout-form-page">
        <div className="form-container-enter-address">

          <h1 className="checkout-page-title">Enter an address</h1>


          <form onSubmit={handleSubmit} id="enter-address-form">

            <div className="street-address-section">
              <div><label>Street address</label></div>
              <input
                id='id_address'
                className='address-field'
                type='text'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              {addressError && <div className='error-section-checkout'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>{addressError}</div>}
            </div>

            <div className="zip-code-section">
              <div><label>Zip code</label></div>
              <input
                id='id_zip'
                className='zip-field'
                type='text'
                value={zip}
                onChange={handleZipCode}
              />
              {zipCodeError && <div className='error-section-checkout'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>{zipCodeError}</div>}
            </div>
            <div className="city-section">
              <div><label>City</label></div>
              <input
                id='id_city'
                className='city-field'
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              {cityError && <div className='error-section-checkout'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>{cityError}</div>}
            </div>



            <div className='state-section'>
              <div><label>State <span>*</span></label></div>
              <select
                className='select-state-menu'
                value={state}
                defaultValue={state}
                onChange={e => setState(e.target.value)}
              >
                <option value='' disabled>Select state</option>
                {Object.keys(STATES).map(key =>
                  <option value={key} key={key}>{STATES[key]}</option>
                )}
              </select>
              {stateError && <div className='error-section-checkout'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>{stateError}</div>}
            </div>

            <button type="submit" className="placeOrderButton" disabled={addressError || zipCodeError || cityError || stateError} >
              Place order
            </button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Checkout;




// Street address
// Zip code
// City
// State
