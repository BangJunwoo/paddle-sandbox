import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <script async src="https://www.paypal.com/sdk/js?client-id=test&components=buttons,marks"></script>

      <label>
        <input type="radio" name="payment-option" value="paypal" checked />
        <div id="paypal-marks-container"></div>
      </label>

      <label>
        <input type="radio" name="payment-option" value="alternate" />
        Pay with a different payment method
      </label>

      <div id="paypal-buttons-container"></div>
      <div id="alternate-button-container">
        <button>Pay now</button>
      </div>
      <script>
        {`paypal.Marks().render('#paypal-marks-container');
    
      paypal.Buttons().render('#paypal-buttons-container');
    
      // Listen for changes to the radio buttons
      document.querySelectorAll('input[name=payment-option]')
        .forEach(function (el) {
          el.addEventListener('change', function (event) {
    
            // If PayPal is selected, show the PayPal button
            if (event.target.value === 'paypal') {
              document.body.querySelector('#alternate-button-container')
                .style.display = 'none';
              document.body.querySelector('#paypal-buttons-container')
                .style.display = 'block';
            }
    
            // If alternate funding is selected, show a different button
            if (event.target.value === 'alternate') {
              document.body.querySelector('#alternate-button-container')
                .style.display = 'block';
              document.body.querySelector('#paypal-buttons-container')
                .style.display = 'none';
            }
          });
        });
    
      // Hide non-PayPal button by default
      document.body.querySelector('#alternate-button-container')
        .style.display = 'none';`}
      </script>
    </div>
  )
}

export default page
