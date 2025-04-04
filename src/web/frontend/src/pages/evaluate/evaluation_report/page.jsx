import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {Link} from "react-router";

export default function EvaluationReport() {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get('/api/eval/').then(res => {
            setData(res.data);
            console.error("DATA", res.data);
        }).catch(e => {
            toast.error("Failed to fetch data");
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    console.log(data);

    return (
        <div className="m-[20px] flex flex-col gap-[30px]">
            <div className="p-6 bg-white rounded-lg shadow-sm w-full mx-auto flex items-center gap-3">
                <h1 className="text-xl font-medium">
                    List of Evaluations
                </h1>
            </div>

            <div className="space-y-4">
                {loading ? <p>Loading...</p> :
                    data.evals.map(item =>
                        <Link to={`/evaluate/evaluation-report/${item.id}`} key={item.id}
                              className="hover:bg-gray-50 inline-block w-full rounded-lg bg-white p-4">
                            <h1 className="text-xl">{item.name}</h1>
                            <div className="mt-2 flex justify-between w-full">
                                <div>#{item.id}</div>
                                <div className="px-3 py-1 bg-gray-500 text-white rounded-full">Count: {" "}{item.eval.length}</div>
                            </div>
                        </Link>)
                }
            </div>
        </div>
    );
}
