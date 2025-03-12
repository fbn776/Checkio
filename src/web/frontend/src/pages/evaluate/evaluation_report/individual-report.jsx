import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {Link, useParams} from "react-router";
import {ArrowLeft, ArrowUpRight} from "lucide-react";

export default function IndividualReport() {
    const {evaluationId} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/eval/${evaluationId}`).then(res => {
            setData(res.data);
        }).catch(e => {
            console.error(e);
            toast.error("Failed to fetch data");
        }).finally(() => {
            setLoading(false);
        });
    }, [evaluationId]);

    console.log(data);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="pt-5 p-3">
            <div className="py-8 px-5 bg-white rounded-lg w-full flex items-center gap-5">
                <Link to='/evaluate/evaluation-report'>
                    <ArrowLeft/>
                </Link>
                <h1 className='text-xl'>
                    {data.name}
                    <span className="text-gray-500 text-sm ml-3">#{data.id}</span>
                </h1>
            </div>

            <div className="mt-5 space-y-4">
                {data.eval.map((item, index) => {
                    const evalData = JSON.parse(item.data);
                    console.log(evalData)
                    return <div className="w-full rounded-lg p-4 bg-white" key={index}>
                        <div className="flex items-center justify-between">
                            <h1 className="text-sm text-gray-500">Submitted By <b
                                className="ml-1 font-normal text-black text-xl">{item.submitted_by}</b></h1>

                            <Link to={`/evaluate/submittedPrograms/view/${item.submission_id}`}
                                  className="flex items-center gap-2">
                                See Submission
                                <ArrowUpRight/>
                            </Link>
                        </div>

                        <h2 className='mt-2 mb-2'>Evaluation Result</h2>
                        <div>

                            {evalData.tests.map((test, index) => {
                                return <div key={index} className="border rounded-lg p-3 space-y-4">
                                    <div>
                                        <h3 className="text-sm text-gray-500">Input</h3>
                                        <div className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">
                                            {test.input}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500">CLI Args</h3>
                                        <div className="flex w-full flex-wrap gap-1">
                                            {test.cli_args.map((cli, j) =>
                                                <div key={j} className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">
                                                    {cli}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500">Expected Output</h3>
                                        <div className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">
                                            {test.expected_output}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500">Output</h3>
                                        <div className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">
                                            {test.output}
                                        </div>
                                    </div>

                                    {test.status ?
                                        <div className='bg-green-500 w-fit px-3 py-1 rounded-lg'>Passed</div> :
                                        <div className='bg-red-500 w-fit px-3 py-1 rounded-lg'>Failed</div>}
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}