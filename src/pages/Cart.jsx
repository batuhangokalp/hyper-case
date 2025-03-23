import { Button, Card, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import CreateBill from "../components/Cart/CreateBill";
import CalculateQuantity from "../components/Products/CalculateQuantity";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const columns = [
    {
      title: "Ürün Görseli",
      key: "image",
      width: "125px",
      render: (text, record) =>
        record?.image ? (
          <img
            src={record.image}
            alt="img"
            className="w-full h-16 object-contain"
          />
        ) : (
          "Görsel Yok"
        ),
    },
    {
      title: "Ürün Adı",
      key: "title",
      render: (text, record) => record?.title || "Bilinmiyor",
    },
    {
      title: "Ürün Fiyatı",
      key: "price",
      render: (text, record) =>
        record?.price ? `${record?.price.toFixed(2)} ₺` : "Bilinmiyor",
    },
    {
      title: "Toplam Fiyat (+%8 KDV)",
      key: "totalPrice",
      render: (text, record) => {
        const price = record?.price || 0;
        const quantity = record?.quantity || 0;
        return `${(price * quantity * 1.08).toFixed(2)} ₺`;
      },
    },
    {
      title: "Ürün Miktarı",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <CalculateQuantity record={record} />
      ),
    },
  ];

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item?.price || 0) * (item?.quantity || 0),
      0
    );
  };

  const KDV = (getTotalPrice() * 8) / 100;
  return (
    <>
      <Header />
      <div className="px-6 overflow-y-auto max-h-[calc(100vh_-_300px)] border-b">
        <Table
          rowKey={(record) => record._id}
          dataSource={cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
      </div>
      <div className="cart-total flex justify-end mt-4 fixed bottom-10 right-0">
        <Card className="w-72">
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{getTotalPrice()?.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %8</span>
            <span className="text-red-600">+{KDV.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b> {(getTotalPrice() + KDV).toFixed(2)} ₺</b>
          </div>
          <Button
            className="mt-4 w-full"
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
            disabled={cartItems.length < 1}
          >
            Sipariş Oluştur
          </Button>
        </Card>
      </div>
      <CreateBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getTotalPrice={getTotalPrice}
        KDV={KDV}
        cartItems={cartItems}
      />
    </>
  );
};

export default Cart;
