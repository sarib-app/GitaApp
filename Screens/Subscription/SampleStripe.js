import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

const StripePaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const fetchPaymentIntentClientSecret = async () => {
    setLoading(true);
    
    // Replace with the actual values for your payment
    const paymentDetails = {
      amount: 1000, // amount in the smallest currency unit
      currency: 'usd',
      paymentMethodType: 'card' // or any other payment method type you are using
    };
    
    try {
      const response = await fetch('https://jiabxmgv39.us.aircode.run/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      
      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    } catch (e) {
      console.error(e);
      // Handle error or display a message to the user
    }

    setLoading(false);
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    
    setLoading(true);

    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Amore', 
    });

    if (initError) {
      console.error(initError);
      setLoading(false);
      return;
    }

    const { error: presentError } = await presentPaymentSheet({
      clientSecret: clientSecret,
    });

    if (presentError) {
      alert(`Error code: ${presentError.code}\n${presentError.message}`);
    } else {
      alert('Payment successful!');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPaymentIntentClientSecret();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51NuBGvE9c1wXYOQO5qbYzDY0bxKYvT5647XaClqJH96aCgKEdwM1AP0UTfYDFOl0hwPP96W3Bi8UG1yL2LUyClKK00NjDLm6VO">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title="Pay Now"
            onPress={openPaymentSheet}
            disabled={!clientSecret}
          />
        )}
      </View>
    </StripeProvider>
  );
};

export default StripePaymentScreen;
