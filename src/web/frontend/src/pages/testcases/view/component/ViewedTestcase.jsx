export default function ViewedTestcase() {

    const testcase = {
        title: "Add 2 Numbers",
        desc: "Given 2 numbers x,y , return its sum",
        testcase_unit: [
            {
                id: '#0',
                input: '2 5',
                output: '7',
                cli: ['add'],
                files: [],
            },
            {
                id: '#0',
                input: '2 5',
                output: '7',
                cli: ['add'],
                files: [],
            }
        ]
    }

    return (
        <div className="w-full p-5 flex flex-col gap-3">
            <div className="border shadow p-4 bg-white rounded-md w-full">
                <div>
                    <h1 className="text-xl mb-4 text-left">Testcase Details</h1>
                </div>
                <div className="space-y-4 divide-y">
                    {/*Title*/}
                    <div className="pb-4">
                        <h1 className="text-sm text-gray-400">Title</h1>
                        <p>{testcase.title}</p>
                        {/*<input*/}
                        {/*    className="w-full p-3 flex-1 border bg-white border-gray-300 text-gray-500 rounded-md px-4 py-2 focus:outline-none mb-[8px]"*/}
                        {/*    placeholder="Enter Title" readOnly={true} value={data.title}/>*/}
                    </div>
                    {/*Description*/}
                    <div>
                        <h1 className="text-sm text-gray-400">Description</h1>
                        <p>{testcase.desc}</p>
                        {/*<textarea*/}
                        {/*    className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 text-gray-500 rounded-md px-4 py-2 focus:outline-none"*/}
                        {/*    placeholder="Enter Description" readOnly={true} value={data.desc}/>*/}
                    </div>
                </div>
            </div>

            {testcase.testcase_unit.map((item, key) =>
                <div key={key} className="border shadow p-4 bg-white rounded-md w-full">
                    <div>
                        <h1 className="text-xl mb-4 text-left">Testcase Unit - {item.id}</h1>
                    </div>
                </div>
            )}
        </div>
    )
}