import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import CartItem from "../../components/cart/CartItem";
import { update_item, remove_item } from "../../redux/actions/cart";
import { setAlert  } from "../../redux/actions/alert";
import { useEffect, useState } from "react";
import { get_shipping_options } from '../../redux/actions/shipping'

import {
    refresh
} from '../../redux/actions/auth';

import { 
    get_payment_total,
    get_client_token,
    process_payment
} from "../../redux/actions/payment";

import DropIn from "braintree-web-drop-in-react";
import Loader from "react-loader-spinner";
import { countries } from '../../helpers/fixedCountries'
import ShippingForm from "../../components/checkout/ShippingForm";

const Checkout = ({
    isAuthenticated, 
    items, 
    update_item, 
    remove_item,
    setAlert,
    get_shipping_options, 
    shipping,
    refresh,
    get_payment_total,
    get_client_token,
    process_payment,
    user,
    total_items,
    clientToken,
    made_payment,
    loading,
    original_price,
    total_after_coupon,
    total_amount,
    total_compare_amount,
    estimated_tax,
    shipping_cost
    }) => {

    const [fromData, setFormData] = useState({
        full_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state_province_region: '',
        postal_zip_code: '',
        country_region: 'Chile',
        telephone_number: '',
        coupon_name: '',
        shipping_id: 0,
    });

    const {
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_zip_code,
        country_region,
        telephone_number,
        coupon_name,
        shipping_id,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        window.scrollTo(0,0)
        get_shipping_options()
    }, [])

    const [render, setRender] = useState(false);
    
    if(!isAuthenticated)
        return <Navigate to='/' />;

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
                                    setAlert={setAlert}
                                />
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const renderShipping = () => {
        if(shipping && shipping !== null && shipping !== undefined){
            return(
                <div className="mb-5">
                    {
                        shipping.map((shipping_option, index) => (
                            <div key={index}>
                                <input
                                    onChange={e => onChange(e)}
                                    value={shipping_option.id}
                                    name='shipping_id'
                                    type='radio'
                                    required
                                />
                                <label className="ml-4">
                                    {shipping_option.name} - ${shipping_option.price} ({shipping_option.time_to_delivery})
                                </label>
                            </div>
                        ))
                    }
                </div>
            );
        }
    };

    return(
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {showItems()}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            Shipping inputs
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">
                            <span>Shipping estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">
                            <span>Tax estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how tax is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">$112.32</dd>
                        </div>
                        </dl>

                        <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Checkout
                        </button>
                        </div>
                    </section>
                    </div>
                </div>
                </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    items: state.Cart.items,
    total_items: state.Cart.total_items,
    shipping: state.Shipping.shipping,
    clientToken: state.Payment.clientToken,
    made_payment: state.Payment.made_payment,
    loading: state.Payment.loading,
    original_price: state.Payment.original_price,
    total_after_coupon: state.Payment.total_after_coupon,
    total_amount: state.Payment.total_amount,
    total_compare_amount: state.Payment.total_compare_amount,
    estimated_tax: state.Payment.estimated_tax,
    shipping_cost: state.Payment.shipping_cost
})

export default connect(mapStateToProps,{
    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
    refresh,
    get_payment_total,
    get_client_token,
    process_payment
}) (Checkout)