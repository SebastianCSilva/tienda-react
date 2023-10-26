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
    get_item_total
}) => {

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
    }, [])

    return(
        <Layout>
            cart
        </Layout>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    get_items,
    get_total,
    get_item_total
}) (Cart)