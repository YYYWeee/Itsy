import { useHistory } from "react-router-dom";
import "./SingleOrder.css"

const calculateNewDate = (oldDate) => {
  const date = new Date(oldDate);
  const dateArray=oldDate.split(' ')
  const newDate= dateArray[2]+" "+dateArray[1]+" "+dateArray[3]
  // console.log('new',newDate)
  return newDate
}




function SingleOrder({ order }) {
  const history = useHistory();
  const order_items = Object.values(order?.order_items);
  // const order_date = order.order_items[0].updated_at;

  // let newDate = new Date(oneBookingPOJO.startDate);


  return (
    <>
      <div className="old-order-container">
        <div className="general-info">
          <div className="general-info-date"> Purchased on  {calculateNewDate(order.updated_at)}</div>
          <div className="general-info-price"> $ {order.total_price}</div>
        </div>
        <div className="item-list">
          {order?.order_items &&
            order_items.map((item, index) => (
              <div className="single-item">
                <img className="preview-image-cart cursor"
                  src={item.product_img}
                  alt={item.product_img}
                  onClick={() => history.push(`/listings/${item.product_id}`)}
                />
                <div className="order-right-container">
                  <div>{item.product_name}</div>
                  <div>Quantity: {item.quantity}</div>
                  {/* <div>{item.product_price}</div> */}
                  <div>$: {item.product_price * item.quantity}</div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </>
  )
}
export default SingleOrder;


// Purchased from  VGdesignLT on Aug 30, 2023
