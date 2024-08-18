

export const Home = () => {

    return (
        <div className="m-2">
            <div className="text-center font-bold font-mono text-4xl">Available Plans</div>
            <div className="flex justify-center gap-10 mt-6">
                <div className="h-[7rem] w-[20rem] border-[1px] shadow-md rounded-lg text-center">
                    <div className="font-bold font-mono text-2xl">Basic</div>
                    <div className="font-light text-sm">(Quota of 10 requests)</div>
                    <div className="flex justify-around mt-6">
                        <button className="border-[1px] w-28 rounder-sm shadow-sm">Refil Quota</button>
                        <button className="border-[1px] w-28 rounder-sm shadow-sm">Select Plan</button>

                    </div>
                </div>
                <div className="h-[7rem] w-[20rem] border-[1px] shadow-md rounded-lg text-center">
                    <div className="font-bold font-mono text-2xl">Advance</div>
                    <div className="font-light text-sm">(Quota of 20 requests)</div>
                    <div className="flex justify-around mt-6">
                        <button className="border-[1px] w-28 rounder-sm shadow-sm">Refil Quota</button>
                        <button className="border-[1px] w-28 rounder-sm shadow-sm">Select Plan</button>

                    </div>
                </div>

            </div>
            <div className="border-b-2 w-full h-1 mt-10" />
            <div>
                <div className="text-center font-bold font-mono text-4xl mt-4">API usage Matrix</div>

                <div className="h-[35rem] overflow-y-scroll">
                    <table className=" min-w-full bg-white border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Plan Used</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Total Hits</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Success Hits</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Error Hits</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">First Quartile </th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Second Quartile </th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Third Quartile </th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Fourth Quartile </th>
                            </tr>
                        </thead>
                        <tbody >
                           {Array(100).fill(0).map(itm => {
                            return (
                                <tr>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 1</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 2</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">Row 1, Column 3</td>
                            </tr>
                                
                            )
                           })} 
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}