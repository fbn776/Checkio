import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function CircularProgress({ value = 75, label = "Pass Percent" }) {
  // setting value btw 0-100
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  let color = "#009be5"; 

  if (normalizedValue <= 10) color = "#d90000";
  else if (normalizedValue <= 20) color = "#f26300";
  else if (normalizedValue <= 30) color = "#f7953e";
  else if (normalizedValue <= 40) color = "#faca4a";
  else if (normalizedValue <= 50) color = "#d4d63b";
  else if (normalizedValue <= 60) color = "#91cc1c";
  else if (normalizedValue <= 70) color = "#6dd026";
  else if (normalizedValue <= 80) color = "#3ecb8c";
  else if (normalizedValue <= 90) color = "#63ccff";
  else color = "#009be5";

  // setting angle based on value
  const startAngle = 90;
  const endAngle = 90 - (normalizedValue * 360) / 100;

  const data = [{ name: label, value: normalizedValue, fill: color }];

  return (
    <div className="relative w-[200px] h-[200px] flex justify-center items-center">
      <ResponsiveContainer width={200} height={200}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={15}
          data={data}
          startAngle={startAngle}
          endAngle={endAngle} // Dynamically adjusted
        >
          <RadialBar minAngle={15} dataKey="value" cornerRadius={50} />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* inner text */}
      <div className="absolute text-center">
        <p className="text-md font-semibold text-[#009be5]">{normalizedValue}%</p>
        <p className="text-sm font-regular text-[#9c9c9c]-700">{label}</p>
      </div>
    </div>
  );
}
