'use client'

import { cn } from '@/utils/cn'
import { Divider } from '@nextui-org/react'
import React from 'react'
import { companiesComparison } from '@/components/(landing-page)/pricing-page/feature-comparisons'
import { Icon } from '@iconify/react'

function capitalizeEveryWord(str: string) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase()
  })
}

const FeatureComparisonsComponent = () => {
  // hydration error
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const featureKeys = Object.keys(companiesComparison[0].features) as Array<
    keyof (typeof companiesComparison)[0]['features']
  >

  return (
    <div>
      <p className=" text-2xl text-center">
        We provide access to a suite of quality data-driven insights + financial
        advice with unmatched user experience at the <b>MOST AFFORDABLE </b>
        price
      </p>
      <div className="overflow-x-auto w-full max-w-7xl relative overflow-y-hidden">
        <table className="w-full table-auto md:table-fixed border-separate border-spacing-x-4 text-left">
          <thead className="w-full">
            <tr>
              <th
                className={cn('pb-4 pt-12 font-semibold text-foreground')}
              ></th>
              {companiesComparison.map((comp, featIndex) => (
                <th
                  key={comp.company}
                  className={cn(
                    'pb-4 pt-12 font-semibold text-foreground text-center',
                    {
                      'text-3xl': featIndex === 0,
                      'text-lg': featIndex !== 0,
                    }
                  )}
                  colSpan={1}
                  scope="colgroup"
                >
                  {comp.company}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-separate border-spacing-x-4 w-full">
            {featureKeys.map((feature, dataIndex) => (
              <React.Fragment key={feature}>
                <tr className="border-b-1 border-gray-500">
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {capitalizeEveryWord(
                      feature.replace(/([A-Z])/g, ' $1').trim()
                    )}
                  </td>
                  {companiesComparison.map((company) => (
                    <td
                      key={`${company.company}-${feature}`}
                      className={cn(
                        'pb-4 pt-12 text-large font-semibold text-foreground text-center',
                        {
                          'pt-16': dataIndex === 0,
                        }
                      )}
                      scope="row"
                    >
                      {company.features[feature] ? (
                        <Icon
                          className="mx-auto text-secondary"
                          icon="ci:check"
                          width={24}
                        />
                      ) : (
                        <Icon
                          className="mx-auto text-default-400"
                          icon="ci:close-sm"
                          width={24}
                        />
                      )}
                    </td>
                  ))}
                </tr>
                <Divider className="absolute -inset-x-4 mt-2 bg-default-600/10" />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FeatureComparisonsComponent
