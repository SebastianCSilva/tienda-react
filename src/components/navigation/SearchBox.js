import { SearchIcon } from '@heroicons/react/solid'

const SearchBox = () =>{
    return(
        <div>
            <div>
                <div className="mt-1 flex rounded-md shadow-sm border border-gray-200">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    
                    <input
                    type="text"
                    name="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
                    placeholder="Producto Buscado"
                    />
                </div>
                <button
                    type="button"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox