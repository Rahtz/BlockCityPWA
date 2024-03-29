import React from 'react'

const CompetitionLadder = () => {
  return (
    <div>
    <h1 className="text-4xl py-5 font-bold text-center">Competition Ladder</h1>
    <div className="lg:flex lg:justify-center">
        <div>
        <h2 className="text-bold text-center py-4 text-xl text-black">Mens</h2>
          <div class="overflow-x-auto">
            <div class="flex justify-center">
              <table class="min-w-full divide-y divide-gray-200 ">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      P
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      W
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      L
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      GD
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            The Jokers
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">7</td>
                    <td class="px-6 whitespace-nowrap">7</td>
                    <td class="px-6 whitespace-nowrap">0</td>
                    <td class="px-6 whitespace-nowrap">+181</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            PNBHS
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">+70</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            FAHS
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">+66</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Mumba Stags
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">+4</td>
                  </tr> 
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Slowbreak
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">2</td>
                    <td class="px-6 whitespace-nowrap">4</td>
                    <td class="px-6 whitespace-nowrap">-24</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Manukura
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">-34</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            It's Up
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">-51</td>
                  </tr>
                  <tr className="bg-yellow-200">
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Block City
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">-56</td>
                  </tr>
                  <tr className="bg-yellow-200">
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            High Flyers
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">7</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">6</td>
                    <td class="px-6 whitespace-nowrap">-156</td>
                  </tr>                 
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <div>

          <h2 className="text-bold text-center py-4 text-xl text-black">Womens</h2>

          <div class="overflow-x-auto">
            <div class="flex justify-center">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      P
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      W
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      L
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      GD
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Manukura
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">4</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">0</td>
                    <td class="px-6 whitespace-nowrap">+115</td>
                  </tr>
                  <tr className="bg-yellow-200">
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            The Comets
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">4</td>
                    <td class="px-6 whitespace-nowrap">1</td>
                    <td class="px-6 whitespace-nowrap">+85</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Linton
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">5</td>
                    <td class="px-6 whitespace-nowrap">2</td>
                    <td class="px-6 whitespace-nowrap">3</td>
                    <td class="px-6 whitespace-nowrap">-21</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            PNGHS
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 whitespace-nowrap">4</td>
                    <td class="px-6 whitespace-nowrap">0</td>
                    <td class="px-6 whitespace-nowrap">4</td>
                    <td class="px-6 whitespace-nowrap">-179</td>
                  </tr>                
                </tbody>
              </table>
            </div>
            </div>
          </div>
          </div>
    </div>
  )
}

export default CompetitionLadder