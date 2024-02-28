import React from 'react';
import Logo from '../assets/images/logo.png';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';

const ReceiptPDF = ({ receiptData }) => {
  return (
    <Document>
      <Page style={{ backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginRight: '20px' }}>
            <Image style={{ maxWidth: '100px' }} src={Logo} />
          </View>
          <View style={{ marginBottom: '50px', marginRight: '180px', marginLeft: '50px', color: '#ffc107', fontSize: '30px' }}>
            <Text>Payment Receipt</Text>
          </View>
        </View>
        <View style={{ marginTop: '50px', marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>
          <Text>Customer Name:</Text>
          <Text style={{ color: 'white' }}>{receiptData.user_name}</Text>
        </View>
        <View style={{ marginBottom: '20px', marginTop: '20px', marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>
          <Text>Transaction ID:</Text>
          <Text style={{ color: 'white' }}>{receiptData.transaction_id}</Text>
        </View>
        <View style={{ marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>
          <Text>Amount:</Text>
          <Text style={{ color: 'white' }}>{receiptData.amount}</Text>
        </View>
    {/* Display cart items */}
    <View style={{ marginTop: '20px', color: 'white', fontSize: '20px' }}>
        <Text style={{ marginTop: '50px', marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>Products</Text>
        {receiptData.cartItems.map((item, index) => (
          <View key={index} style={{ marginLeft: '20px' }}>
             <Image  src={`http://127.0.0.1:8000${item.product_image}`} style={{ width: '100px' }} />
            <Text style={{ marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>{item.product_title}</Text>
            <Text>Quantity: {item.quantity}</Text>
            {/* Add other relevant cart item details here */}
          </View>
        ))}
      </View>
      <View style={{ marginBottom: '20px', marginTop: '20px', marginLeft: '20px', color: '#ffc107', fontSize: '30px' }}>
        <Text>Any Coupon Discount:</Text>
        <Text style={{ marginTop: '10px', color: 'white' }}>No</Text>
      </View>
        {/* Add other receipt data here */}
      </Page>
    </Document>
  );
};

export default ReceiptPDF;







