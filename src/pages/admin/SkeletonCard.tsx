import Card from "../../components/Card";

export default function StatCardSkeleton() {
  return (
    <Card className="p-6 border-none shadow-sm animate-pulse">
      {/* Label and Trend Badge Placeholder */}
      <div className="flex justify-between items-start mb-4">
        <div className="h-3 w-20 bg-slate-200 rounded-md"></div>
        <div className="h-4 w-10 bg-slate-100 rounded-md"></div>
      </div>
      
      {/* Value Placeholder */}
      <div className="h-8 w-24 bg-slate-200 rounded-xl mt-2"></div>
    </Card>
  );
}