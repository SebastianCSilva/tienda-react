import Layout from "../../hocs/Layout"

import { connect } from "react-redux"
import {
    remove_item,
    update_item,
    get_items,
    get_total,
    get_item_total
} from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";

const Cart = ({
    get_items,
    get_total,
    get_item_total,
    isAuthenticated,
    items,
    amount,
    compare_amount,
    total_items,
    remove_item,
    update_item
}) => {

    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        get_items()
        get_total()
        get_item_total()
    }, [render])

    const showItems = () => {
        return(
            <div>
                <h4>Your cart has {total_items} item(s)</h4>

                {
                    items &&
                    items !== null &&
                    items !== undefined &&
                    items.length !== 0 &&
                    items.map((item, index)=>{
                        let count = item.count;
                        return(
                            <div key={index}>
                                <CartItem
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                />
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const checkoutButton = () => {
        if(total_items < 1){
            <Link
                to='/shop'
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Busca items para comprar
            </Link>
        } else if (!isAuthenticated){
            <Link
                to='/login'
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Login
            </Link>
        } else {
            <Link
                to='/checkout'
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Busca items para comprar
            </Link>
        }
    }

    return(
        <Layout>
            {showItems()}
        </Layout>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items
})

export default connect(mapStateToProps,{
    get_items,
    get_total,
    get_item_total,
    remove_item,
    update_item
}) (Cart)