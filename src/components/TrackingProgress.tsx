'use client';

import {
  FaInfoCircle,
  FaBoxOpen,
  FaWarehouse,
  FaTruck,
  FaCheckCircle,
  FaTimes,
} from 'react-icons/fa';
import clsx from 'clsx';

const statuses = [
  { id: 'Shipping Information Received', icon: FaInfoCircle },
  { id: 'Picked up', icon: FaBoxOpen },
  { id: 'Checked in', icon: FaWarehouse },
  { id: 'Out for Delivery', icon: FaTruck },
  { id: 'Delivered', icon: FaCheckCircle },
];

const statusOrder = statuses.map((s) => s.id.toLowerCase());

const statusMap: Record<string, string> = {
  created: 'Shipping Information Received',
  accepted: 'Shipping Information Received',
  confirmed: 'Shipping Information Received',
  possession: 'Picked up',
  in_transit: 'Checked in',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  delayed: 'Checked in',
  void: 'Shipping Information Received',
  returned: 'Checked in',
  exception: 'Out for Delivery',
};

const statusTooltips: Record<string, string> = {
  'Shipping Information Received': 'The information for this order has been transmitted to us, but it is not yet in UrgentShip\'s possession.',
  'Picked up': 'Your package has been marked picked up and is now in the care of an UrgentShip team member.',
  'Checked in': 'The package has been scanned into the local sorting hub and placed in outbound queue for delivery.',
  'Out for Delivery': 'Your delivery driver has your package and is on the way.',
  'Exception': 'A problem occurred in attempting to deliver your order. We will make up to three attempts to deliver your package before it is returned to the sender. For more information regarding your delivery, please contact support@urgentship.com.',
  'Delivered': 'Your package has been delivered.',
};


interface TrackingProgressProps {
  currentStatus: string;
}

export default function TrackingProgress({ currentStatus }: TrackingProgressProps) {
  const normalizedStatus = currentStatus.toLowerCase();
  const mappedStep = statusMap[normalizedStatus] || 'Shipping Information Received';
  const currentIndex = statusOrder.indexOf(mappedStep.toLowerCase());
  const isException = normalizedStatus === 'exception';

  console.log("current status: ", currentStatus);

//   return (
//     <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         <h2 className="text-xl font-semibold mb-8 text-gray-800">Tracking Progress</h2>
//         <div className="flex items-center justify-between gap-0 relative">
//           {statuses.map((step, index) => {
//             const isActive = index <= currentIndex;
//             const Icon = step.icon;

//             return (
//               <div key={step.id} className="flex-1 flex items-center relative z-10">
//                 {/* Step Icon */}
//                 <div className="flex flex-col items-center w-full z-10">
//                   <div
//                     className={clsx(
//                       'flex items-center justify-center w-12 h-12 rounded-full border-2',
//                       isActive
//                         ? 'bg-blue-600 border-blue-600 text-white'
//                         : 'bg-gray-200 border-gray-300 text-gray-500'
//                     )}
//                   >
//                     <Icon size={20} />
//                   </div>
//                   <p
//                     className={clsx(
//                       'text-xs mt-2',
//                       isActive ? 'text-gray-800 font-medium' : 'text-gray-400'
//                     )}
//                   >
//                     {step.id}
//                   </p>
//                 </div>

//                 {/* Connecting Line */}
//                 {index < statuses.length - 1 && (
//                   <div
//                     className={clsx(
//                       'absolute top-6 left-1/2 w-full h-1 z-0',
//                       index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
//                     )}
//                   ></div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Exception Marker */}
//           {/* Exception Marker between "Out for Delivery" and "Delivered" */}
//             {isException && (
//             <div className="absolute top-[38px] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
//                 <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white shadow">
//                 <FaTimes />
//                 </div>
//                 <p className="text-xs text-red-600 font-semibold mt-1">Exception</p>
//             </div>
//             )}



//         </div>
//       </div>
//     </div>
//   );

return (
  <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-xl font-semibold mb-8 text-gray-800">Tracking Progress</h2>
      <div className="flex items-center justify-between gap-0 relative">
        {statuses.map((step, index) => {
          const isActive = index <= currentIndex;
          const Icon = step.icon;
          const tooltipText = statusTooltips[step.id];

          return (
            <div key={step.id} className="flex-1 flex items-center relative z-10">
              {/* Step Icon with Tooltip */}
              <div className="flex flex-col items-center w-full z-10 group relative">
                <div
                  className={clsx(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2',
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-200 border-gray-300 text-gray-500'
                  )}
                >
                  <Icon size={20} />
                </div>
                <p
                  className={clsx(
                    'text-xs mt-2',
                    isActive ? 'text-gray-800 font-medium' : 'text-gray-400'
                  )}
                >
                  {step.id}
                </p>

                {tooltipText && isActive && (
                  <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-sm rounded px-4 py-3 shadow-lg hidden group-hover:block z-20">
                    {tooltipText}
                  </div>
                )}
              </div>

              {/* Connecting Line */}
              {index < statuses.length - 1 && (
                <div
                  className={clsx(
                    'absolute top-6 left-1/2 w-full h-1 z-0',
                    index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  )}
                ></div>
              )}
            </div>
          );
        })}

        {/* Exception Marker */}
        {isException && (
          <div className="absolute top-[38px] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white shadow">
              <FaTimes />
            </div>
            <p className="text-xs text-red-600 font-semibold mt-1">Exception</p>

            {/* Tooltip for Exception */}
            <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-sm rounded px-4 py-3 shadow-lg hidden group-hover:block z-30">
              A problem occurred in attempting to deliver your order. We will make up to three attempts to deliver your package before it is returned to the sender. For more information regarding your delivery, please contact support@urgentship.com.
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
