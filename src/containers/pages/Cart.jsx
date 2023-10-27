import Layout from "../../hocs/Layout"

import { connect } from "react-redux"
import {
    get_items,
    get_total,
    get_item_total
} from "../../redux/actions/cart";
import { useEffect } from "react";

const Cart = ({
    get_items,
    get_total,
    get_item_total,
    isAuthenticated,
    items,
    amount,
    compare_amount,
    total_items
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        get_items()
        get_total()
        get_item_total()
    }, [])

    const showItems = () => {
        return(
            <div>
                <h4>Your cart has {total_items} item(s)</h4>
            </div>
        )
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
    get_item_total
}) (Cart)