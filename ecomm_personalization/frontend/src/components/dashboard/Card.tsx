import { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: ReactNode;
  description?: string;
}

export function Card({ title, value, change, changeType, icon, description }: CardProps) {
  return (
    <div className="px-4 py-5 bg-white rounded-lg overflow-hidden shadow sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-3 rounded-md bg-pink-50">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
              {change && changeType && (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {changeType === 'increase' ? (
                    <svg
                      className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="sr-only">
                    {changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {change}
                </div>
              )}
            </dd>
            {description && (
              <dt className="mt-1 text-sm font-normal text-gray-500 truncate">
                {description}
              </dt>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
