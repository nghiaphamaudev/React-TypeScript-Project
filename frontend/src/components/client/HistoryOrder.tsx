import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useOrder from 'src/hooks/useOder';
import Invoice from './Invoice';
import { Order } from 'src/types/orders';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw', // Sử dụng phần trăm chiều rộng để dễ dàng cuộn
  maxHeight: '90vh', // Đặt chiều cao tối đa
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto', // Cho phép cuộn khi nội dung vượt quá kích thước phần tử
};

const HistoryOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };
  const { orders } = useOrder();

  return (
    <div className="mx-auto max-w-screen-xl my-14 px-6 py-8 bg-slate-50 2xl:px-0">
      <div className="mx-auto max-w-full px-10">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white sm:text-2xl">
          History Order
        </h2>

        {orders.map((order, index) => (
          <div
            className="mt-7 w-full border rounded-lg border-gray-300 pt-4 mb-5"
            key={index}
          >
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11 mb-5">
              <div className="flex gap-10">
                <div className="">
                  <p className="font-medium text-base text-black ">
                    Order Number: #{order._id}
                  </p>
                  <p className="font-medium text-base text-black ">
                    Date Order {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 max-md:mt-5">
                <button
                  type="button"
                  onClick={() => handleOpen(order)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Watch Invoice
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {selectedOrder && <Invoice orderInvoice={selectedOrder} />}
                  </Box>
                </Modal>
              </div>
            </div>

            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800 px-10">
              <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {order.products.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="whitespace-nowrap py-4 md:w-[384px]">
                        <div className="flex items-center gap-4">
                          <a
                            href="#"
                            className="flex items-center aspect-square w-16 h-16 shrink-0"
                          >
                            <img
                              className="h-auto w-full max-h-full dark:hidden"
                              src={`/img/products/${product.product.coverImg}`}
                              alt="product image"
                            />
                          </a>
                          <a href="#" className="hover:underline">
                            {product.product.name}
                          </a>
                        </div>
                      </td>
                      <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                        x{product.quantity}
                      </td>
                      <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryOrder;
