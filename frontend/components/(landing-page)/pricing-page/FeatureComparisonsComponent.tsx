'use client'

import { cn } from '@/utils/nextui/cn'
import { Divider } from '@nextui-org/react'
import React from 'react'
import {
  companies,
  dataComparion,
} from '@/components/(landing-page)/pricing-page/feature-comparisons'
import { Icon } from '@iconify/react'

function capitalizeEveryWord(str: string) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase()
  })
}

const FeatureComparisonsComponent = () => {
  return (
    <div>
      <p className=" text-2xl">
        We provide access to a suite of quality data-driven insights + financial
        advice <br /> with unmatched user experience at the{' '}
        <b>MOST AFFORDABLE </b>
        price
      </p>
      <div className="overflow-x-auto w-full max-w-7xl relative overflow-y-hidden">
        <table className="w-full table-auto md:table-fixed border-separate border-spacing-x-4 text-left">
          <thead className="w-full">
            <tr>
              <th
                className={cn('pb-4 pt-12 font-semibold text-foreground  ')}
              ></th>
              {companies.map((comp, featIndex) => (
                <React.Fragment key={comp.company}>
                  <th
                    className={cn(
                      'pb-4 pt-12 font-semibold text-foreground text-center ',
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
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="border-separate border-spacing-x-4 w-full">
            {dataComparion.map((data, dataIndex) => (
              <React.Fragment key={dataIndex}>
                <tr className="border-b-1 border-gray-500">
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground ',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {capitalizeEveryWord(data.feature)}
                  </td>
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground text-center',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {data.hFinance ? (
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
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground text-center',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {data.OpenBB ? (
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
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground text-center',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {data.longBow ? (
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
                  <td
                    className={cn(
                      'pb-4 pt-12 text-large font-semibold text-foreground text-center',
                      {
                        'pt-16': dataIndex === 0,
                      }
                    )}
                    scope="row"
                  >
                    {data.Hedgeye ? (
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
