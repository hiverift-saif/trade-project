// src/Pages/finance/WithdrawPage.jsx
// import React, { useState } from "react";
// import { Wallet, Banknote, Bitcoin, CreditCard } from "lucide-react";

// const withdrawMethods = [
//   { id: "bank", name: "Bank Transfer", icon: <Banknote size={22} /> },
//   { id: "upi", name: "UPI / Wallet", icon: <Wallet size={22} /> },
//   { id: "crypto", name: "Crypto (BTC, USDT, ETH)", icon: <Bitcoin size={22} /> },
//   { id: "card", name: "Visa / MasterCard", icon: <CreditCard size={22} /> },
// ];

// export default function WithdrawPage() {
//   const [selectedMethod, setSelectedMethod] = useState(null);
//   const [amount, setAmount] = useState("");

//   const handleWithdraw = () => {
//     if (!amount) {
//       alert("Please enter withdrawal amount!");
//       return;
//     }
//     if (!selectedMethod) {
//       alert("Please select a withdrawal method!");
//       return;
//     }

//     alert(
//       `Withdrawing ₹${amount} via ${selectedMethod}`
//     );
//   };

//   return (
//     <div className="bg-[#0b1320] min-h-screen text-white p-6">
//       {/* Page Header */}
//       <h1 className="text-2xl font-semibold mb-6">Withdrawal</h1>

//       {/* Balance Info Section */}
//       <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mb-6">
//         <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-300">
//           <p>Free balance: <span className="text-green-400 font-medium">₹0</span></p>
//           <p>Minimum withdrawal amount: <span className="text-yellow-400 font-medium">₹888</span></p>
//           <p>Commission: <span className="text-blue-400 font-medium">₹0</span></p>
//         </div>
//       </div>

//       {/* Information Note */}
//       <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mb-6">
//         <p className="text-gray-400 text-sm leading-relaxed">
//           Withdrawal process becomes available after you deposit on your account.  
//           Typically, a withdrawal request is processed automatically and takes a few minutes,  
//           and in some cases up to 3 business days.
//         </p>
//       </div>

//       {/* Withdraw Methods */}
//       <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl">
//         <h2 className="text-lg font-medium text-gray-300 mb-4">
//           Choose Withdrawal Method
//         </h2>

//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {withdrawMethods.map((method) => (
//             <div
//               key={method.id}
//               onClick={() => setSelectedMethod(method.name)}
//               className={`cursor-pointer flex items-center gap-3 p-4 rounded-lg border transition-all ${
//                 selectedMethod === method.name
//                   ? "border-green-500 bg-[#13233c]"
//                   : "border-gray-700 bg-[#0f192d] hover:border-gray-500"
//               }`}
//             >
//               <div className="text-green-400">{method.icon}</div>
//               <span className="text-sm font-medium">{method.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Withdraw Form */}
//       {selectedMethod && (
//         <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mt-6">
//           <h2 className="text-lg mb-4 font-medium text-gray-300">
//             Enter Withdrawal Amount
//           </h2>

//           <input
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-[#0f192d] border border-gray-700 text-gray-200 focus:border-green-500 focus:outline-none"
//           />

//           <button
//             onClick={handleWithdraw}
//             className="mt-5 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
//           >
//             Withdraw Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// src/Pages/finance/WithdrawPage.jsx
import React, { useState } from "react";
import { withdrawCrypto } from "../../api/financeApi";
import toast from "react-hot-toast";

const cryptoOptions = ["BTC", "USDT", "ETH"];

export default function WithdrawPage() {
  const [crypto, setCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");

  const handleWithdraw = async () => {
    if (!amount || !address || !otp) {
      toast.error("Please fill all fields!");
      return;
    }

    const payload = {
      crypto,
      amount: Number(amount),
      address,
      otp,
    };

    const toastId = toast.loading("Submitting withdrawal request...");

    try {
      const res = await withdrawCrypto(payload);
      toast.dismiss(toastId);

      if (res.statusCode === 200) {
        toast.success(res.message || "Withdrawal request submitted!");
      } else {
        toast.error(res.message || "Withdrawal failed!");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">

      <h1 className="text-2xl font-semibold mb-6">Crypto Withdrawal</h1>

      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl">
        {/* Select Crypto */}
        <label className="text-gray-300 text-sm">Select Crypto</label>
        <select
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="w-full mt-1 mb-4 bg-[#0f192d] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          {cryptoOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Amount */}
        <label className="text-gray-300 text-sm">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 bg-[#0f192d] border border-gray-700 px-4 py-2 rounded-lg text-white"
        />

        {/* Wallet Address */}
        <label className="text-gray-300 text-sm">Wallet Address</label>
        <input
          type="text"
          placeholder="Enter your BTC/USDT/ETH address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mb-4 bg-[#0f192d] border border-gray-700 px-4 py-2 rounded-lg text-white"
        />

        {/* OTP */}
        <label className="text-gray-300 text-sm">OTP Code</label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-6 bg-[#0f192d] border border-gray-700 px-4 py-2 rounded-lg text-white"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Withdraw Now
        </button>
      </div>
    </div>
  );
}

