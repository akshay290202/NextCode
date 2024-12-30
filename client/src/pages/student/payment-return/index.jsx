import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function PaypalPaymentReturnPage() {
     const location = useLocation();
     const params = new URLSearchParams(location.search);
     const paymentId = params.get("paymentId");
     const payerId = params.get("PayerID");

     useEffect(() => {
          if (paymentId && payerId) {
               async function capturePayment() {
                    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

                    const response = await captureAndFinalizePaymentService(
                         paymentId,
                         payerId,
                         orderId
                    );

                    if (response?.success) {
                         sessionStorage.removeItem("currentOrderId");
                         window.location.href = "/student-courses";
                         toast.success('Payment successful');
                    }
                    else {
                         toast.error('Payment failed');
                    }
               }

               capturePayment();
          }
     }, [payerId, paymentId]);

     return (
          <div className="flex justify-center items-center min-h-screen text-center">
               Payment processing... Please wait
          </div>
     );
}

export default PaypalPaymentReturnPage;