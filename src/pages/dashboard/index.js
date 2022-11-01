import { useState } from 'react';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';

let product_limit = 1;
let product_offset = 100;

export default function Dashboard() {
  const products = useFetch(endPoints.products.getAnyProducts(product_limit, product_offset));

  const getProducts = (array) => {
    const categoryNames = array?.map((product) => product.category.name);
    const countOccurrences = () => categoryNames.reduce((listCount, word) => ((listCount[word] = ++listCount[word] || 1), listCount), {});
    return countOccurrences();
  };

  let [data, setData] = useState({
    datasets: [
      {
        label: 'Categories',
        data: getProducts(products),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  });

  const updateData = (array) => {
    const nData = {
      datasets: [
        {
          label: 'Categories',
          data: getProducts(array),
          borderWidth: 2,
          backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
        },
      ],
    };
    setData(nData);
  }

  let btns = [];

  let countBtns = 0;
  const loadingBtns = () => {
    for (let index = 0; index < products.length; index += 5) {
      countBtns++;
      const btn = {
        val: countBtns,
      };
      btns.push(btn);
    }
  };
  loadingBtns();

  const [actualSelection, setActualSelection] = useState(1); 
  const changeActualSelection = (valor) => {
    setActualSelection(valor);
  };

  const [productsView, setProductsView] = useState([]);
  const updateProducts = (btn) => {
    const pView = [];
    const end = btn * 5;
    changeActualSelection(btn);
    for (let i = end - 5; i < end; i++) {
      pView.push(products[i]);
    }
    setProductsView(pView);
    updateData(pView);
  };

  const btnAnterior = () => {
    if ( actualSelection - 1 >= 1 ) {   
      updateProducts(actualSelection-1);
    }
  };

  const btnSiguiente = () => {
    if ( actualSelection + 1 <=  countBtns) {
      updateProducts(actualSelection+1);
    }
  };
  return (
    <>
      <div className="flex w-7/12 aling-middle pt-8 pb-20 m-auto">
        <Chart chartData={data} />
      </div>
      <div className="w-100 flex aling-middle">
        <ul className="flex aling-middle m-auto">
          <li 
            className="inline-block bg-blue-50 mx-1 p-2 w-auto text-white text-center bg-blue-400 rounded hover:bg-blue-600"
            onClick={btnAnterior}
            onKeyDown={btnAnterior}
          >
            Anterior
          </li>
          {btns.map((btn) => (
            <li
              className="inline-block bg-blue-50 mx-1 py-2 w-8 text-white text-center bg-blue-400 rounded hover:bg-blue-600"
              value={btn.val}
              key={btn.val}
              onClick={() => updateProducts(btn.val)}
            >
              {btn.val}
            </li>
          ))}
          <li 
            className="inline-block bg-blue-50 mx-1 p-2 w-auto text-white text-center bg-blue-400 rounded hover:bg-blue-600"
            onClick={btnSiguiente}
            onKeyDown={btnSiguiente}
          >
            Siguiente
          </li>
        </ul>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productsView?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
