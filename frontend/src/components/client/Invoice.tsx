import { useRef } from 'react';
import { Order } from 'src/types/orders';

import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';

type InvoiceProps = {
  orderInvoice: Order;
};

const Invoice = ({ orderInvoice }: InvoiceProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (pdfRef.current) {
      const element = pdfRef.current;
      const opt = {
        margin: 0.5,
        filename: `invoice-${orderInvoice._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(element).set(opt).save();
    }
  };
  return (
    <div>
      <div className="flex max-w-3xl mx-auto  bg-white rounded shadow-sm my-6">
        <button
          type="button"
          onClick={handleDownload}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Dowload Invoice
        </button>
      </div>
      <div
        className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm my-6"
        id="invoice"
        ref={pdfRef}
      >
        <div className="grid grid-cols-2 items-center">
          <div>
            <img
              src="/earth-cartoon.png"
              alt="company-logo"
              height={100}
              width={100}
            />
          </div>
          <div className="text-right">
            <p>VnWorlds</p>
            <p className="text-gray-500 text-sm">vnworlds@gmail.com</p>
            <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
            <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
          </div>
        </div>
        {/* Client info */}
        <div className="grid grid-cols-2 items-center mt-8">
          <div>
            <p className="font-bold text-gray-800">Bill to :</p>
            <p className="text-gray-500">
              {orderInvoice.name}
              <br />
              {orderInvoice.address}
            </p>
            <p className="text-gray-500">{orderInvoice.phone}</p>
          </div>
          <div className="text-right">
            <p className="">
              ID Invoice:
              <span className="text-gray-500"> #{orderInvoice._id}</span>
            </p>
            <p>
              Invoice date:{' '}
              <span className="text-gray-500">
                {new Date(orderInvoice.createdAt).toLocaleString()}
              </span>
              <br />
            </p>
          </div>
        </div>
        {/* Invoice Items */}
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orderInvoice.products.map((product, index) => (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">
                      {product.product.name}
                    </div>
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    x{product.quantity}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    ${product.price}
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                    ${parseFloat((product.price * product.quantity).toFixed(1))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Subtotal
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Subtotal
                </th>
                <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                  ${orderInvoice.totalOrder}
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Fee Ship
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Discount
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  ${orderInvoice.payment === 'COD' ? 50 : 0}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  $
                  {orderInvoice.totalOrder -
                    (orderInvoice.payment === 'COD' ? 50 : 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
          Please pay the invoice before the due date. You can pay the invoice by
          logging in to your account from our client portal.
        </div>
      </div>
    </div>
  );
};

export default Invoice;
