import Layout from '../hocs/Layout'
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon, PlusIcon, MinusSmallIcon } from '@heroicons/react/20/solid'


import { connect } from 'react-redux'
import { get_categories } from '../redux/actions/categories'
import { get_products, get_filtered_products } from '../redux/actions/products'
import ProductCard from '../components/product/ProductCard'
import { PlusSmallIcon } from '@heroicons/react/24/outline'

import { prices } from '../helpers/fixedPrices'
import Navbar from '../../components/navigation/Navbar'
import Footer from '../../components/navigation/Footer'


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Search = ({
    get_categories,
    categories,
    get_products,
    products,
    get_filtered_products,
    searched_products
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    })

    const {
        category_id,
        price_range,
        sortBy,
        order
    } = formData

    useEffect(() => {
        get_categories()
        get_products()
        window.scrollTo(0,0)
    }, [])

    const onChange = e => setFormData({ ...FormData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        get_filtered_products(category_id, price_range, sortBy, order)
        setFiltered(true)
    }

    const showProducts = () => {
        let results = []
        let display = []

        if (
            searched_products && 
            searched_products !== null &&
            searched_products !== undefined 
        ) {
            searched_products.map((product, index) => {
                return display.push(
                    <div key={index}>
                        <ProductCard product={product}/>
                    </div>
                );
            });
        } else if (
            !filtered &&
            products &&
            products !== null &&
            products !== undefined
        ){
            products.map((product, index) => {
                return display.push(
                    <div key={index}>
                        <ProductCard product={product}/>
                    </div>
                );
            });
        }

        for (let i = 0; i < display.length; i += 3){
            results.push(
                <div key={i} className='grid md:grid-cols-3'>
                    {display[i] ? display[i] : <div className=''></div>}
                    {display[i+1] ? display[i+1] : <div className=''></div>}
                    {display[i+2] ? display[i+2] : <div className=''></div>}
                </div>
            )
        }

        return results
    }

    return(
        <div>
            <Navbar/>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                        >
                        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            </div>

                            {/* MOBILE Filters */}
                            <form onSubmit={e => onSubmit(e)} className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                    {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map(category => {
                                            if (category.sub_categories.length === 0){
                                                return (
                                                    <div key={category.id} className=' flex items-center h-5 my-5'>
                                                        <input
                                                            name='category_id'
                                                            onChange={e => onChange(e)}
                                                            value={category.id.toString()}
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                )
                                            } else {
                                                let result = []
                                                result.push(
                                                    <div key={category.id} className='flex items-center h-5'>
                                                        <input
                                                            name='category_id'
                                                            onChange={e => onChange(e)}
                                                            value={category.id.toString()}
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                )

                                                category.sub_categories.map(sub_category => {
                                                    result.push(
                                                        <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                                            <input
                                                                name='category_id'
                                                                onChange={e => onChange(e)}
                                                                value={sub_category.id.toString()}
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                            />
                                                            <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                                {sub_category.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })

                                                return result
                                            }
                                        })
                                    }
                                </ul>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                        <span className="font-sofiapro-regular text-gray-900">Prices</span>
                                        <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                        {
                                            prices && prices.map((price, index) => {
                                                if (price.id === 0) {
                                                    return (
                                                        <div key={index} className='form-check'>
                                                            <input
                                                                onChange={e => onChange(e)}
                                                                value={price.name}
                                                                name='price_range'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                defaultChecked
                                                            />
                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className='form-check'>
                                                            <input
                                                                onChange={e => onChange(e)}
                                                                value={price.name}
                                                                name='price_range'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                            />
                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        </div>
                                    </Disclosure.Panel>

                                    

                                    </h3>
                                    </>
                                )}
                                </Disclosure>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                        <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                                        <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                        <div className='form-group '>
                                            <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Ver por</label>
                                                <select
                                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                    id='sortBy'
                                                    name='sortBy'
                                                    onChange={e => onChange(e)}
                                                    value={sortBy}
                                                >
                                                <option value='date_created'>Fecha</option>
                                                <option value='price'>Precio</option>
                                                <option value='sold'>Sold</option>
                                                <option value='title'>Nombre</option>

                                                </select>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Orden</label>
                                            <select
                                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                id='order'
                                                name='order'
                                                onChange={e => onChange(e)}
                                                value={order}
                                            >
                                                <option value='asc'>A - Z</option>
                                                <option value='desc'>Z - A</option>
                                            </select>
                                        </div>
                                        </div>
                                    </Disclosure.Panel>
                                    </h3>
                                    </>
                                )}
                                </Disclosure>

                                <button
                        type="submit"
                        className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Buscar
                    </button>


                </form>
                        </div>
                        </Transition.Child>
                    </Dialog>
                    </Transition.Root>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Productos  
                        ({searched_products && 
                        searched_products !== null &&
                        searched_products !== undefined &&
                        searched_products.length
                        })
                        </h1>

                        <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sort
                                <ChevronDownIcon
                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                            </Menu.Button>
                            </div>

                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                {sortOptions.map((option) => (
                                    <Menu.Item key={option.name}>
                                    {({ active }) => (
                                        <a
                                        href={option.href}
                                        className={classNames(
                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        {option.name}
                                        </a>
                                    )}
                                    </Menu.Item>
                                ))}
                                </div>
                            </Menu.Items>
                            </Transition>
                        </Menu>

                        <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">View grid</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" /> </svg>
                        </button>
                        <button
                            type="button"
                            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                        Products
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {/* Filters */}
                            <form onSubmit={e=>onSubmit(e)} className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                                {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map(category => {
                                            if (category.sub_categories.length === 0){
                                                return (
                                                    <div key={category.id} className=' flex items-center h-5 my-5'>
                                                        <input
                                                            name='category_id'
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                )
                                            } else {
                                                let result = []
                                                result.push(
                                                    <div key={category.id} className='flex items-center h-5'>
                                                        <input
                                                            name='category_id'
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                )

                                                category.sub_categories.map(sub_category => {
                                                    result.push(
                                                        <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                                            <input
                                                                name='category_id'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                            />
                                                            <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                                {sub_category.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })

                                                return result
                                            }
                                        })
                                    }
                                </ul>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                        <span className="font-sofiapro-regular text-gray-900">Prices</span>
                                        <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                        {
                                            prices && prices.map((price, index) => {
                                                if (price.id === 0) {
                                                    return (
                                                        <div key={index} className='form-check'>
                                                            <input
                                                                onChange={e => onChange(e)}
                                                                value={price.name}
                                                                name='price_range'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                defaultChecked
                                                            />
                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className='form-check'>
                                                            <input
                                                                onChange={e => onChange(e)}
                                                                value={price.name}
                                                                name='price_range'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                            />
                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        </div>
                                    </Disclosure.Panel>

                                    

                                    </h3>
                                    </>
                                )}
                                </Disclosure>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                        <span className="font-sofiapro-regular text-gray-900">Mas Filtros</span>
                                        <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-6">
                                        <div className='form-group '>
                                            <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Ver por</label>
                                                <select
                                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                    id='sortBy'
                                                    name='sortBy'
                                                    onChange={e => onChange(e)}
                                                    value={sortBy}
                                                >
                                                <option value='date_created'>Fecha</option>
                                                <option value='price'>Precio</option>
                                                <option value='sold'>Sold</option>
                                                <option value='title'>Nombre</option>

                                                </select>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                            >Orden</label>
                                            <select
                                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                id='order'
                                                name='order'
                                                onChange={e => onChange(e)}
                                                value={order}
                                            >
                                                <option value='asc'>A - Z</option>
                                                <option value='desc'>Z - A</option>
                                            </select>
                                        </div>
                                        </div>
                                    </Disclosure.Panel>
                                    </h3>
                                    </>
                                )}
                                </Disclosure>

                                <button
                                    type="submit"
                                    className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Buscar
                                </button>
                            </form>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            {/* Replace with your content */}
                            
                            {products && showProducts()}

                        </div>
                        </div>
                    </section>
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.Categories.categories,
    products: state.Products.products,
    searched_products: state.Products.searched_products
})

export default connect(mapStateToProps,{
    get_categories,
    get_products,
    get_filtered_products
}) (Search)