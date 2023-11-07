import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { NavLink, Link } from 'react-router-dom'
import { Navigate } from 'react-router'
import Alert from '../../components/alert'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products } from '../../redux/actions/products'
import SearchBox from './SearchBox'

import { SortAscendingIcon, UsersIcon } from '@heroicons/react/solid'


const navigation = [
  { name: 'Tienda', href: '/shop', current: true },
  { name: 'Eventos', href: '#', current: false },
  { name: 'Team', href: '#', current: false },
  { name: 'Docs', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({
  isAuthenticated,
  user,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items
}) {

  const [redirect, setRedirect] = useState(false);

  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: ''
  });
  const { category_id, search }= formData;

  useEffect(() => {
    get_categories()
  }, [])


  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    get_search_products(search, category_id);
    setRender(!render);
  }

  if(render){
    return <Navigate to='/search' />;
  }

  const logoutHandler = () => {
    logout()
    setRedirect(true);
  }

  if (redirect)
    return <Navigate to='/' />;

  const authLinks = (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/login"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Sign in
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/signup"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Sign up
              </Link>
            )}
          </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active })=> (
                  <button
                  onClick={logoutHandler}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Cerrar sesion
                </button>
                )}
              </Menu.Item>
            </form>


        </Menu.Items>
      </Transition>
    </Menu>
  )

  const guestLinks = (
    <Fragment>
      <Link
        to="/login"
        className="text-base font-medium text-gray-500 hover:text-gray-900"
      >
        Iniciar sesion
      </Link>
      <Link
        to="/signup"
        className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Registrar
      </Link>
    </Fragment>
    
  )

  return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}

                        {window.location.pathname==='/search'?<></>:
                        <SearchBox 
                        search={search}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        categories={categories}/>
                        }
                        

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div classNames="flex items-center md:ml-12">
                  <Link to="/cart ">
                    <ShoppingCartIcon className="h-8 w-8 cursor-pointer text-gray-300 mr-4"/>
                    <span className='text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center'>{total_items}</span>
                  </Link>
                </div>

                {/* Profile dropdown */}
                {
                  isAuthenticated ? authLinks:guestLinks
                }


              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="NavLink"
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}


              <div classNames="flex items-center md:ml-12">
                  <Link to="/cart ">
                    <ShoppingCartIcon className="h-8 w-8 cursor-pointer text-gray-300 mr-4"/>
                  </Link>
              </div>

              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    <Alert/>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items
})

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products
}) (Navbar)