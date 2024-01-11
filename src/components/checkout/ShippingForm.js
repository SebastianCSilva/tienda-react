import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const ShippingForm = (
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    telephone_number,
    countries,
    onChange,
    buy,
    user,
    renderShipping,
    total_amount,
    total_compare_amount,
    estimated_tax,
    shipping_cost,
    shipping_id,
    shipping
) => {
    return(
        <div>
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
                    {renderShipping()}
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how shipping is calculated</span>
                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{shipping && shipping_id !== 0 ? <>${shipping_cost}</>:<div className="text-red-500">(Please select shipping option)</div>}</dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how tax is calculated</span>
                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">${estimated_tax}</dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                        <span>Subtotal</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">${total_compare_amount}</dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${total_amount}</dd>
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
    )
}

export default ShippingForm